import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidPokemonIdentifier } from 'src/common/utils/pokemon.util';

@Injectable()
export class PokemonKeyPipe implements PipeTransform<unknown, string | number> {
    transform(value: unknown): string | number {
        if (typeof value === 'string') {
            if (/^[1-9]+[0-9]*$/.test(value)) {
                return Number(value);
            } else if (isValidPokemonIdentifier(value)) {
                return value;
            }
        }

        throw new BadRequestException('Invalid key');
    }
}
