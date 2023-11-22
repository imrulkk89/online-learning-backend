import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateCourseDto } from 'src/course/dto/create-course.dto';

export class CreateEnrollmentDto {
  @IsNotEmpty()
  @IsString()
  studentName: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateCourseDto)
  course: CreateCourseDto;
}
