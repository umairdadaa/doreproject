"use client"
import { useState } from "react";
import ArtistPage from "./Pages/Artist"
const App = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const menus = [
    {
      title: "The Mansion",
      submenus: ["Item 1", "Item 2", "Item 3"],
    },
    {
      title: "Annual Lady Bug",
      submenus: ["Item 1", "Item 2", "Item 3"],
    },
    {
      title: "Collection",
      submenus: ["Item 1", "Item 2", "Item 3"],
    },
    {
      title: "Fragrance",
      submenus: ["Item 1", "Item 2", "Item 3"],
    },
  ];
  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 flex flex-col items-center justify-center">
        {/* Logo Section */}
        <div className="absolute top-8 text-white text-center">
          <h1 className="text-4xl font-bold">HOUSE OF</h1>
          <h2 className="text-2xl">DREAMERS</h2>
          <p className="text-sm mt-1">PARIS</p>
        </div>

        {/* Menu Items */}
        <div className="text-center space-y-6">
          {menus.map((menu, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredMenu(index)} // Set hovered menu
              onMouseLeave={() => setHoveredMenu(null)} // Reset hovered menu
              className={`text-6xl hover:text-7xl font-serif text-white transition-opacity duration-300 ${hoveredMenu !== null && hoveredMenu !== index
                ? "opacity-0"
                : "opacity-100"
                }`}
            >
              {menu.title}

              {/* Submenus */}
              {hoveredMenu === index && (
                <div className="mt-4 space-y-2 text-4xl">
                  {menu.submenus.map((submenu, subIndex) => (
                    <p
                      key={subIndex}
                      className="hover:underline cursor-pointer"
                    >
                      {submenu}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="absolute bottom-8 w-full flex flex-col items-center text-white text-sm">
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">
              Cookie Policy
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
          <p className="mt-2">© Postology srl. All Rights Reserved. 2022</p>
        </div>

        {/* Toggle Button */}
        <div className="absolute top-8 left-8">
          <button className="bg-white text-purple-600 px-4 py-2 rounded-full shadow-md font-bold">
            FR
          </button>
        </div>

        {/* Close Button */}
        <div className="absolute top-8 right-8">
          <button className="text-white text-4xl font-bold">×</button>
        </div>

        {/* Billets Button */}
        <div className="absolute bottom-8 right-8">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-[20px] shadow-lg text-lg font-semibold hover:bg-purple-700 transition">
            Billets
          </button>
        </div>
      </div>
      <ArtistPage />
    </>
  )
}

export default App