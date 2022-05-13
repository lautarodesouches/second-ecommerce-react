import { Link } from "react-router-dom";
import { products } from "routes/Routes";
import { formatNumber } from "utils/functions";

const ItemCard = ({id, name, price, freeShipping}) => {
    return(
        <article className="fade bg-white rounded border p-4 transition-all shadow hover:shadow-2xl hover:border-cyan-700 cursor-pointer">
            <Link to={products + '/' + id}>
                <img className="max-w-full max-h-32 m-auto" src={`https://lautarodesouches.github.io/ecommerce/img/${id}-1.png`} alt={name} />
                <h3 className="pt-3 pb-1">{formatNumber(price)}</h3>
                <h3 className="pb-1">{freeShipping ? "Envio gratis" : null}</h3>
                <h3 className="">{name}</h3>
            </Link>
        </article>
    );
}

export default ItemCard;