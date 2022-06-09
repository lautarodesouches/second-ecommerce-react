// Utils
import { capitalize, formatNumber } from "utils/functions";

const CartItem = ({ item, removeFromCart }) => {
    return (
        <article key={item.id} className="bg-white p-4 rounded flex flex-col sm:flex-row items-center relative gap-4 sm:gap-0">
            <div className="rounded-full bg-red-500 text-white px-2 absolute top-0 right-0 m-2 cursor-pointer" onClick={() => removeFromCart(item)}>x</div>
            <header className="sm:w-3/6 flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
                <div className="sm:w-1/2">
                    <img className="max-w-full max-h-32 m-auto" src={`https://lautarodesouches.github.io/ecommerce/img/${item.id}-1.png`} alt={item.name} />
                </div>
                <div className="sm:w-1/2">
                    <h3>
                        <span className="text-gray-500 mb-2">Nombre:</span>
                        <span className="text-2xl">{item.name}</span>
                    </h3>
                </div>
            </header>
            <div className="sm:w-1/6">
                <h4>
                    <span className="text-gray-500 mb-2">Color:</span>
                    <span className="text-2xl">{capitalize(item.color)}</span>
                </h4>
            </div>
            <div className="sm:w-1/6">
                <h4>
                    <span className="text-gray-500 mb-2">Cantidad:</span>
                    <span className="text-2xl">{item.qty}</span>
                </h4>
            </div>
            <footer className="sm:w-1/6">
                <h4>
                    <span className="text-gray-500 mb-2">Subtotal:</span>
                    <span className="text-2xl">{formatNumber(item.price * item.qty)}</span>
                </h4>
            </footer>
        </article>
    );
}

export default CartItem;