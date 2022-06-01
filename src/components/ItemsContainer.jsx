// Components
import ItemCard from "./ItemCard";

const ItemsContainer = ({ title, items }) => {
    return (
        <section className="fade text-center my-10">
            <h2 className="text-3xl mb-5">{title}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
                {
                    items.map(el => (
                        <ItemCard key={el.id} item={el} />
                    ))
                }
            </div>
        </section>
    );
}

export default ItemsContainer;