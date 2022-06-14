// Components
import Error from "components/Error";
import CartItem from "components/CartItem";
import ButtonGray from "components/ButtonGray";
import ButtonDanger from "components/ButtonDanger";
import ButtonPrimary from "components/ButtonPrimary";
// Context
import { CartContext } from "context/CartContextProvider";
// React
import { useContext, useState, useEffect } from "react";
// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { checkout, home } from "routes/Routes";
// Utils
import { formatNumber } from "utils/functions";

const Cart = () => {

    const { cartList, removeFromCart, clearCart, cartTotal } = useContext(CartContext);

    const [error, setError] = useState(false);

    useEffect(() => {
        if (cartList.length < 1) setError({ message: 'El carrito se encuentra vacio' });
    }, [cartList.length])

    return (
        <>
            {
                error
                    ?
                    <Error error={error} setError={setError} />
                    :
                    <div className="sm:w-11/12 m-auto mt-4 text-center fade">
                        <section className="sm:flex">
                            <Link to={home} className='grow'>
                                <ButtonGray>Seguir comprando</ButtonGray>
                            </Link>
                            <div className="grow"></div>
                            <ButtonDanger onClick={clearCart}>
                                Eliminar Items
                            </ButtonDanger>
                        </section>
                        <section className="flex flex-col gap-4 mt-8">
                            {
                                cartList.map(el => <CartItem key={el.id} item={el} removeFromCart={removeFromCart} />)
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
            }
        </>
    );
}

export default Cart;