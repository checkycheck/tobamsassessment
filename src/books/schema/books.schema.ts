/* eslint-disable @typescript-eslint/no-unused-vars */
import * as mongoose from 'mongoose';
import { Books } from '../interface/bookss.interface';

export const BooksSchema = new mongoose.Schema<Books>(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    published_date: {
      type: Date,
    },
    ISBN: {
      type: String,
    },
    cover_image: {
      type: String,
    },
  },
  { timestamps: true },
);

BooksSchema.method('toJSON', function () {
  const { __v, id, ...object } = this.toObject();
  const newObject = {
    ...object,
  };
  return newObject;
});

