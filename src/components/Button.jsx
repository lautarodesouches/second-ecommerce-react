const { bgPrimary, bgPrimaryHover } = require("theme/Colors")

const Button = ({children}) => {
    return(
        <button className={`${bgPrimary} text-white px-4 py-2 rounded hover:${bgPrimaryHover} transition-all`}>
            {children}
        </button>
    );
}

export default Button;