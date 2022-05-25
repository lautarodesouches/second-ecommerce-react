// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { home } from "routes/Routes";
// Components
import ButtonPrimary from "./ButtonPrimary";

const NotFound = ({message}) => {
    return(
        <section className="container min-h-screen flex flex-col gap-6 items-center justify-center fade">
            <h2>{message}</h2>
            <ButtonPrimary>
                <Link to={home}>Volver al inicio</Link>
            </ButtonPrimary>
        </section>
    );
}

export default NotFound;