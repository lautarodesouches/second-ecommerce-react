// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { home, orders } from "routes/Routes";

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <footer className="bg-sky-700 text-white flex py-1 flex-wrap flex-col gap-2 text-center sm:flex-row sm:justify-around">
            <div>
                <Link to={home}>Contacto</Link>
            </div>
            <div>
                <Link to={home}>Privacidad</Link>
            </div>
            <div>
                <Link to={orders}>Buscar Orden</Link>
            </div>
            <div>
                ©{year}
            </div>
        </footer>
    );
}
export default Footer;