import { PartialType } from '@nestjs/swagger';
import { CreateUserCourseSettingsDto } from './create-user-course-settings.dto';

export class UpdateUserCourseSettingsDto extends PartialType(CreateUserCourseSettingsDto) {}
