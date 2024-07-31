import { IsString, IsDate } from 'class-validator';

export class CreateBooksDto {
  @IsString() id: string;
  @IsString() title: string;
  @IsString() author: string;
  @IsDate() published_date: Date;

  
}
