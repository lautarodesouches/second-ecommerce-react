// Component
import ButtonPrimary from "./ButtonPrimary";

const OrdersForm = ({processForm, orderId}) => {
    return (
        <form className="sm:w-1/3 p-4 m-auto bg-white rounded fade" onSubmit={(e) => { processForm(e) }}>
            <h2 className="text-center mb-8 text-lg">Acá podés buscar tu compra con el ID que recibiste en el checkout</h2>
            <div>
                <label htmlFor="id">ID de compra:</label>
                <input type="text" className="border border-gray-300 rounded mt-2 p-1 block w-full" id="id" defaultValue={orderId ? orderId : ''} />
            </div>
            <div className="mt-8">
                <ButtonPrimary>
                    Buscar compra
                </ButtonPrimary>
            </div>
        </form>
    );
}

export default OrdersForm;