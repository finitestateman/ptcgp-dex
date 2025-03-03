export const LANG = {
    ENG: 'eng',
    SPA: 'spa',
    FRA: 'fra',
    GER: 'ger',
    JPN: 'jpn',
    KOR: 'kor',
    CHT: 'cht',
} as const;

export type lang = (typeof LANG)[keyof typeof LANG];
