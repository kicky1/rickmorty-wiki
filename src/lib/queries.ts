export const GET_CHARACTERS_QUERY = `
  query GetCharacters($name: String, $species: String, $status: String, $type: String, $gender: String, $page: Int) {
    characters(filter: { name: $name, species: $species, status: $status, type: $type, gender: $gender }, page: $page) {
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
          id
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


export const GET_LOCATION_QUERY = `
  query GetLocation($locationId: ID!) {
    location(id: $locationId) {
      id
      name
      type
      dimension
    }
  } 
`