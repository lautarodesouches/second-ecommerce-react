import ButtonPrimary from "./ButtonPrimary";

const CheckoutForm = ({ createOrder }) => {
    return (
        <form className="flex flex-col gap-4 bg-white rounded px-8 py-4 fade" onSubmit={(e) => { createOrder(e) }}>
            <div>
                <label htmlFor="name">Nombre</label>
                <input type="text" className="border border-gray-300 rounded mt-2 p-1 block w-full" id="name" aria-describedby="name" required />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" className="border border-gray-300 rounded mt-2 p-1 block w-full" id="email" aria-describedby="email" required />
            </div>
            <div>
                <label htmlFor="phone">Teléfono</label>
                <input type="tel" className="border border-gray-300 rounded mt-2 p-1 block w-full" id="phone" aria-describedby="phone" required />
            </div>
            <div className="w-2/3 m-auto mt-4">
                <ButtonPrimary>
                    Submit
                </ButtonPrimary>
            </div>
        </form>
    );
}

export default CheckoutForm;