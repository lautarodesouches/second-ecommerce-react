// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { orders } from "routes/Routes";
// Utils
import { capitalize } from "utils/functions";
// Component
import ButtonGray from "./ButtonGray";
import HomeButton from "./HomeButton";

const Thankyou = ({buyerName, orderId}) => {
    return (
        <div className="fade text-center">
            <h2 className="text-4xl">Gracias por tu compra {capitalize(buyerName)}</h2>
            <h5 className="text-xl mt-4"> Tu ID de compra es:</h5>
            <h5 className="text-xl font-bold">{orderId}</h5>
            <Link to={orders} className='my-8 block'>
                <ButtonGray>
                    Podes usar este ID para seguir el estado de tu compra acá
                </ButtonGray>
            </Link>
            <HomeButton />
        </div>
    )
}

export default Thankyou;