import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "utils/firebaseConfig";
import { shuffle } from "utils/functions";

const Home = () => {
    
    const [items, setItems] = useState([]);

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
            })
            .catch((error) => {
                console.log(error);
            })
    },[])

    return(
        <section className="fade">
            <h3>prueba</h3>
            {
                items.map(el => (
                    <h3 className="fade" key={el.id}>{el.name}</h3>
                ))
            }
        </section>
    );
}

export default Home;