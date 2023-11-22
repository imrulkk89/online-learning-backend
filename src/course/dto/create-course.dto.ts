import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  instructor: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  duration: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
}
