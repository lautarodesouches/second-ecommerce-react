import { Link } from "react-router-dom";
import { categories, favourites, home, offers, products } from "routes/Routes";
import CartIcon from "./CartIcon";

const NavBar = () => {
    return(
        <nav className="bg-sky-700 text-white p-2">
            <div className="grid grid-cols-3 items-center text-center">
                <div>
                    <Link to={home}>Titulo</Link>
                </div>
                <div>
                    <input type="text" className="bg-white rounded w-full py-1 px-2 text-black" placeholder="Buscar" />
                </div>
                <div className="m-auto">
                    <CartIcon fill="white" prop="w-5" />
                </div>
            </div>
            <ul className="flex flex-col md:gap-6 items-center md:flex-row justify-center mt-4 m-auto">
                <li>
                    <Link to={home}>Inicio</Link>
                </li>
                <li>
                    <Link to={categories}>Categorias</Link>
                </li>
                <li>
                    <Link to={offers}>Ofertas</Link>
                </li>
                <li>
                    <Link to={favourites}>Favoritos</Link>
                </li>
                <li>
                    <Link to={products}>Productos</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;