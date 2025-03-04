import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsString,
} from 'class-validator';
import { lang, LANG } from 'src/common/const/lang';
import { RPG_TYPE, RpgType } from 'src/common/const/types';
import { IsSlug } from 'src/common/decorators/isSlug.decorator';

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
    species: string;

    @IsEnum(RPG_TYPE)
    type1: RpgType;

    @IsOptional()
    @IsEnum(RPG_TYPE)
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
    @IsEnum(LANG)
    lang: lang;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    name: string;
}
