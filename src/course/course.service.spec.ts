import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CourseService } from './course.service';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

describe('CourseService', () => {
  let service: CourseService;
  let repository: Repository<Course>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: getRepositoryToken(Course),
          useClass: Repository, // Use the actual Repository class for testing
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    repository = module.get<Repository<Course>>(getRepositoryToken(Course));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      const saveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(createCourseDto as Course);

      const result = await service.create(createCourseDto);

      expect(saveSpy).toHaveBeenCalledWith(createCourseDto);
      expect(result).toEqual(createCourseDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const courses = [
        { id: 1, title: 'Course 1' },
        { id: 2, title: 'Course 2' },
      ];

      const findSpy = jest
        .spyOn(repository, 'find')
        .mockResolvedValue(courses as Course[]);

      const result = await service.findAll();

      expect(findSpy).toHaveBeenCalled();
      expect(result).toEqual(courses);
    });
  });

  describe('findOne', () => {
    it('should return a course by ID', async () => {
      const courseId = 1;
      const course = { id: courseId, title: 'Test Course' };

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(course as Course);

      const result = await service.findOne(courseId);

      expect(findOneSpy).toHaveBeenCalledWith({ where: { id: courseId } });
      expect(result).toEqual(course);
    });
  });

  describe('update', () => {
    it('should update a course by ID', async () => {
      const courseId = 1;
      const updateCourseDto: UpdateCourseDto = { title: 'Updated Course' };

      const updateSpy = jest
        .spyOn(repository, 'update')
        .mockResolvedValue(undefined);
      const findOneSpy = jest.spyOn(repository, 'findOne').mockResolvedValue({
        id: courseId,
        ...updateCourseDto,
      } as Course);

      const result = await service.update(courseId, updateCourseDto);

      expect(updateSpy).toHaveBeenCalledWith(courseId, updateCourseDto);
      expect(findOneSpy).toHaveBeenCalledWith({ where: { id: courseId } });
      expect(result).toEqual({ id: courseId, ...updateCourseDto });
    });
  });

  describe('remove', () => {
    it('should remove a course by ID', async () => {
      const courseId = 1;

      const deleteSpy = jest
        .spyOn(repository, 'delete')
        .mockResolvedValue(undefined);

      const result = await service.remove(courseId);

      expect(deleteSpy).toHaveBeenCalledWith(courseId);
      expect(result).toEqual(undefined);
    });
  });
});
