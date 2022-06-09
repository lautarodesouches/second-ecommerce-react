// React
import { useContext } from "react";
// Context
import { FavouriteContex } from "context/FavouriteContexProvider";
import { ErrorContext } from "context/ErrorContextProvider";
// Components
import ItemsContainer from "components/ItemsContainer";
import ButtonDanger from "components/ButtonDanger";

const Favourites = () => {

    const { favourited, clearFavourites } = useContext(FavouriteContex);
    
    const { setError, MyError } = useContext(ErrorContext);

    if(favourited.length < 1) setError(new MyError('Sin favoritos', true, 'No se encontraron favoritos', false));

    return (
        <>
            <div className="sm:w-1/5 m-auto mt-8">
                <ButtonDanger onClick={clearFavourites}>
                    Eliminar favoritos
                </ButtonDanger>
            </div>
            <ItemsContainer title='Favoritos' items={favourited} />
        </>
    );
}

export default Favourites;