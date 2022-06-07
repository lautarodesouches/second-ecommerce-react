// Components
import FilterOptions from "./FilterOptions";
import ItemsContainer from "./ItemsContainer";

const SearchContainer = ({ searchParams, handleFilter, categories, brands, items }) => {
    return (
        <section className="min-h-screen text-center flex flex-col md:flex-row" >
            <div id="filtros" className="fade md:w-1/4 text-left pb-5 md:p-4">
                {
                    searchParams.get('query') &&
                    <FilterOptions
                        title='Busqueda'
                        param='query'
                        array={[searchParams.get('query')]}
                        handleFilter={handleFilter}
                    />
                }
                {
                    categories.length &&
                    <FilterOptions
                        title='Categorias'
                        param='category'
                        array={categories}
                        handleFilter={handleFilter}
                    />
                }
                {
                    brands.length &&
                    <FilterOptions
                        title='Marcas'
                        param='brand'
                        array={brands}
                        handleFilter={handleFilter}
                    />
                }
            </div>
            <div className="md:w-3/4" id="resultados">
                {
                    items.length > 0
                        ?
                        <ItemsContainer items={items} />
                        :
                        <h2 className="fade py-10 md:pt-40">No se han encontrado productos que coincidan con tu búsqueda</h2>
                }
            </div>
        </section>
    );
}

export default SearchContainer;