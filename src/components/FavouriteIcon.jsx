// React
import { useContext } from "react";
// Assets
import Heart from "assets/Heart";
import HeartFilled from "assets/HeartFilled";
import { FavouriteContex } from "context/FavouriteContexProvider";

const FavouriteIcon = ({ item }) => {

    const { isInFavourited, handleFavourite } = useContext(FavouriteContex);

    return (
        <div className="absolute w-10 h-10 top-0 right-0 rounded p-2 cursor-pointer hover:bg-slate-200 transition duration-500" onClick={() => handleFavourite(item)}>
            {
                isInFavourited(item)
                    ?
                    <HeartFilled svgClass={'fill-red-400 fade'} />
                    :
                    <Heart svgClass='fill-gray-500 fade' />
            }
        </div>
    );
}

export default FavouriteIcon;