// Components
import ButtonContainer from "./ButtonContainer";
import ButtonGray from "./ButtonGray";
import HomeButton from "./HomeButton";

const Error = ({ error = { message: 'Ha ocurrido un error' } }) => {

    console.log(error ,'%c Error ', 'background: red; color: white; padding: 5px; margin: 5px; border-radius: 10px');

    return (
        <section className={`fade text-center mt-10`}>
            <h2 className="text-3xl">{error.message}</h2>
            <ButtonContainer>
                {error.reload && <ButtonGray onClick={() => window.location.replace('')} >Recargar página</ButtonGray>}
                {error.home && <HomeButton />}
            </ButtonContainer>
        </section>
    );
}

export default Error;