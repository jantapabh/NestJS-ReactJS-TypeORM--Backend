import { Inject, Injectable } from '@nestjs/common';
import Course from './course.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import Review from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ObjectID } from 'mongodb';

@Injectable()
export class CoursesService {
 
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(Review) private reviewRepository: Repository<Review>

  ) {}
  
  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

//สร้าง service create เอาไว้สำหรับสรา้ง course ใหม่

  async create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.save(createCourseDto);
  }

  async findAllReviews(courseId: ObjectID): Promise<Review[]>{
   return this.reviewRepository.find({ where: {courseId: courseId}});
  }

  //สร้าง service create Review

  async createReview(createReviewDto: CreateReviewDto) {
    return this.reviewRepository.save(createReviewDto);

  }
}
