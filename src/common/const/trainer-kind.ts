export const TRAINER_KIND = {
    ITEM: 'item', // Item
    POKEMON_TOOL: 'tool', // Pokémon Tool
    FOSSIL: 'fossil', // Item (Fossil)
    SUPPORTER: 'supporter', // Supporter
} as const;

export type TrainerKind = (typeof TRAINER_KIND)[keyof typeof TRAINER_KIND];
