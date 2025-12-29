import { useEffect, useState, useCallback } from "react"

import Modal from "./Modal"
import TypeBadge from "./TypeBadge"

import { getPokemonByName, getPokemonEvolutions } from "../services/pokemonService"
import { delay, formatNumber } from "../utils"
import type { Pokemon } from "../interface"

interface Props {
  initialPokemon: Pokemon
  isOpen: boolean
  onClose: () => void
}

const PokemonDetail = ({ initialPokemon, isOpen, onClose }: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon>(initialPokemon)
  const [evolutions, setEvolutions] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)

  const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default

  useEffect(() => {
    if (!isOpen) return

    const fetchAllEvolutionsData = async () => {
      setLoading(true)
      
      setPokemon(initialPokemon)
      await delay(500)

      const evolutionNames = await getPokemonEvolutions(initialPokemon)

      const allEvolutionPromises = evolutionNames.map((name) => 
        getPokemonByName(name)
      )

      const allEvolutionData = await Promise.all(allEvolutionPromises)
      setEvolutions(allEvolutionData)
      
      setLoading(false)
    }

    fetchAllEvolutionsData()
  }, [isOpen, initialPokemon])

  const handleEvolutionClick = useCallback((evolution: Pokemon) => {
    setPokemon(evolution)
  }, [])

  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`#${formatNumber(pokemon.id)}`}>
      {loading && (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-900 border-t-transparent"></div>
          <p className="mt-4 text-gray-500">Cargando...</p>
        </div>
      )}

      {pokemon && !loading && (
        <>
          <div className="flex flex-col items-center justify-center mb-6">
            <img 
              src={imageUrl} 
              alt={pokemon.name} 
              className="w-48 h-48 object-contain mb-4" 
            />

            <h1 className="text-3xl font-bold capitalize mb-2">{pokemon.name}</h1>

            <div className="flex gap-2 justify-center flex-wrap mb-4">
              {pokemon.types.map((typeInfo) => (
                <TypeBadge key={typeInfo.slot} type={typeInfo.type.name} />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-xs mt-4">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500 mb-1">Altura</p>
                <p className="text-lg font-semibold">{(pokemon.height / 10).toFixed(1)} m</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500 mb-1">Peso</p>
                <p className="text-lg font-semibold">{(pokemon.weight / 10).toFixed(1)} kg</p>
              </div>
            </div>
          </div>

          {evolutions.length > 0 && (
            <div className="border-t border-gray-200 pt-6 mt-6 cursor-pointer">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Evoluciones</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {evolutions.map((evolution) => {
                  const evolutionImage = evolution.sprites.other['official-artwork'].front_default || evolution.sprites.front_default
                  
                  return (
                    <button
                      key={evolution.id}
                      onClick={() => handleEvolutionClick(evolution)}
                      className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                        pokemon.id === evolution.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <img
                        src={evolutionImage}
                        alt={evolution.name}
                        className="w-24 h-24 object-contain mb-2"
                      />

                      <p className="text-sm font-semibold capitalize">{evolution.name}</p>
                      <p className="text-xs text-gray-500">#{formatNumber(evolution.id)}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}
    </Modal>
  )
}

export default PokemonDetail