
const ButtonPrimary = ({children, whith, margin}) => {
    return(
        <button className={`${whith} ${margin} font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-500 px-3 py-2 rounded text-white`}>
            {children}
        </button>
    );
}

export default ButtonPrimary;