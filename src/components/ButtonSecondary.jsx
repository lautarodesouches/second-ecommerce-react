// Component
import Button from "./Button";

const ButtonSecondary = ({children, whith, margin, onClick}) => {
    return(
        <Button onClick={onClick} buttonClass={`${whith} ${margin} bg-blue-50 hover:bg-blue-100 text-blue-600`}>
            {children}
        </Button>
    );
}

export default ButtonSecondary;