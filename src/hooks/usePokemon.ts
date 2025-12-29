import { useCallback, useMemo, useState } from 'react'
import { getPokemons } from '../services/pokemonService'

export const usePokemon = (initialLimit: number = 15) => {
  const [limit, setLimit] = useState(initialLimit)
  const [offset, setOffset] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  const handlePrevious = useCallback(() => {
    setOffset((prev) => Math.max(0, prev - limit))
    setSearchTerm('')
  }, [limit])

  const handleNext = useCallback(() => {
    setOffset((prev) => prev + limit)
    setSearchTerm('')
  }, [limit])

  const handleClearSearch = useCallback(() => {
    setSearchTerm('')
    setOffset(0)
  }, [])

  const currentPage = useMemo(() => Math.floor(offset / limit) + 1, [offset, limit])

  return {
    limit,
    offset,
    searchTerm,
    currentPage,
    
    setLimit,
    setSearchTerm,
    
    handlePrevious,
    handleNext,
    handleClearSearch,

    getPokemonsPromise: getPokemons(limit, offset, searchTerm),
  }
}

