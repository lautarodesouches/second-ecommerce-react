const Button = ({ children, buttonClass, onClick }) => {
    return (
        <button className={`block font-semibold rounded transition-all px-3 py-2 duration-500 my-6 sm:my-2 mx-auto focus:-translate-y-1 ${buttonClass}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;