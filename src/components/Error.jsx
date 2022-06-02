import HomeButton from "./HomeButton";

const Error = ({ message }) => {
    return (
        <div className="fade text-center">
            <h2 className="text-3xl">Ha ocurrido un error</h2>
            <h2 className="mt-4">Por favor intente de nuevo mas tarde</h2>
            <h5 className="mt-4">Si el problema persiste, por favor contáctese con el administrador.</h5>
            <p className="mt-8">{message}</p>
            <HomeButton />
        </div>
    );
}

export default Error;