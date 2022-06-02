// Utils
import { capitalize, formatNumber } from "utils/functions";

const CartItem = ({item, removeFromCart}) => {
    return (
        <article key={item.id} className="bg-white p-4 rounded flex flex-col sm:flex-row items-center relative gap-4 sm:gap-0">
            <div className="rounded-full bg-red-500 text-white px-2 absolute top-0 right-0 m-2 cursor-pointer" onClick={() => removeFromCart(item)}>x</div>
            <div className="sm:w-3/12">
                <img className="max-w-full max-h-32 m-auto" src={`https://lautarodesouches.github.io/ecommerce/img/${item.id}-1.png`} alt={item.name} />
            </div>
            <div className="sm:w-3/12">
                <h4 className="text-gray-500 mb-2">Nombre:</h4>
                <h3 className="text-2xl">{item.name}</h3>
            </div>
            <div className="sm:w-2/12">
                <h4 className="text-gray-500 mb-2">Color:</h4>
                <h3 className="text-2xl">{capitalize(item.color)}</h3>
            </div>
            <div className="sm:w-2/12">
                <h4 className="text-gray-500 mb-2">Cantidad:</h4>
                <h3 className="text-2xl">{item.qty}</h3>
            </div>
            <div className="sm:w-2/12">
                <h4 className="text-gray-500 mb-2">Subtotal:</h4>
                <h3 className="text-2xl">{formatNumber(item.price * item.qty)}</h3>
            </div>
        </article>
    );
}

export default CartItem;