import React from 'react';
import { Star, MessageCircle } from 'lucide-react';

interface FloatingChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
        isOpen 
          ? 'bg-zinc-800 border-2 border-green-500' 
          : 'bg-green-500 hover:bg-green-400'
      }`}
      title="Chat with Farmtex AI Assistant"
    >
      <div className="flex items-center justify-center h-full">
        {isOpen ? (
          <MessageCircle className="h-6 w-6 text-green-500" />
        ) : (
          <>
            <Star className="h-6 w-6 text-black" />
            {/* Subtle pulse animation when closed */}
            <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
          </>
        )}
      </div>
      
      {/* Tooltip */}
      <div className={`absolute bottom-full right-0 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap ${
        !isOpen ? 'group-hover:opacity-100' : ''
      }`}>
        Ask AI Assistant
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
      </div>
    </button>
  );
};

export default FloatingChatButton;
