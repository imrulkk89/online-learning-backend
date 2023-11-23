import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @IsNotEmpty()
  @IsString()
  studentName: string;

  @IsNotEmpty()
  courseId: number;
}
