import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBooksDto } from './dto/create-books.dto';
import { UpdateBookDto } from './dto/update-content.dto';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            getBooks: jest.fn(),
            getBook: jest.fn(),
            createBooks: jest.fn(),
            updateBook: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBooks', () => {
    it('should return an array of books', async () => {
      const result = [{
        "_id": "66aa223e4b17090ff08dd37d",
        "title": "Games of  thrones",
        "author": "George R. R. Martin",
        "published_date": "2024-07-14T18:30:39.000Z",
        "ISBN": "ISBN-13. 978-0553593716",
        "createdAt": "2024-07-31T11:38:38.469Z",
        "updatedAt": "2024-07-31T11:38:38.469Z"
    }];
      jest.spyOn(service, 'getBooks').mockResolvedValue(result as any);

      expect(await controller.getBooks()).toEqual({
        status: 'success',
        message: 'Books fetch successfully',
        data: result,
      });
    });
  });

  describe('getBook', () => {
    it('should return a single book', async () => {
      const result = { title: 'Test Book' };
      jest.spyOn(service, 'getBook').mockResolvedValue(result as any);

      expect(await controller.getBook('1')).toEqual(result);
    });
  });

  describe('createBooks', () => {
    it('should create a new book', async () => {
      const payload: CreateBooksDto = { title: 'New Book', id: "66aa22664b17090ff08dd37f", author: "author", published_date: new Date() };
      const result = { title: 'New Book' };
      jest.spyOn(service, 'createBooks').mockResolvedValue(result as any);

      expect(await controller.createBooks(payload)).toEqual(result);
    });
  });

  describe('updateBooks', () => {
    it('should update a book', async () => {
      const payload: UpdateBookDto = { title: 'Updated Book', author: "author", published_date: new Date(), ISBN: "sjb28bd", cover_image: "image.com" };
      const result = { title: 'Updated Book' };
      jest.spyOn(service, 'updateBook').mockResolvedValue(result as any);

      expect(await controller.updateBooks('1', payload)).toEqual({
        success: true,
        message: 'Book updated successfully',
      });
    });
  });
});
