import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksSchema } from './schema/books.schema';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BackblazeService } from 'src/middlewares/backblaze.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Books', schema: BooksSchema }]),
  ],

  controllers: [BooksController],
  providers: [
    BooksService,
    BackblazeService,
  ],
})
export class BooksModule {}
