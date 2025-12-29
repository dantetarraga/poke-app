import { typeColorsMap } from "../utils"

const TypeBadge = ({ type }: { type: string }) => {
  const typeColor = typeColorsMap[type]

  return (
    <span 
      className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize shadow-sm transition-all duration-200 hover:shadow-md ${typeColor.bg} ${typeColor.text} ${typeColor.border}`}
    >
      {type}
    </span>
  )
}

export default TypeBadge