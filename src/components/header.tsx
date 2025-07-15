import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-6 md:px-20 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-semibold">Cycle</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-1">
            <span>Product</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <span>Changelog</span>
          <span>Manifesto</span>
          <div className="flex items-center gap-1">
            <span>Resources</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost">Log in</Button>
          <Button className="bg-black text-white hover:bg-gray-800">Get started</Button>
        </div>
      </div>
    </header>
  )
}
