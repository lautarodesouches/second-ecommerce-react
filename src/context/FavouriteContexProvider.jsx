// React
import { createContext, useState } from "react";
// Context
export const FavouriteContex = createContext();

const FavouriteContexProvider = ({children}) => {

    const [favourited, setFavourited] = useState(JSON.parse(localStorage.getItem('favourited')) || []);

    const updateFavourited = (data) => {
        setFavourited(data)
        localStorage.setItem('favourited', JSON.stringify(data));
    }

    const addFavourite = (item) => {
        updateFavourited([...favourited, item]);
    }
    
    const removeFavourite = (item) => {
        updateFavourited(favourited.filter( el => el.id !== item.id));
    }

    const isInFavourited = (item) => {
        return favourited.find( el => el.id === item.id) !== undefined;
    }

    const handleFavourite = (item) => {
        isInFavourited(item) ? removeFavourite(item) : addFavourite(item);
    }

    return(
        <FavouriteContex.Provider value={{favourited, addFavourite, removeFavourite, isInFavourited, handleFavourite}}>
            {children}
        </FavouriteContex.Provider>
    );
}

export default FavouriteContexProvider;