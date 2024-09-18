'use client'

import { useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { graphQLClient } from '@/lib/graphqlClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { GET_CHARACTERS_QUERY } from '@/lib/queries'
import SkeletonCard from './skeletonCard'
import { type CharactersResult } from '../types/character.type'
import { CharacterCard } from './characterCard'
import LocationDialog from './locationDialog'

export default function CharacterSearch() {
  const [searchParams, setSearchParams] = useState({
    name: '',
    species: '',
    status: '',
    type: '',
    gender: '',
  })
  const [searchTrigger, setSearchTrigger] = useState(0)

  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<CharactersResult, Error>({
    queryKey: ['characters', searchParams, searchTrigger],
    queryFn: async ({ pageParam }) => {
      const variables = {
        name: searchParams.name || undefined,
        species: searchParams.species || undefined,
        status: searchParams.status || undefined,
        type: searchParams.type || undefined,
        gender: searchParams.gender || undefined,
        page: pageParam || 1,
      }
      return graphQLClient.request<CharactersResult>(GET_CHARACTERS_QUERY, variables)
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.characters.info.next,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchTrigger(prev => prev + 1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4 grid grid-cols-2 md:grid-cols-5 auto-cols-auto gap-4 ">
        <Input
          type="text"
          name="name"
          placeholder="Character name"
          className='max-w-[320px] border-2 border-green-500 text-green-300 placeholder:text-green-300 shadow-[1px_1px_5px_rgba(3,138,255,1)]'
          value={searchParams.name}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="species"
          placeholder="Species"
          className='max-w-[320px] border-2 border-green-500 text-green-300 placeholder:text-green-300 shadow-[1px_1px_5px_rgba(3,138,255,1)]'
          value={searchParams.species}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="gender"
          placeholder="Gender"
          className='max-w-[320px] border-2 border-green-500 text-green-300 placeholder:text-green-300 shadow-[1px_1px_5px_rgba(3,138,255,1)]'
          value={searchParams.gender}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="type"
          placeholder="Type"
          className='max-w-[320px] border-2 border-green-500 text-green-300 placeholder:text-green-300 shadow-[1px_1px_5px_rgba(3,138,255,1)]'
          value={searchParams.type}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="status"
          placeholder="Status"
          className='max-w-[320px] border-2 border-green-500 text-green-300 placeholder:text-green-300 shadow-[1px_1px_5px_rgba(3,138,255,1)]'
          value={searchParams.status}
          onChange={handleInputChange}
        />
      </form>
      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className="grid gap-4 md:grid-cols-2">
          {data.pages.map((page) =>
            page.characters.results.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))
          )}
        </div>
      )}
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-4 text-green-200 border-2 border-green-500 shadow-[1px_1px_5px_rgba(3,138,255,1)] hover:bg-green-500 hover:text-white"
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </Button>
      )}
    </div>
  )
}
