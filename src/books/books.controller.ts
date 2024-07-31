import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Patch,
  UseFilters,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CreateBooksDto } from './dto/create-books.dto';
import { UpdateBookDto } from './dto/update-content.dto';
import { BooksService } from './books.service';
import { Multer } from 'multer';
import { BackblazeService } from '../middlewares/backblaze.middleware'

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private backblazeService: BackblazeService,
  ) {}

  @Get('/')
  async getBooks() {
    const books = await this.booksService.getBooks();
    return books;
  }

  @Get('/:id')
  async getBook(@Param('id') id: string,) {
    return await this.booksService.getBook(id);
  }

  @Post('/')
  async createBooks(@Body() payload: CreateBooksDto) {
    return this.booksService.createBooks(payload);
  }



  @Patch('/cover-image/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Param('id') id: string, @UploadedFile() file: Multer.File) {
    
    const upload = await this.backblazeService.uploadFileToBackblaze(file);
    
    const payload = {
      cover_image: upload.data.url
    }
    const updateBook = await this.booksService.updateBook(payload, id)
    return {
      success: true,
      message: "Cover image uploaded successfully",
    }
  }


  @Put('/:id')
  async updateBooks(@Param('id') id: string, @Body() payload: UpdateBookDto) {
    this.booksService.updateBook(payload, id);
    return {
      success: true,
      message: 'Book updated successfully',
    }
  }

}
