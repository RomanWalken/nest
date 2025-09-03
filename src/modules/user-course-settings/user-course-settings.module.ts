import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCourseSettings, UserCourseSettingsSchema } from './schemas/user-course-settings.schema';
import { UserCourseSettingsService } from './user-course-settings.service';
import { UserCourseSettingsController } from './user-course-settings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCourseSettings.name, schema: UserCourseSettingsSchema }
    ])
  ],
  controllers: [UserCourseSettingsController],
  providers: [UserCourseSettingsService],
  exports: [UserCourseSettingsService],
})
export class UserCourseSettingsModule {}
