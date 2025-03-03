import { PartialType } from '@nestjs/mapped-types';
import { CreateAbilityDto } from './create-ability.dto';

export class UpdateAbilityDto extends PartialType(CreateAbilityDto) {}
