const { primary, primaryHover } = require("theme/Colors")

const Button = ({children}) => {
    return(
        <button className={`${primary} text-white px-4 py-2 rounded hover:${primaryHover} transition-all`}>
            {children}
        </button>
    );
}

export default Button;