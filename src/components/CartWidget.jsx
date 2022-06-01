// Assets
import CartIcon from "assets/CartIcon";
// Context
import { CartContext } from "context/CartContextProvider";
// React
import { useContext } from "react";
// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { cart } from "routes/Routes";

const CartWidget = () => {

    const { countItems } = useContext(CartContext);

    return (
        <Link to={cart} className="flex items-center justify-center relative" >
            <CartIcon svgClass="w-5 m-2 fill-white" />
            {
                countItems() > 0 && <span className="rounded-full bg-red-500 px-2 absolute mb-7 ml-7">{countItems()}</span>
            }
        </Link>
    );
}

export default CartWidget;