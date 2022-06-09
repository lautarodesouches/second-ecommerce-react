const Button = ({ children, buttonClass, onClick }) => {
    return (
        <div className="grow">
            <button
                className={`block w-full font-semibold rounded transition-all px-3 py-2 duration-500 my-6 sm:my-0 focus:-translate-y-1 ${buttonClass ? buttonClass : ''}`}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    );
}

export default Button;