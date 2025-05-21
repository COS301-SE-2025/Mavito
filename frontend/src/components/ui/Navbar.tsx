import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [active, setActive] = useState("Dashboard");

    const navItems = ["Dashboard","Seach","Saved Terms", "Analytics"];

    return (
        <nav className="w-full fixed top-0 left-0 bg-[#1D202A] text-white px-6 py-3 shadow-md z-50">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                {/*Logo and Tile*/}
                <div className="flex items-center space-x-3">
                    <img
                        src="/DFSI_Logo.png"
                        alt="Mavito Logo"
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="text-xl font-semibold">Mavito</span>
                </div>

                {/* Nav Links */}
                <div className="felx space-x-8 text-sm">
                    {navItems.map((item) => (
                        <NavLink
                            key={item}
                            to={`/${item.toLowerCase().replace(/\s/g, "-")}`}
                            className={`relative pb-1 ${active === item ? "font-medium" : "text-gray-300"}`}
                            onClick={() => setActive(item)}
                        >
                            {item}
                            {active == item && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 rounded"></span>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* Avatar Circle */}
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
        </nav>
    );
};

export default Navbar;
