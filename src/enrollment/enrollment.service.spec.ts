import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentService } from './enrollment.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Course } from '../course/entities/course.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('EnrollmentService', () => {
  let service: EnrollmentService;
  let enrollmentRepository: Repository<Enrollment>;
  let courseRepository: Repository<Course>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnrollmentService,
        {
          provide: getRepositoryToken(Enrollment),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Course),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EnrollmentService>(EnrollmentService);
    enrollmentRepository = module.get<Repository<Enrollment>>(
      getRepositoryToken(Enrollment),
    );
    courseRepository = module.get<Repository<Course>>(
      getRepositoryToken(Course),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new enrollment', async () => {
      const savedCourse: Course = {
        id: 1,
        title: 'Test Course',
        description: 'Test Course Description',
        instructor: 'Test Instructor',
        duration: 60,
        price: 49.99,
      };

      const createEnrollmentDto: CreateEnrollmentDto = {
        studentName: 'Test Student',
        courseId: 1,
      };

      const findOneSpy = jest
        .spyOn(courseRepository, 'findOne')
        .mockResolvedValue(savedCourse);
      const saveSpy = jest
        .spyOn(enrollmentRepository, 'save')
        .mockImplementation(async (enrollment) =>
          Promise.resolve(enrollment as Enrollment),
        );

      const result = await service.create(createEnrollmentDto);

      expect(findOneSpy).toHaveBeenCalledWith({
        where: { id: createEnrollmentDto.courseId },
      });
      expect(saveSpy).toHaveBeenCalledWith(expect.any(Enrollment));
      expect(result.studentName).toEqual(createEnrollmentDto.studentName);
      expect(result.course).toEqual(savedCourse);
    });

    it('should throw an exception if course not found', async () => {
      const createEnrollmentDto: CreateEnrollmentDto = {
        studentName: 'Test Student',
        courseId: 1,
      };

      jest.spyOn(courseRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.create(createEnrollmentDto)).rejects.toThrowError(
        new HttpException('Course not Found!', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of enrollments', async () => {
      const enrollments = [
        { id: 1, studentName: 'Student 1', courseId: 1 },
        { id: 2, studentName: 'Student 2', courseId: 2 },
      ];

      jest
        .spyOn(enrollmentRepository, 'find')
        .mockResolvedValue(enrollments as unknown as Enrollment[]);

      const result = await service.findAll();

      expect(result).toEqual(enrollments);
    });
  });
});
