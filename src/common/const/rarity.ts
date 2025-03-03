export const RARITY = {
    PROMO: 'p',
    DIA_1: 'd1',
    DIA_2: 'd2',
    DIA_3: 'd3',
    DIA_4: 'd4',
    STAR_1: 's1',
    STAR_2: 's2',
    STAR_3: 's3',
    CROWN: 'c',
} as const;

export type Rarity = (typeof RARITY)[keyof typeof RARITY];
