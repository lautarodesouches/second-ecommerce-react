// React
import { createContext, useState } from "react";
// Context
export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

    const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('cartList')) || []);

    const updateAndSaveCart = (data) => {
        setCartList(data);
        localStorage.setItem('cartList', JSON.stringify(data));
    }

    const addToCart = (item) => {
        let findItem = cartList.find((el) => el.id === item.id && el.color === item.color);

        if (findItem === undefined) {
            updateAndSaveCart([...cartList, item]);
        } else {
            findItem.qty += item.qty;
            updateAndSaveCart([...cartList])
        }
    }

    const removeFromCart = (item) => {
        updateAndSaveCart(cartList.filter(el => el.id !== item.id));
    }

    const clearCart = () => {
        updateAndSaveCart([]);
    }

    const countItems = () => {
        return cartList.length;
    }

    const cartTotal = () => {
        return cartList.reduce((acc, item) => acc + (item.price * item.qty), 0);
    }

    return (
        <CartContext.Provider value={{ cartList, addToCart, removeFromCart, clearCart, countItems, cartTotal }} >
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;