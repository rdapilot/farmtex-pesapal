import { Sprout } from 'lucide-react';

export function Header() {
  return (
    <header className="px-4 py-6 sm:px-6 lg:px-8 border-b border-green-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sprout className="h-8 w-8 text-green-500" />
          <div className="text-2xl font-bold">
            <span className="text-white">farm</span>
            <span className="text-green-500">tex</span>
            <span className="text-white">hub</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <div className="bg-green-500/10 text-green-500 px-4 py-2 rounded-full text-sm">
              <span className="animate-pulse">●</span> 47 farmers online now
            </div>
          </div>
          <a 
            href="#join" 
            className="bg-green-500 text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-green-400 transition-colors"
          >
            Join Now (23 spots left)
          </a>
        </div>
      </div>
    </header>
  );
}