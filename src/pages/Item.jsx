// React
import { useEffect, useState } from "react";
// Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
// Utils
import db from "utils/firebaseConfig";
// React Router DOM
import { useParams } from "react-router-dom";
// Components
import ItemDetail from "components/ItemDetail";
import Loading from "components/Loading";
import Error from "components/Error";

const Item = () => {

    const [item, setItem] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const { itemID } = useParams();

    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"), where("id", "==", parseInt(itemID)));
            return await getDocs(querySnapshot);
        })()
            .then(result => {
                if (result.docs.length < 1) throw new TypeError("Hubo un error por favor intente mas tarde");
                setItem(result.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0]);
            })
            .catch(error => {
                setError({ message: error.message });
            })
            .finally(() => setLoading(false))
    }, [itemID])

    return (
        <>
            {
                error
                    ?
                    <Error error={error} />
                    :
                    (
                        loading
                            ?
                            <Loading />
                            :
                            <ItemDetail item={item} />
                    )
            }
        </>
    );
}

export default Item;