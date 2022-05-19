// Components
import ItemCard from "components/ItemCard";
import Loading from "components/Loading";
// Firebase
import { collection, getDocs, query } from "firebase/firestore";
// React
import { useEffect, useState } from "react";
// Utils
import db from "utils/firebaseConfig";
import { shuffle } from "utils/functions";

const Offers = () => {
    
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"))
            return await getDocs(querySnapshot);
        })()
            .then((result) => {
                
                const array = shuffle(
                    result.docs.map( (doc) => (
                        { id: doc.id, ...doc.data() }
                        )
                    )
                )
                setItems(
                    array.filter( (e) => e.discount > 0)
                );

                // Loading finished
                setLoading(false);
            })
            .catch((error) => {
                console.log(error, ' error');
            })
    },[])

    return(
        <>
            {
                loading
                ?
                <Loading />
                :
                <>
                    <section className="fade text-center mt-5">
                        <h2 className="text-3xl mb-5">Ofertas</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
                        {
                            items.map(el => (
                                <ItemCard key={el.id} id={el.id} name={el.name} price={el.price} freeShipping={el.freeShipping} discount={el.discount} />
                            ))
                        }
                        </div>
                    </section>
                </>
            }
        </>
    );
}

export default Offers;