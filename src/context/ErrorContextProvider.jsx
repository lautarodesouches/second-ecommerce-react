// Components
import ButtonContainer from "components/ButtonContainer";
import ButtonGray from "components/ButtonGray";
import HomeButton from "components/HomeButton";

const { createContext, useState, useRef, useEffect } = require("react");

export const ErrorContext = createContext();

const ErrorContextProvider = ({ children }) => {

    const mainRef = useRef();

    useEffect(() => {
        mainRef.current && mainRef.current.focus();
    }, [mainRef]);

    const [error, setError] = useState(false);

    class MyError {
        constructor(
            description,
            home = true,
            message = 'Ha ocurrido un error',
            reload = true,
        ) {
            this.description = description || 'Error general';
            this.home = home;
            this.message = message;
            this.reload = reload;
        }
    }

    // Show biggest errors in console
    if (error) {
        if (!error.description.includes('vacio')) console.log(`%c${error.description}`, 'background: crimson; color: white; padding: 5px 10px; margin: 5px; border-radius: 10px;');
    }

    return (
        <ErrorContext.Provider value={{ setError, MyError }}>
            {
                error
                    ?
                    <section
                        className='fade text-center mt-32 p-4 select-none focus:outline-none'
                        tabIndex="1"
                        autoFocus
                        onClick={() => { mainRef.current.focus() }}
                        ref={mainRef}
                        onBlur={() => {
                            //console.log('test');
                            setError(false);
                        }}
                    >
                        <h2 className="text-3xl">{error.message}</h2>
                        {
                            error.message === 'Ha ocurrido un error' && <h3 className="text-xl mt-4">Si el problema persiste, por favor contáctese con el administrador</h3>
                        }
                        <ButtonContainer>
                            {error.reload && <ButtonGray onClick={() => { setError(false); window.location.replace(''); }} >Recargar página</ButtonGray>}
                            {error.home && <HomeButton onClick={() => setError(false)} />}
                        </ButtonContainer>
                    </section>
                    :
                    children
            }
        </ErrorContext.Provider>
    );
}

export default ErrorContextProvider;