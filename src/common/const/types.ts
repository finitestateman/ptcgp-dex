export const RPG_TYPE = {
    NORMAL: 'normal',
    FIRE: 'fire',
    WATER: 'water',
    ELECTRIC: 'electric',
    GRASS: 'grass',
    ICE: 'ice',
    FIGHTING: 'fighting',
    POISON: 'poison',
    GROUND: 'ground',
    FLYING: 'flying',
    PSYCHIC: 'psychic',
    BUG: 'bug',
    ROCK: 'rock',
    GHOST: 'ghost',
    DRAGON: 'dragon',
    DARK: 'dark',
    STEEL: 'steel',
    FAIRY: 'fairy',
    STELLAR: 'stellar',
} as const;

export type RpgType = (typeof RPG_TYPE)[keyof typeof RPG_TYPE];

export const TCG_TYPE = {
    GRASS: 'grass',
    FIRE: 'fire',
    WATER: 'water',
    LIGHTNING: 'lightning',
    PSYCHIC: 'psychic',
    FIGHTING: 'fighting',
    DARKNESS: 'darkness',
    METAL: 'metal',
    DRAGON: 'dragon',
    COLORLESS: 'colorless',
} as const;

export type TcgType = (typeof TCG_TYPE)[keyof typeof TCG_TYPE];

export const ENERGY = TCG_TYPE;
export type Energy = TcgType;

export const OPERATOR = {
    PLUS: '+',
    TIMES: '*',
};

export type Operator = (typeof OPERATOR)[keyof typeof OPERATOR];
