// React
import { useState } from "react";
// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { cart, categories, favourites, home, offers, search } from "routes/Routes";
// Components
import CartIcon from "./CartIcon";
import ChevronDown from "./ChevronDown";
import ChevronUp from "./ChevronUp";

const NavBar = () => {

    const [showMenu, setShowMenu] = useState(true);

    const chevronProp = "w-5 md:hidden m-auto pb-2 pt-4 fill-white";

    const toggleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    return(
        <nav className="bg-sky-700 text-white p-2">
            <div className="grid grid-cols-3 items-end text-center">
                <div>
                    <Link to={home} className="text-lg">Titulo</Link>
                </div>
                <form onSubmit={() => {}}>
                    <input type="text" className="bg-white rounded w-full py-1 px-2 text-black" placeholder="Buscar" />
                </form>
                <div className="m-auto">
                    <Link to={cart} >
                        <CartIcon prop="w-5 fill-white" />
                    </Link>
                </div>
            </div>
            <div>
                <div onClick={toggleShowMenu}>
                    {
                        showMenu
                        ?
                        <ChevronDown prop={chevronProp} />
                        :
                        <ChevronUp prop={chevronProp} />
                    }
                </div>
                <div className={`${showMenu ? "hidden" : "flex"} md:block md:mt-4`}>
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