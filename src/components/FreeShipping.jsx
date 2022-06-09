import Truck from "assets/Truck";

const FreeShipping = () => {
    return (
        <div className="flex justify-center gap-4">
            <Truck svgClass="fill-green-600 w-6" />
            <h4 className="text-green-600 font-semibold text-lg">Envio Gratis!</h4>
        </div>
    );
}

export default FreeShipping;