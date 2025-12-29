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

export interface PokemonType {
  name: string
  url: string
}

export interface PokemonTypeResponse {
  count: number
  results: PokemonType[]
}

export interface PokemonTypeDetail {
  id: number
  name: string
  color: {
    name: string
    url: string
  }
}

export interface TypeColorMap {
  [key: string]: {
    bg: string
    text: string
    border: string
    hex?: string
  }
}