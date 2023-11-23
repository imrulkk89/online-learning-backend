import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

class CourseFilterParams {
  @IsOptional()
  @ApiPropertyOptional()
  instructor: string;

  @IsOptional()
  @ApiPropertyOptional()
  maxPrice: number;

  @IsOptional()
  @ApiPropertyOptional()
  minDuration: number;
}

export { CourseFilterParams };
