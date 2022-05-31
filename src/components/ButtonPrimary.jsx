// Component
import Button from "./Button";

const ButtonPrimary = ({children, whith, margin, onClick}) => {
    return(
        <Button onClick={onClick} buttonClass={`${whith} ${margin} bg-blue-600 hover:bg-blue-700 text-white`}>
            {children}
        </Button>
    );
}

export default ButtonPrimary;