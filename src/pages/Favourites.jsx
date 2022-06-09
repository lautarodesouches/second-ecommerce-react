// React
import { useContext } from "react";
// Context
import { FavouriteContex } from "context/FavouriteContexProvider";
import { ErrorContext } from "context/ErrorContextProvider";
// Components
import ItemsContainer from "components/ItemsContainer";

const Favourites = () => {

    const { favourited } = useContext(FavouriteContex);
    
    const { setError, MyError } = useContext(ErrorContext);

    if(favourited.length < 1) setError(new MyError('Sin favoritos', true, 'No se encontraron favoritos', false));

    return (
        <ItemsContainer title='Favoritos' items={favourited} />
    );
}

export default Favourites;