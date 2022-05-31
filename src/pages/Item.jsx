// React
import { useEffect, useState } from "react";
// Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "utils/firebaseConfig";
// React Router DOM
import { useParams } from "react-router-dom";
// Components
import Loading from "components/Loading";
import NotFound from "components/NotFound";
import ItemDetail from "components/ItemDetail";

const Item = () => {

    const [ item, setItem ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    
    const { itemID } = useParams();
    
    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"), where("id", "==", parseInt(itemID) ));
            return await getDocs(querySnapshot);
        })()
        .then(result => {
            setItem( result.docs.map( (doc) => ({ id: doc.id, ...doc.data() }) )[0] );
            // Loading finished
            setLoading(false);
        })
        .catch(error => {
            console.log(error, ' error');
        })
    }, [itemID])

    return(
        <>
        {
            loading
            ?
            <Loading />
            :
                item
                ?
                <ItemDetail item={item} />
                :
                <NotFound message="No se ha encontrado el producto" />            
        }
        </>
    );
}

export default Item;