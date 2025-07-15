// import { Button } from "@/components/ui/button"
// import { ChevronDown } from "lucide-react"

// export function Header() {
//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
//       <div className="container mx-auto px-6 md:px-20 py-3 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
//             <div className="w-4 h-4 bg-white rounded-full"></div>
//           </div>
//           <span className="text-xl font-semibold">Cycle</span>
//         </div>

//         <nav className="hidden md:flex items-center gap-8">
//           <div className="flex items-center gap-1">
//             <span>Product</span>
//             <ChevronDown className="w-4 h-4" />
//           </div>
//           <span>Changelog</span>
//           <span>Manifesto</span>
//           <div className="flex items-center gap-1">
//             <span>Resources</span>
//             <ChevronDown className="w-4 h-4" />
//           </div>
//         </nav>

//         <div className="flex items-center gap-4">
//           <Button variant="ghost">Log in</Button>
//           <Button className="bg-black text-white hover:bg-gray-800">Get started</Button>
//         </div>
//       </div>
//     </header>
//   )
// }


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"

const productDropdownItems = [
  {
    title: "Explore",
    description: "Explore Cycle with an interactive demo",
    icon: "",
  },
  {
    title: "Slack app",
    description: "Manage feedback from Slack, weirdly fast",
    icon: "",
  },
  {
    title: "API",
    description: "Build custom workflows",
    icon: "",
  },
  {
    title: "Security",
    description: "Enterprise-level protection",
    icon: "",
  },
  {
    title: "Integrations",
    description: "Connect & unify product information across tools",
    icon: "",
  },
]

const resourcesDropdownItems = [
  {
    title: "Documentation",
    description: "Learn how to use Cycle effectively",
    icon: "",
  },
  {
    title: "Blog",
    description: "Latest updates and insights",
    icon: "",
  },
  {
    title: "Community",
    description: "Join our community of users",
    icon: "",
  },
  {
    title: "Support",
    description: "Get help when you need it",
    icon: "",
  },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-6 md:px-20 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-semibold">Cycle</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Product Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("product")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="flex items-center gap-1 cursor-pointer py-2">
              <span>Product</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            {activeDropdown === "product" && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                {productDropdownItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg mt-0.5">{item.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-600 mt-0.5">{item.description}</div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="#" className="hover:text-gray-600 transition-colors">
            Changelog
          </a>
          <a href="#" className="hover:text-gray-600 transition-colors">
            Manifesto
          </a>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("resources")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="flex items-center gap-1 cursor-pointer py-2">
              <span>Resources</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            {activeDropdown === "resources" && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                {resourcesDropdownItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg mt-0.5">{item.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-600 mt-0.5">{item.description}</div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="hover:bg-gray-100">
            Log in
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800">Get started</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-6 py-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-1 py-2">
                <span>Product</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <a href="#" className="block py-2 text-gray-600">
                Changelog
              </a>
              <a href="#" className="block py-2 text-gray-600">
                Manifesto
              </a>
              <div className="flex items-center gap-1 py-2">
                <span>Resources</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-3">
              <Button variant="ghost" className="w-full justify-start">
                Log in
              </Button>
              <Button className="w-full bg-black text-white hover:bg-gray-800">Get started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
