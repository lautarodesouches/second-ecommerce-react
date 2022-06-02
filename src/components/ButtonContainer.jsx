const ButtonContainer = ({children}) => {
    return(
        <div className="sm:flex gap-10 sm:w-1/3 mx-auto mt-8">
            {children}
        </div>
    );
}

export default ButtonContainer;