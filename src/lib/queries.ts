export const GET_CHARACTERS_QUERY = `
  query GetCharacters($name: String, $species: String, $page: Int) {
    characters(filter: { name: $name, species: $species }, page: $page) {
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
        location {
          name
        }
        image
      }
      info {
        next
      }
    }
  }
`;
