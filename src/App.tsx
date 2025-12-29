import { Suspense } from 'react'
import { PokemonList, Skeleton } from './components'
import { usePokemon } from './hooks/usePokemon'

function App() {
  const {
    limit,
    offset,
    searchTerm,
    currentPage,

    setSearchTerm,
    // setLimit,
    handlePrevious,
    handleNext,
    handleClearSearch,
    getPokemonsPromise,
  } = usePokemon(15)

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50'>
      <header className='bg-white shadow-md sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 py-4'>
          <h1 className='text-3xl font-bold text-gray-800 mb-4 text-center'>
            Pokedex
          </h1>

          <div className='flex gap-2 max-w-md mx-auto items-center'>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Buscar por nombre o id...'
              className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            {searchTerm && (
              <button
                type='button'
                onClick={handleClearSearch}
                className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'
              >
                Limpiar
              </button>
            )}
          </div>

          {/* <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select> */}
        </div>
      </header>

      <main>
        <Suspense fallback={<Skeleton count={limit} />}>
          <PokemonList
            getPokemonsPromise={getPokemonsPromise}
            offset={offset}
            searchTerm={searchTerm}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            currentPage={currentPage}
          />
        </Suspense>
      </main>
    </div>
  )
}

export default App
