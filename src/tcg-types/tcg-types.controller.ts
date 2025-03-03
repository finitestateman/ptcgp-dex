import { Controller } from '@nestjs/common';
import { TcgTypesService } from './tcg-types.service';

@Controller('tcg-types')
export class TcgTypesController {
    constructor(private readonly tcgTypesService: TcgTypesService) {}
}
