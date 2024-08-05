import { Injectable, HttpException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBooksDto } from './dto/create-books.dto';
import { Books } from './interface/bookss.interface';


@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Books') private readonly booksModel: Model<Books>,
  ) {}

  async createBooks(payload: CreateBooksDto) {
    const book = await this.booksModel.create(payload);
    return {
      success: true,
      message: 'Book creeated successfully',
      data: book
    };
  }

  async getBooks() {
    const books = await this.booksModel.find().exec();
    if (!books) {
      throw new HttpException(
        { success: false, message: 'Unable to fetch books' },
        404,
      );
    }
    return books;
  }

  async getBook(id: String) {
    try {
      const book = await this.booksModel.findById(id)
     if (!book) {
      throw new HttpException(
        { success: false, message: 'Unable to fetch book with this id' },
        404,
      );
    }

    return {
      success: true,
      message: 'Book fetch successfully',
      data: book
    }
    } catch (error) {
      return {
        success: false,
        message: 'unable to fetch books',
        data: error
      }
    }
    
  }

  async updateBook(payload, id) {
    const books = await this.booksModel.findById(id);
    if (!books) {
      throw new HttpException(
        { success: false, message: 'Unable to fetch books' },
        404,
      );
    };

    return await this.booksModel.findByIdAndUpdate(
        id,
        payload,
        { new: true }
    );
  }

  async deleteBook(id: string) {
    const result = await this.booksModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpException(
        { success: false, message: 'Book not found' },
        404,
      );
    }
    return {
      success: true,
      message: 'Book deleted successfully',
    };
  }
}
