import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(course: CreateCourseDto): Promise<Course> {
    return await this.courseRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async findOne(id: number): Promise<Course> {
    return await this.courseRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<any> {
    return await this.courseRepository.update(id, updateCourseDto);
  }

  async remove(id: number): Promise<any> {
    return await this.courseRepository.delete(id);
  }
}
