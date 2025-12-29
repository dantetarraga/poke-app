import { use } from 'react'
import type { PokemonListWithDetails } from '../interface'
import PokemonCard from './PokemonCard'

interface Props {
  getPokemonsPromise: Promise<PokemonListWithDetails>
  offset: number
  searchTerm: string
  currentPage: number
  handlePrevious: () => void
  handleNext: () => void
}

const PokemonList = ({
  getPokemonsPromise,
  offset,
  searchTerm,
  currentPage,
  handlePrevious,
  handleNext,
}: Props) => {
  const pokemons = use(getPokemonsPromise)

  if (pokemons.results.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] p-6'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-700 mb-2'>
            No se encontraron resultados
          </h2>
          
          <p className='text-gray-500'>
            No existe ningún Pokémon con ese nombre o id
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 p-6 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50'>
        {pokemons.results.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>

      {!searchTerm && (
        <div className='flex items-center justify-center gap-4 pb-8 px-4'>
          <button
            onClick={handlePrevious}
            disabled={offset === 0}
            className='px-6 py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm'
          >
            Anterior
          </button>

          <span className='px-6 py-3 bg-white border-2 border-blue-500 rounded-lg font-semibold text-blue-600 shadow-sm'>
            Página {currentPage}
          </span>

          <button
            onClick={handleNext}
            disabled={!pokemons.next}
            className='px-6 py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm'
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  )
}

export default PokemonList
