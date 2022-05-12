import { Link } from "react-router-dom";
import { home } from "routes/Routes";
import { bgPrimary } from "theme/Colors";

const Footer = () => {

    const date = new Date;

    return(
        <footer className={`${bgPrimary} text-white flex justify-around py-1`}>
            <div>
                <Link to={home}>Contacto</Link>
            </div>
            <div>
                <Link to={home}>Privacidad</Link>
            </div>
            <div>
                ©{date.getFullYear()}
            </div>
        </footer>
    );
}
export default Footer;