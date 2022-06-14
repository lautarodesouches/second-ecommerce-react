// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { home } from "routes/Routes";
// Component
import ButtonPrimary from "./ButtonPrimary";

const HomeButton = ({onClick}) => {
    return (
        <Link to={home} className="grow" onClick={onClick}>
            <ButtonPrimary>
                Ir al inicio
            </ButtonPrimary>
        </Link>
    );
}

export default HomeButton;