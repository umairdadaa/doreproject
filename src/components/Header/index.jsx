import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const [hoveredMenu, setHoveredMenu] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    const navigate = useNavigate();

    const menus = [
        {
            title: "The Mansion",
            submenus: [{name:"Artist", link:"/"}, {name:"Family and Heritage"}, {name:"Innovative Craftsmanship"}, {name:" Timeline", link:"timeline"}],
        },
        {
            title: "Annual Lady Bug",
            link:"/annual-lady-bug"
        },
        {
            title: "Collection"
        },
        {
            title: "Fragrance"
        },
        {
            title: "Contact",
            link: "/contact-us"
        },
        {
            title: "More",
            submenus: [{name:"item 1"}, {name:"item 2"}]
        }
    ];

    const handleMouseEnter = (index) => {
        setHoveredMenu(index);
    };

    const handleMouseLeave = () => {
        setHoveredMenu(null);

    };
    return (
        <div className="relative min-h-screen bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 flex flex-col items-center justify-start p-10">
            <div className="flex justify-between items-center w-full pb-10">
                <button className="bg-white text-purple-600 px-4 py-2 rounded-full shadow-md font-bold">
                    FR
                </button>
                <div className=" text-white text-center">
                    <h1 className="text-4xl font-bold">HOUSE OF</h1>
                    <h2 className="text-2xl">DREAMERS</h2>
                    <p className="text-sm mt-1">PARIS</p>
                </div>
                <button className="text-white text-4xl font-bold hover:border-2 border-white flex justify-center items-baseline rounded-[50%] w-[50px] h-[50px]">×</button>
            </div>
            <div className="text-center relative space-y-6">
                {menus.map((menu, index) => {
                    // Render only the hovered menu or all menus when no menu is hovered
                    // if (hoveredMenu !== null && hoveredMenu !== index) {
                    //     return null; // Skip rendering other menus when one is hovered
                    // }

                    return (
                        <div
                            key={index}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => { menu.link && navigate(menu.link); }}
                            className={`text-6xl hover:text-7xl font-serif text-white ${menu.link ? "cursor-pointer" : ""}`}
                        >
                            {menu.title}

                            {hoveredMenu === index && (
                                <div className="mt-4 space-y-2 text-4xl">
                                    {menu?.submenus?.map((submenu, subIndex) => (
                                        <p key={subIndex} onClick={() => { submenu.link && navigate(submenu.link); }} className={`${submenu.link ? "cursor-pointer" : ""} hover:underline cursor-pointer`}>
                                            {submenu.name}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

            </div>


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



            <div className="absolute bottom-8 right-8">
                <button className="bg-purple-600 text-white px-6 py-3 rounded-[20px] shadow-lg text-lg font-semibold hover:bg-purple-700 transition">
                    Billets
                </button>
            </div>
        </div>
    )
}

export default Header
