import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional } from 'class-validator';


export class UpdateBookDto {
  @ApiProperty() @IsOptional() @IsString() title: string;
  @ApiProperty() @IsOptional() @IsString() author: string;
  @ApiProperty() @IsOptional() @IsDate() published_date: Date;
  @ApiProperty() @IsOptional() @IsString() ISBN: string;
  @ApiProperty() @IsOptional() @IsString() cover_image: string;
}
