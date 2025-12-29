import { useState } from 'react'

import PokemonDetail from './PokemonDetail'
import TypeBadge from './TypeBadge'
import type { Pokemon } from '../interface'
import { formatNumber } from '../utils'

interface Props {
  pokemon: Pokemon
}

const PokemonCard = ({ pokemon }: Props) => {  
  const [isOpen, setIsOpen] = useState(false)

  const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default
  const pokemonNumber = formatNumber(pokemon.id)

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className="relative border-2 border-gray-200 rounded-xl p-5 hover:shadow-2xl transition-all duration-300 cursor-pointer group bg-white overflow-hidden" onClick={handleOpenModal}>
        <div className="flex justify-between items-start mb-3">
          <span className="text-gray-400 text-xs font-bold tracking-wider">#{pokemonNumber}</span>
        </div>
        
        <div className="flex justify-center items-center mb-4 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg p-4 group-hover:from-gray-100 group-hover:to-gray-200 transition-colors h-40">
          <img 
            className="w-32 h-32 object-contain transition-all duration-500 group-hover:scale-110 brightness-110 contrast-110" 
            src={imageUrl} 
            alt={pokemon.name}
            loading="lazy"
          />
        </div>
        
        <h2 className="text-lg font-bold text-center mb-4 capitalize text-gray-800 group-hover:text-gray-900 transition-colors">
          {pokemon.name}
        </h2>
        
        <div className="flex gap-2 justify-center flex-wrap">
          {pokemon.types.map((typeInfo) => (
            <TypeBadge key={typeInfo.slot} type={typeInfo.type.name} />
          ))}
        </div>
      </div>

      <PokemonDetail initialPokemon={pokemon} isOpen={isOpen} onClose={handleCloseModal} />
    </>
  )
}

export default PokemonCard