// Utils
import { formatNumber } from "utils/functions";
// Components
import CartItem from "./CartItem";
import HomeButton from "./HomeButton";
import ButtonGray from "./ButtonGray";
import ButtonContainer from "./ButtonContainer";

const OrdersResult = ({ cartList, cartTotal, setFormCompleted }) => {
    return (
        <div className="sm:w-11/12 m-auto fade text-center flex flex-col gap-6">
            <h2 className="text-3xl">Resultado</h2>
            {
                cartList.map(el => <CartItem key={`${el.id}-${el.color}`} item={el} />)
            }
            <h5 className="text-xl">Total: {formatNumber(cartTotal)}</h5>
            <ButtonContainer>
                <ButtonGray onClick={() => setFormCompleted(false)}>Buscar otra orden</ButtonGray>
                <HomeButton />
            </ButtonContainer>
        </div>
    );
}

export default OrdersResult;