// Components
import Error from "components/Error";

const PageNotFound = () => {

    return (
        <Error error={{ message: 'No se ha encontrado la página', number: 404 }} />
    );
}

export default PageNotFound;