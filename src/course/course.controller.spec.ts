import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CourseController', () => {
  let controller: CourseController;
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        CourseService,
        {
          provide: getRepositoryToken(Course),
          useValue: {}, // Mock repository if needed
        },
      ],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
  });

  describe('create', () => {
    it('should create a new course', async () => {
      const createCourseDto: CreateCourseDto = {
        title: 'Test Course',
        description: 'This is a test course',
        instructor: 'Test Instructor',
        duration: 60,
        price: 49.99,
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(() =>
          Promise.resolve({ id: 1, ...createCourseDto }),
        );

      const result = await controller.create(createCourseDto);

      expect(result).toEqual({ id: 1, ...createCourseDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const courses: Course[] = [
        {
          id: 1,
          title: 'Course 1',
          description: 'Course Description 1',
          instructor: 'Course Instructor Name 1',
          duration: 30,
          price: 25.6,
        },
        {
          id: 2,
          title: 'Course 2',
          description: 'Course Description 2',
          instructor: 'Course Instructor Name 2',
          duration: 40,
          price: 79.8,
        },
      ];

      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(courses));

      const result = await controller.findAll();

      expect(result).toEqual(courses);
    });
  });

  describe('getFilterCourses', () => {
    it('should return filtered courses', async () => {
      const filterParams = {
        instructor: 'Test Instructor',
        maxPrice: 50,
        minDuration: 30,
      };
      const filteredCourses: Course[] = [
        {
          id: 1,
          title: 'Filtered Course 1',
          description: 'Filtered Course Description 1',
          instructor: 'Filtered Course Instructor 1',
          duration: 45,
          price: 89.3,
        },
        {
          id: 2,
          title: 'Filtered Course 2',
          description: 'Filtered Course Description 2',
          instructor: 'Filtered Course Instructor 1',
          duration: 39,
          price: 30.5,
        },
      ];

      jest
        .spyOn(service, 'filterCourses')
        .mockImplementation(() => Promise.resolve(filteredCourses));

      const result = await controller.getFilterCourses(filterParams);

      expect(result).toEqual(filteredCourses);
    });
  });

  describe('findOne', () => {
    it('should return a course by ID', async () => {
      const courseId = 1;
      const course: Course = {
        id: courseId,
        title: 'Test Course',
        description: 'Test Course Description',
        instructor: 'Test Course Instructor',
        duration: 59,
        price: 35.2,
      };

      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(course));

      const result = await controller.findOne(courseId);

      expect(result).toEqual(course);
    });
  });

  describe('update', () => {
    it('should update a course by ID', async () => {
      const courseId = 1;
      const updateCourseDto: UpdateCourseDto = {
        title: 'Updated Course',
      };

      jest
        .spyOn(service, 'update')
        .mockImplementation(() =>
          Promise.resolve({ id: courseId, ...updateCourseDto }),
        );

      const result = await controller.update(courseId, updateCourseDto);

      expect(result).toEqual({ id: courseId, ...updateCourseDto });
    });
  });

  describe('remove', () => {
    it('should remove a course by ID', async () => {
      const courseId = 1;

      jest
        .spyOn(service, 'remove')
        .mockImplementation(() => Promise.resolve({ id: courseId }));

      const result = await controller.remove(courseId);

      expect(result).toEqual({ id: courseId });
    });
  });
});
