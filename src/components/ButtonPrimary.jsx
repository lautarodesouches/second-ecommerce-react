// Component
import Button from "./Button";

const ButtonPrimary = ({ children, onClick}) => {
    return (
        <Button buttonClass={`bg-blue-600 hover:bg-blue-700 text-white`} onClick={onClick}>
            {children}
        </Button>
    );
}

export default ButtonPrimary;