// React
import { useContext } from "react";
// Assets
import Heart from "assets/Heart";
import HeartFilled from "assets/HeartFilled";
import { FavouriteContex } from "context/FavouriteContexProvider";

const FavouriteIcon = ({ id }) => {

    const { isInFavourited, handleFavourite } = useContext(FavouriteContex);

    return (
        <div className="absolute w-10 h-10 top-0 right-0 rounded p-2" onClick={() => handleFavourite(id)}>
            {
                isInFavourited(id)
                    ?
                    <HeartFilled svgClass={'fill-red-400'} />
                    :
                    <Heart svgClass='fill-gray-500' />
            }
        </div>
    );
}

export default FavouriteIcon;