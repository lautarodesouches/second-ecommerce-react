// Components
import ButtonContainer from "./ButtonContainer";
import ButtonGray from "./ButtonGray";
import HomeButton from "./HomeButton";

const Error = ({ error }) => {

    const message = error.message || 'Ha ocurrido un error';
    // Default
    let reload = true;
    let home = true;
    // Custom
    if (error.reload !== undefined) reload = error.reload;
    if (error.home !== undefined) home = error.home;
    
    const handleClick = () => window.location.replace('');
    
    return (
        <section className='fade text-center mt-32 p-4 select-none focus:outline-none'>
            <h2 className="text-3xl">{message}</h2>
            {
                message === 'Ha ocurrido un error' && <h3 className="text-xl mt-4">Si el problema persiste, por favor contáctese con el administrador</h3>
            }
            <ButtonContainer>
                {reload && <ButtonGray onClick={() => handleClick()} >Recargar página</ButtonGray>}
                {home && <HomeButton />}
            </ButtonContainer>
        </section>
    );
}

export default Error;