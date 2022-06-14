// React Router DOM
import { useNavigate } from "react-router-dom";
// Components
import ButtonContainer from "./ButtonContainer";
import ButtonSecondary from "./ButtonSecondary";
import HomeButton from "./HomeButton";

const Error = ({ error }) => {

    const navigate = useNavigate();

    const message = error.message || 'Ha ocurrido un error';
    // Default
    let goBack = true;
    let home = true;
    // Custom
    if (error.goBack !== undefined) goBack = error.goBack;
    if (error.home !== undefined) home = error.home;

    return (
        <section className='fade text-center mt-32 p-4 select-none focus:outline-none'>
            <h2 className="text-3xl">{message}</h2>
            {
                message === 'Ha ocurrido un error' && <h3 className="text-xl mt-4">Si el problema persiste, por favor contáctese con el administrador</h3>
            }
            <ButtonContainer>
                {goBack && <ButtonSecondary onClick={() => navigate(-1)}>Retroceder</ButtonSecondary>}
                {home && <HomeButton />}
            </ButtonContainer>
        </section>
    );
}

export default Error;