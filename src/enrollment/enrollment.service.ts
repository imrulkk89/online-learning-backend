import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { Course } from '../course/entities/course.entity';
//import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(enrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    const savedCourse: Course = await this.courseRepository.findOne({
      where: { id: enrollmentDto.courseId },
    });

    if (!savedCourse) {
      throw new HttpException('Course not Found!', HttpStatus.NOT_FOUND);
    }

    const enrollment = new Enrollment();
    enrollment.course = savedCourse;
    enrollment.studentName = enrollmentDto.studentName;
    return await this.enrollmentRepository.save(enrollment);
  }

  async findAll(): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find();
  }

  /*async findOne(id: number) {
    return `This action returns a #${id} enrollment`;
  }

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return `This action updates a #${id} enrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  } */
}
