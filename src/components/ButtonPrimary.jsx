// Component
import Button from "./Button";

const ButtonPrimary = ({children, whith, onClick}) => {
    return(
        <Button onClick={onClick} buttonClass={`${whith} bg-blue-600 hover:bg-blue-700 text-white`}>
            {children}
        </Button>
    );
}

export default ButtonPrimary;