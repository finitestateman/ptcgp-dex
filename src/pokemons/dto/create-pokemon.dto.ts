import { Type } from 'class-transformer';
import {
    IsIn,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsString,
    ValidateNested,
} from 'class-validator';
import { RPG_TYPE, RpgType } from 'src/common/const/types';
import { IsSlug } from 'src/common/decorators/isSlug.decorator';
import { CreateDescriptionDto } from './create-description.dto';

export class CreatePokemonDto {
    @IsOptional()
    @IsInt()
    @IsPositive()
    dexNo: number;

    @IsNotEmpty()
    @IsSlug()
    identifier: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    species: string;

    @IsIn(Object.values(RPG_TYPE))
    type1: RpgType;

    @IsOptional()
    @IsIn(Object.values(RPG_TYPE))
    type2?: RpgType;

    @IsOptional()
    @IsInt()
    @IsPositive()
    height?: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    weight?: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    introducedGen?: number;

    // @IsOptional()
    // @IsString()
    // @IsNotEmpty()
    // content?: string;

    @IsNotEmpty()
    @Type(() => CreateDescriptionDto)
    @ValidateNested()
    description: CreateDescriptionDto;
}
