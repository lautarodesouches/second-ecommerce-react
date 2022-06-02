// React
import { useContext } from "react";
// Context
import { FavouriteContex } from "context/FavouriteContexProvider";
// Components
import ItemsContainer from "components/ItemsContainer";
import Error from "components/Error";

const Favourites = () => {

    const { favourited } = useContext(FavouriteContex);

    return (
        <>
            {
                favourited.length > 0
                    ?
                    <ItemsContainer title='Favoritos' items={favourited} />
                    :
                    <Error error={{ message: 'No se encontraron favoritos', home: true}} />
            }
        </>
    );
}

export default Favourites;