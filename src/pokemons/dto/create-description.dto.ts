import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { lang, LANG } from 'src/common/const/lang';

export class CreateDescriptionDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsEnum(LANG)
    lang: lang = 'eng';
}
