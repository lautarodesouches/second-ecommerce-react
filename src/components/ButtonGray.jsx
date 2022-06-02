// Component
import Button from "./Button";

const ButtonGray = ({ children }) => {
    return (
        <Button buttonClass='w-full border border-solid border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white'>
            {children}
        </Button>
    );
}

export default ButtonGray;