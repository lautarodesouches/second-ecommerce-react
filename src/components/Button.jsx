const Button = ({children}) => {
    return(
        <button className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-600 transition-all">
            {children}
        </button>
    );
}

export default Button;