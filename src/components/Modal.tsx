import { createPortal } from "react-dom"

interface Props {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  title?: string
}

const Modal = ({ children, isOpen, onClose, title }: Props) => {
  if (!isOpen) return null

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          {title && (
            <h2 className="text-xl font-semibold text-gray-500 capitalize tracking-wider">{title}</h2>
          )}
          
          <button
            onClick={onClose}
            className={`ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group`}
          >
            <svg
              className="w-5 h-5 text-gray-500 group-hover:text-gray-900 transition-colors"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal