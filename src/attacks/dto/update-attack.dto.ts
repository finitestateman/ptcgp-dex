import { PartialType } from '@nestjs/mapped-types';
import { CreateAttackDto } from './create-attack.dto';

export class UpdateAttackDto extends PartialType(CreateAttackDto) {}
