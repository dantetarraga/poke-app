interface Props {
  count?: number
}

const Skeleton = ({ count = 1 }: Props) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 p-6 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}

const SkeletonCard = () => {
  return (
    <div className="relative border-2 border-gray-200 rounded-xl p-5 bg-white overflow-hidden animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="h-4 w-12 bg-gray-300 rounded"></div>
      </div>
      
      <div className="flex justify-center items-center mb-4 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg p-4 h-40">
        <div className="w-32 h-32 bg-gray-300 rounded-lg"></div>
      </div>
      
      <div className="flex justify-center mb-4">
        <div className="h-6 w-24 bg-gray-300 rounded"></div>
      </div>
      
      <div className="flex gap-2 justify-center flex-wrap">
        <div className="h-7 w-16 bg-gray-300 rounded-full"></div>
        <div className="h-7 w-16 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  )
}

export default Skeleton