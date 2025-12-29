import axiosRequest from '../config/axios'
import type { PokemonListResponse, Pokemon, PokemonListWithDetails } from '../interface'

export const getPokemonDetails = async (
  url: string
): Promise<Pokemon | null> => {
  const [data, error] = await axiosRequest<Pokemon>({
    method: 'GET',
    url,
  })

  if (error) {
    console.error(error)
    return null
  }

  return data
}

export const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<PokemonListWithDetails | null> => {
  const [data, error] = await axiosRequest<PokemonListResponse>({
    method: 'GET',
    url: '/pokemon',
    params: { limit, offset },
  })

  if (error || !data) {
    if (error) console.error(error)
    return null
  }

  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const details = await getPokemonDetails(pokemon.url)
      return details
    })
  )

  const filteredPokemonDetails = pokemonDetails.filter(
    (pokemon): pokemon is Pokemon => pokemon !== null
  )

  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: filteredPokemonDetails,
  }
}

export const getPokemonByName = async (
  name: string
): Promise<Pokemon | null> => {
  const [data, error] = await axiosRequest<Pokemon>({
    method: 'GET',
    url: `/pokemon/${name}`,
  })

  if (error) {
    console.error(error)
    return null
  }

  return data
}
