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
                <>
                    <section className="fade text-center mt-5">
                        <h2 className="text-3xl">Productos Recomendados</h2>
                        {/* <h2 className="text-3xl">Productos Destacados</h2>
                        <h2 className="text-3xl">Ofertas</h2> */}
                        <div className="flex flex-wrap mt-5 gap-4">
                            <div className="grow">
                                <ItemCard />
                            </div>
                            <div className="grow">
                                <ItemCard />
                            </div>
                            <div className="grow">
                                <ItemCard />
                            </div>
                            <div className="grow">
                                <ItemCard />
                            </div>
                        </div>
                    </section>
                </>
            }
        </>
    );
}

export default Home;