export type Character = {
    id: string;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: {
      name: string;
    };
    location: {
      name: string;
    };
    image: string;
  }
  
export type CharactersResult = {
    characters: {
      results: Character[];
      info: {
        next: number | null;
      };
    };
  }