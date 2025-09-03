import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  constructor(private readonly maxSize: number = 2 * 1024 * 1024) {}
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!value) throw new BadRequestException('No file uploaded!');
    if (value.size > this.maxSize) {
      throw new BadRequestException(
        `File too large. Max allowed size is ${this.maxSize / 1024 / 1024} MB`,
      );
    }
    return value;
  }
}
