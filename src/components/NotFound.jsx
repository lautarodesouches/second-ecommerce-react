import { Link } from "react-router-dom";
import { home } from "routes/Routes";
import Button from "./Button";

const NotFound = ({message}) => {
    return(
        <section className="min-h-screen flex flex-col gap-6 items-center justify-center fade">
            <h2>{message}</h2>
            <Button>
                <Link to={home}>Volver al inicio</Link>
            </Button>
        </section>
    );
}

export default NotFound;