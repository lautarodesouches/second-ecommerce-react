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

    const addFavourite = (id) => {
        updateFavourited([...favourited, id]);
    }
    
    const removeFavourite = (id) => {
        updateFavourited(favourited.filter( el => el !== id));
    }

    const isInFavourited = (id) => {
        return favourited.find( el => el === id) !== undefined;
    }

    const handleFavourite = (id) => {
        isInFavourited(id) ? removeFavourite(id) : addFavourite(id);
    }

    return(
        <FavouriteContex.Provider value={{favourited, addFavourite, removeFavourite, isInFavourited, handleFavourite}}>
            {children}
        </FavouriteContex.Provider>
    );
}

export default FavouriteContexProvider;