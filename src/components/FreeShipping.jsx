import Truck from "assets/Truck";

const FreeShipping = () => {
    return(
        <div className="flex justify-center gap-4">
            <Truck prop="fill-green-600 w-6" />
            <h3 className="text-green-600 font-semibold text-lg">Envio Gratis!</h3>
        </div>
    );
}

export default FreeShipping;