const Search = () => {
    return(
        <section className="min-h-screen text-center">
            <div id="filtros">

            </div>
            <div id="resultados">
                {
                    false
                    ?
                    null
                    :
                    <h2 className="fade pt-40">No se han encontrado productos que coincidan con tu búsqueda</h2>
                }
            </div>
        </section>
    );
}

export default Search;