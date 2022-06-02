// Component
import Button from "./Button";

const ButtonSecondary = ({ children, onClick }) => {
    return (
        <Button buttonClass={`bg-blue-50 hover:bg-blue-100 text-blue-600`} onClick={onClick}>
            {children}
        </Button>
    );
}

export default ButtonSecondary;