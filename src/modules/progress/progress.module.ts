import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProgress, UserProgressSchema } from './schemas/user-progress.schema';
import { UserProgressController } from './progress.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserProgress.name, schema: UserProgressSchema }
    ])
  ],
  controllers: [UserProgressController],
  providers: [],
  exports: [],
})
export class ProgressModule {} 