// Component
import Button from "./Button";

const ButtonGray = ({ children, onClick}) => {
    return (
        <Button buttonClass={`border border-solid border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white`} onClick={onClick}>
            {children}
        </Button>
    );
}

export default ButtonGray;