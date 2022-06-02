// Utils
import { formatNumber } from "utils/functions";
import ButtonGray from "./ButtonGray";
// Components
import CartItem from "./CartItem";
import HomeButton from "./HomeButton";

const OrdersResult = ({ cartList, cartTotal, setFormCompleted }) => {
    return (
        <div className="sm:w-11/12 m-auto fade text-center flex flex-col gap-6">
            <h2 className="text-3xl">Resultado</h2>
            {
                cartList.map((el) => {
                    return <CartItem key={`${el.id}-${el.color}`} item={el} />;
                })
            }
            <h5 className="text-xl">Total: {formatNumber(cartTotal)}</h5>
            <div className="w-1/3 m-auto flex gap-8 justify-around">
                <div className="w-1/2">
                    <ButtonGray onClick={() => setFormCompleted(false)}>Buscar otra orden</ButtonGray>
                </div>
                <div className="w-1/2">
                    <HomeButton />
                </div>
            </div>
        </div>
    );
}

export default OrdersResult;