import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
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
    await this.courseRepository.update(id, updateCourseDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    return await this.courseRepository.delete(id);
  }

  async filterCourses(
    instructor?: string,
    maxPrice?: number,
    minDuration?: number,
  ): Promise<Course[]> {
    const query: any = {};

    if (instructor) {
      query.instructor = Like(`%${instructor}%`);
    }

    if (maxPrice !== undefined) {
      query.price = LessThanOrEqual(maxPrice);
    }

    if (minDuration !== undefined) {
      query.duration = MoreThanOrEqual(minDuration);
    }

    return await this.courseRepository.find({ where: query });
  }
}
