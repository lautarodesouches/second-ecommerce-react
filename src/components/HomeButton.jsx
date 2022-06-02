// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { home } from "routes/Routes";
// Component
import ButtonPrimary from "./ButtonPrimary";

const HomeButton = () => {
    return (
        <Link to={home} className="grow" >
            <ButtonPrimary>
                Volver al inicio
            </ButtonPrimary>
        </Link>
    );
}

export default HomeButton;