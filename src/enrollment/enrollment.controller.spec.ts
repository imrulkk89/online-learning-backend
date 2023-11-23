import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from '../course/entities/course.entity';
import { Enrollment } from './entities/enrollment.entity';

describe('EnrollmentController', () => {
  let controller: EnrollmentController;
  let service: EnrollmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnrollmentController],
      providers: [
        EnrollmentService,
        {
          provide: getRepositoryToken(Enrollment),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Course),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<EnrollmentController>(EnrollmentController);
    service = module.get<EnrollmentService>(EnrollmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new enrollment', async () => {
      const createEnrollmentDto = {
        courseId: 1,
        studentName: 'Test Student',
        enrollmentDate: new Date(),
        course: {
          id: 1,
          title: 'Test Course',
          description: 'Test Course Description',
          instructor: 'Test Course Instructor',
          duration: 59,
          price: 35.2,
        },
      };

      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValue({ id: 1, ...createEnrollmentDto });

      const result = await controller.create(createEnrollmentDto);

      expect(createSpy).toHaveBeenCalledWith(createEnrollmentDto);
      expect(result).toEqual({ id: 1, ...createEnrollmentDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of enrollments', async () => {
      const enrollments = [
        {
          id: 1,
          studentName: 'Student 1',
          courseId: 1,
          enrollmentDate: new Date(),
          course: {
            id: 2,
            title: 'Test Course 1',
            description: 'Test Course Description 1',
            instructor: 'Test Course Instructor 1',
            duration: 59,
            price: 35.2,
          },
        },
        {
          id: 2,
          studentName: 'Student 2',
          courseId: 2,
          enrollmentDate: new Date(),
          course: {
            id: 3,
            title: 'Test Course 2',
            description: 'Test Course Description 2',
            instructor: 'Test Course Instructor 2',
            duration: 56,
            price: 145.4,
          },
        },
      ];

      const findAllSpy = jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(enrollments);

      const result = await controller.findAll();

      expect(findAllSpy).toHaveBeenCalled();
      expect(result).toEqual(enrollments);
    });
  });
});
