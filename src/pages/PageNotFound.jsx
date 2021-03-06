// Component
import Error from "components/Error";
// React
import { useState } from "react";

const PageNotFound = () => {

    const [error, setError] = useState('');

    setError({ message: 'Página no encontrada' });

    return <Error error={error} />;

}

export default PageNotFound;