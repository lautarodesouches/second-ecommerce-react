// Components
import Error from "components/Error";
import Button from "components/Button";
import CartItem from "components/CartItem";
import ButtonGray from "components/ButtonGray";
import ButtonPrimary from "components/ButtonPrimary";
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
                <section className="sm:flex">
                    <Link to={home} className='grow'>
                        <ButtonGray>Seguir comprando</ButtonGray>
                    </Link>
                    <div className="grow"></div>
                    <Button onClick={clearCart} buttonClass={'border border-solid border-red-500 text-red-500 hover:bg-red-500 hover:text-white'}>
                        Eliminar Items
                    </Button>
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
            :
            <Error error={{ message: 'El carrito se encuentra vacio', home: true}} />
    );
}

export default Cart;