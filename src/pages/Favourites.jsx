// React
import { useContext } from "react";
// Context
import { FavouriteContex } from "context/FavouriteContexProvider";
import ItemsContainer from "components/ItemsContainer";
import NotFound from "components/NotFound";

const Favourites = () => {

    const { favourited } = useContext(FavouriteContex);

    // If the price is different in the database, update

    return (
        <>
            {
                favourited.length > 0
                ?
                <ItemsContainer title='Favoritos' items={favourited} />
                :
                <NotFound message='No se encontraron favoritos' />
            }
        </>
    );
}

export default Favourites;