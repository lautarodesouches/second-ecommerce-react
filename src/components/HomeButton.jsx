// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { home } from "routes/Routes";
// Component
import ButtonPrimary from "./ButtonPrimary";

const HomeButton = () => {
    return (
        <div>
            <Link to={home} >
                <ButtonPrimary>
                    Volver a inicio
                </ButtonPrimary>
            </Link>
        </div>
    );
}

export default HomeButton;