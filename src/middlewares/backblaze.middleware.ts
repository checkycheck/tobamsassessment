import {
    HttpException,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
  import * as B2 from 'backblaze-b2';
  import * as fs from 'fs';
  import { Multer } from 'multer';
  
  @Injectable()
  export class BackblazeService {
    async uploadFileToBackblaze(file: Multer.File) {
      const b2 = new B2({
        applicationKeyId: process.env.BACKBLAZE_APPLICATION_KEY_ID, // or accountId: ''
        applicationKey: process.env.BACKBLAZE_APPLICATION_KEY, // or masterApplicationKey d1a3a2ddb10b
      });
      await b2.authorize();
  
      // Access bucket
      const bucketResponse = await b2.getBucket({ bucketName: 'jubelbucket' });
  
      // Getting upload url
      const uploadURL = await b2.getUploadUrl({
        bucketId: bucketResponse.data.buckets[0].bucketId,
      });
  
      // Uploading image
      const file_name = `plugex-${Date.now()}.${
        file.originalname.split('.')[1]
      }`;
      const uploaded = await b2.uploadFile({
        uploadUrl: uploadURL.data.uploadUrl,
        uploadAuthToken: uploadURL.data.authorizationToken,
        fileName: file_name,
        data: file.buffer,
        onUploadProgress: (event) => {
          Math.round((event.loaded / event.total) * 100);
        },
      });
  
      return {
        status: 'success',
        message: 'File uploaded to Backblaze B2',
        data: {
          url: `https://${process.env.BACKBLAZE_BUCKET}.s3.us-west-004.backblazeb2.com/${uploaded.data.fileName}`,
        },
      };
    }
  }
  