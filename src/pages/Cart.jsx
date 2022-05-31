// Components
import NotFound from "components/NotFound";
// Context
import { CartContext } from "context/CartContextProvider";
// React
import { useContext } from "react";

const Cart = () => {

    const { cartList, addToCart, removeFromCart, clearCart, countItems, cartTotal } = useContext(CartContext);

    return (
        cartList.length > 0
        ?
        <section></section>
        :
        <NotFound message='No se han encontrado productos en el carrito' />
    );
}

export default Cart;