import { Suspense, useState } from 'react'

import { getPokemons } from './services/pokemonService'
import { PokemonList } from './components'

function App() {
  const [limit, setLimit] = useState(20)
  const [offset, setOffset] = useState(0)

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value))
  }

  const handleOffsetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOffset(parseInt(event.target.value))
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PokemonList pokemonListPromise={getPokemons(limit, offset)} />
    </Suspense>
  )
}

export default App
