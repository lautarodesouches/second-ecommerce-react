// React
import { useContext, useState} from "react";
// Context
import { FavouriteContex } from "context/FavouriteContexProvider";
// Components
import ItemsContainer from "components/ItemsContainer";
import ButtonDanger from "components/ButtonDanger";
import Error from "components/Error";

const Favourites = () => {

    const { favourited, clearFavourites } = useContext(FavouriteContex);

    const [error, setError] = useState('');

    if (favourited.length < 1 && !error) setError({ message: 'No se encontraron favoritos', reload: true });

    return (
        <>
            {
                error
                    ?
                    <Error error={error} />
                    :
                    <>
                        <div className="sm:w-1/5 m-auto mt-8">
                            <ButtonDanger onClick={clearFavourites}>
                                Eliminar favoritos
                            </ButtonDanger>
                        </div>
                        <ItemsContainer title='Favoritos' items={favourited} />
                    </>
            }
        </>
    );
}

export default Favourites;