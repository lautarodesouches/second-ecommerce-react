// React
import { useState } from "react";
// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { categories, favourites, home, offers, search } from "routes/Routes";
// Components
import SearchForm from "./SearchForm";
import CartWidget from "./CartWidget";
// Assets
import ChevronDown from "assets/ChevronDown";

const NavBar = () => {

    const [showMenu, setShowMenu] = useState(true);

    const toggleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <nav className="bg-sky-700 text-white p-2">
            <div className="flex flex-wrap items-center text-center">
                <div className="w-1/4 md:w-1/3 h-full flex justify-center">
                    <Link to={home}>
                        <h1 className="text-lg">Titulo</h1>
                    </Link>
                </div>
                <div className="w-2/4 md:w-1/3">
                    <SearchForm />
                </div>
                <div className="w-1/4 md:w-1/3 m-auto">
                    <CartWidget />
                </div>
            </div>
            <div className="w-full">
                <div onClick={toggleShowMenu}>
                    <ChevronDown svgClass={`w-5 md:hidden m-auto pb-2 pt-4 fill-white transition-all transform ${showMenu ? 'rotate-0' : 'rotate-180'}`} />
                </div>
                <div className={`${showMenu ? "hidden" : "flex"} md:block md:mt-4 fade`}>
                    <ul className="flex flex-col md:gap-6 items-center md:flex-row justify-center m-auto">
                        <li>
                            <Link to={home} onClick={toggleShowMenu}>Inicio</Link>
                        </li>
                        <li>
                            <Link to={categories} onClick={toggleShowMenu}>Categorias</Link>
                        </li>
                        <li>
                            <Link to={offers} onClick={toggleShowMenu}>Ofertas</Link>
                        </li>
                        <li>
                            <Link to={favourites} onClick={toggleShowMenu}>Favoritos</Link>
                        </li>
                        <li>
                            <Link to={search} onClick={toggleShowMenu}>Productos</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;