const ChevronUp = ({prop}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" className={`bi bi-chevron-double-up ${[prop]}`} viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
          <path fillRule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
        </svg>
    );
}

export default ChevronUp;