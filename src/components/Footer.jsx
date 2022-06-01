// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { home } from "routes/Routes";

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <footer className="bg-sky-700 text-white flex justify-around py-1">
            <div>
                <Link to={home}>Contacto</Link>
            </div>
            <div>
                <Link to={home}>Privacidad</Link>
            </div>
            <div>
                ©{year}
            </div>
        </footer>
    );
}
export default Footer;