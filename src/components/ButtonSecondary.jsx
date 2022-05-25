const ButtonSecondary = ({children, whith, margin}) => {
    return(
        <button className={`${whith} ${margin} block m-auto font-semibold bg-blue-50 hover:bg-blue-100 transition-all duration-500 px-3 py-2 rounded text-blue-600`}>
            {children}
        </button>
    );
}

export default ButtonSecondary;