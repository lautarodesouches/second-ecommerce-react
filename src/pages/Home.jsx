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

const Home = () => {
    
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"))
            return await getDocs(querySnapshot);
        })()
            .then((result) => {
                setItems( 
                    shuffle(
                        result.docs.map( (doc) => (
                            { id: doc.id, ...doc.data() }
                            )
                        )
                    ) 
                );

                // Loading finished
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    },[])

    return(
        <>
            {
                loading
                ?
                <Loading />
                :
                <section className="fade">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
                        {
                            items.map(el => (
                                <ItemCard key={el.id} id={el.id} name={el.name} price={el.price} freeShipping={el.freeShipping} />
                            ))
                        }
                    </div>
                </section>
            }
        </>
    );
}

export default Home;