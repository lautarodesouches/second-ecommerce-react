// Components
import Button from "components/Button";
import ButtonGray from "components/ButtonGray";
import ButtonPrimary from "components/ButtonPrimary";
import CartItem from "components/CartItem";
import NotFound from "components/NotFound";
// Context
import { CartContext } from "context/CartContextProvider";
// React
import { useContext } from "react";
// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { checkout, home } from "routes/Routes";
// Utils
import { formatNumber } from "utils/functions";

const Cart = () => {

    const { cartList, removeFromCart, clearCart, cartTotal } = useContext(CartContext);

    return (
        cartList.length > 0
            ?
            <div className="sm:w-11/12 m-auto mt-4 text-center fade">
                <section className="flex flex-col sm:flex-row justify-around">
                    <Link to={home} className='w-5/6 m-auto sm:w-1/5'>
                        <ButtonGray>Seguir comprando</ButtonGray>
                    </Link>
                    <Button onClick={clearCart} buttonClass={'w-5/6 m-auto sm:w-1/5 border border-solid border-red-500 text-red-500 hover:bg-red-500 hover:text-white'}>
                        Eliminar Items
                    </Button>
                </section>
                <section className="flex flex-col gap-4 mt-8">
                    {
                        cartList.map(el => <CartItem item={el} removeFromCart={removeFromCart} />)
                    }
                </section>
                <section className="sm:w-1/2 mt-10 m-auto">
                    <h2 className="text-3xl mb-6">Total: {formatNumber(cartTotal())}</h2>
                    <Link to={checkout} className='inline-block w-1/3'>
                        <ButtonPrimary whith='w-full'>
                            Checkout
                        </ButtonPrimary>
                    </Link>
                </section>
            </div>
            :
            <NotFound message='El carrito se encuentra vacio' />
    );
}

export default Cart;