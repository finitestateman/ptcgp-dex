export const isValidPokemonIdentifier = (value: string): boolean => {
    const pokemonIdentifierRegex = /^[a-z]+([a-z0-9-]+)*$/;
    return pokemonIdentifierRegex.test(value);
};
