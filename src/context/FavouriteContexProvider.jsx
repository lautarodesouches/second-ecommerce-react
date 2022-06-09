// React
import { createContext, useState } from "react";
// Context
export const FavouriteContex = createContext();

const FavouriteContexProvider = ({ children }) => {

    const [favourited, setFavourited] = useState(JSON.parse(localStorage.getItem('favourited')) || []);

    const updateAndSaveFavourited = data => {
        setFavourited(data);
        localStorage.setItem('favourited', JSON.stringify(data));
    }

    const addFavourite = item => updateAndSaveFavourited([...favourited, item]);

    const removeFavourite = item => updateAndSaveFavourited(favourited.filter(el => el.id !== item.id));

    const clearFavourites = () => setFavourited([]);

    const isInFavourited = item => favourited.find(el => el.id === item.id) !== undefined;

    const handleFavourite = item => isInFavourited(item) ? removeFavourite(item) : addFavourite(item);

    return (
        <FavouriteContex.Provider value={{ favourited, addFavourite, removeFavourite, clearFavourites, isInFavourited, handleFavourite }}>
            {children}
        </FavouriteContex.Provider>
    );
}

export default FavouriteContexProvider;