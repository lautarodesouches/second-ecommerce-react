// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { products } from "routes/Routes";
// Utils
import { formatNumber } from "utils/functions";
// Components
import FavouriteIcon from "./FavouriteIcon";

const ItemCard = ({ item }) => {

    const { id, name, price, freeShipping, discount } = item;

    return (
        <article className="fade bg-white rounded border px-4 py-8 transition-all shadow hover:shadow-2xl relative">
            <FavouriteIcon item={item} />
            {/* ------------------------------ */}
            <Link to={products + id}>
                <img className="max-w-full max-h-32 m-auto" src={`https://lautarodesouches.github.io/ecommerce/img/${id}-1.png`} alt={name} loading="lazy" />
                <h3 className={`pt-3 pb-1 ${discount ? "text-slate-500 text-sm line-through" : "text-xl"}`}>{formatNumber(price)}</h3>
                {
                    // If has discount show new price
                    discount !== 0 &&
                    <h3 className={`pb-1 text-xl`}>
                        {formatNumber(Math.round(price - price * discount / 100))}
                        <span className="text-sm text-green-600 font-semibold"> {discount}%</span>
                    </h3>
                }
                <h3>{name}</h3>
                {
                    freeShipping && <h3 className='pb-1 text-green-600 font-semibold rounded inline-block px-2 py-1 my-3'>Envio gratis</h3>
                }
            </Link>
        </article>
    );
}

export default ItemCard;