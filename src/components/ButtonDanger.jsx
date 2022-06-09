// Component
import Button from "./Button";

const ButtonDanger = ({children, onClick}) => {
    return(
        <Button buttonClass={`border border-solid border-red-500 text-red-500 hover:bg-red-500 hover:text-white`} onClick={onClick}>
            {children}
        </Button>
    );
}

export default ButtonDanger;