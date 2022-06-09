// Context
import { ErrorContext } from "context/ErrorContextProvider";
// React
import { useContext } from "react";

const PageNotFound = () => {

    const {setError, MyError} = useContext(ErrorContext);

    setError(new MyError('Page not found', true, 'Página no encontrada'));

}

export default PageNotFound;