// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { products } from "routes/Routes";
// Utils
import { formatNumber } from "utils/functions";

const ItemCard = ({id, name, price, freeShipping}) => {
    return(
        <Link to={products + id}>
            <article className="fade h-full bg-white rounded border p-4 transition-all shadow hover:shadow-2xl hover:border-cyan-700">
                <img className="max-w-full max-h-32 m-auto" src={`https://lautarodesouches.github.io/ecommerce/img/${id}-1.png`} alt={name} />
                <h3 className="pt-3 pb-1">{formatNumber(price)}</h3>
                <h3 className={`pb-1 ${freeShipping && "bg-lime-500 text-white rounded inline-block p-1 my-3"}`}>{freeShipping && "Envio gratis"}</h3>
                <h3 className="">{name}</h3>
            </article>
        </Link>
    );
}

export default ItemCard;