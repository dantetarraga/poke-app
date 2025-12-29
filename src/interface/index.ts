export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
  species: {
    name: string
    url: string
  }
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

export interface PokemonListWithDetails {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}

export interface PokemonSpecies {
  id: number
  name: string
  evolution_chain: {
    url: string
  }
}

export interface EvolutionChain {
  chain: EvolutionDetail
}

export interface EvolutionDetail {
  species: {
    name: string
    url: string
  }
  evolves_to: EvolutionDetail[]
}