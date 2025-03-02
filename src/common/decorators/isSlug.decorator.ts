import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { isValidPokemonIdentifier } from '../utils/pokemon.util';

//         throw new BadRequestException('Invalid slug');
//     },
// });

@ValidatorConstraint({ async: false })
export class IsSlugConstraint implements ValidatorConstraintInterface {
    validate(value: unknown) {
        return typeof value === 'string' && isValidPokemonIdentifier(value);
    }

    defaultMessage() {
        return 'Invalid slug: must contain only lowercase letters, numbers, and hyphens. Hyphens cannot be at the start or end.';
    }
}

export function IsSlug(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsSlugConstraint,
        });
    };
}
