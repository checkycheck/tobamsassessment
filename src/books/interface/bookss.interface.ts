import * as mongoose from 'mongoose';

export interface Books extends mongoose.Document {
  readonly id: string;
  title: string;
  author: string;
  published_date: Date;
  ISBN: string;
  cover_image: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
