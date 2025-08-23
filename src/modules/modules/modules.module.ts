import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Module as CourseModule, ModuleSchema } from './schemas/module.schema';
import { CourseModulesController } from './modules.controller';
import { ModulesService } from './modules.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseModule.name, schema: ModuleSchema }
    ])
  ],
  controllers: [CourseModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {} 