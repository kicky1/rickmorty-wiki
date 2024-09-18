import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://rickandmortyapi.com/graphql'

export const graphQLClient = new GraphQLClient(endpoint)