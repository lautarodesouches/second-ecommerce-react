// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { home } from "routes/Routes";
// Component
import ButtonPrimary from "./ButtonPrimary";

const HomeButton = () => {
    return (
        <div>
            <Link to={home} className="w-full" >
                <ButtonPrimary whith="w-full">
                    Volver al inicio
                </ButtonPrimary>
            </Link>
        </div>
    );
}

export default HomeButton;