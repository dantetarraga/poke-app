import axiosRequest from '../config/axios'
import type { 
  PokemonListResponse, 
  Pokemon, 
  PokemonListWithDetails,
  PokemonSpecies,
  EvolutionChain,
  EvolutionDetail,
} from '../interface'

export const getPokemonDetails = async (url: string): Promise<Pokemon> => {
  const pokemon = await axiosRequest<Pokemon>({
    method: 'GET',
    url,
  })

  return pokemon
}

export const getPokemons = async (
  limit = 20,
  offset = 0,
  searchTerm = ''
): Promise<PokemonListWithDetails> => {
  
  if (searchTerm) {
    const pokemon = await axiosRequest<Pokemon>({
      method: 'GET',
      url: `/pokemon/${searchTerm.toLowerCase()}`,
    })

    if (!pokemon) {
      return {
        count: 0,
        next: null,
        previous: null,
        results: [],
      }
    }

    return {
      count: 1,
      next: null,
      previous: null,
      results: [pokemon],
    }
  }

  const data = await axiosRequest<PokemonListResponse>({
    method: 'GET',
    url: '/pokemon',
    params: { limit, offset },
  })

  if (!data) {
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    }
  }

  const pokemonDetails = await Promise.all(
    data.results.map((pokemon) => getPokemonDetails(pokemon.url))
  )

  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: pokemonDetails,
  }
}

export const getPokemonByName = async (name: string): Promise<Pokemon> => {
  return await axiosRequest<Pokemon>({
    method: 'GET',
    url: `/pokemon/${name}`,
  })
}

export const getPokemonSpecies = async (speciesUrl: string): Promise<PokemonSpecies> => {
  return await axiosRequest<PokemonSpecies>({
    method: 'GET',
    url: speciesUrl,
  })
}

export const getEvolutionChain = async (evolutionChainUrl: string): Promise<EvolutionChain> => {
  return await axiosRequest<EvolutionChain>({
    method: 'GET',
    url: evolutionChainUrl,
  })
}

const extractEvolutionNames = (evolutionDetail: EvolutionDetail): string[] => {
  const names = [evolutionDetail.species.name]
  
  evolutionDetail.evolves_to.forEach((evolution) => {
    names.push(...extractEvolutionNames(evolution))
  })

  return names
}

export const getPokemonEvolutions = async (pokemon: Pokemon): Promise<string[]> => {
  const species = await getPokemonSpecies(pokemon.species.url)
  
  if (!species?.evolution_chain) return []
  const evolutionChain = await getEvolutionChain(species.evolution_chain.url)

  if (!evolutionChain) return []
  const allNames = extractEvolutionNames(evolutionChain.chain)
  
  return allNames
}
