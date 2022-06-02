// Components
import Error from "components/Error";
import Loading from "components/Loading";
import OrdersForm from "components/OrdersForm";
import OrdersResult from "components/OrdersResult";
// React
import { useState } from "react";
// Utils
import db from "utils/firebaseConfig";
// Functions
import { useParams } from "react-router-dom";
// Firebase
import { doc, getDoc } from "firebase/firestore";

const Orders = () => {

    const [loading, setLoading] = useState(true);
    const [cartList, setCartList] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [error, setError] = useState("");
    const [formCompleted, setFormCompleted] = useState(false);

    const orderId = useParams().orderId;

    const processForm = (e) => {

        e.preventDefault();

        (async () => {
            const docRef = doc(db, "orders", e.target.children[0].children[1].value);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            }
        })()
            .then((res) => {
                !res && setError({ message: 'No se ha encontrado una order con ese ID', reload:true});
                setCartList(res.items);
                setCartTotal(res.total);
            })
            .catch((error) => {
                error && setError({ message: 'Ha ocurrido un error', home: true, reload:true, description: error.message});
            })
            .finally(() => {
                setLoading(false);
            })

        setFormCompleted(true);

    }

    /* ID de ejemplo: 7Rw7xMN6nBFHlBOKVIFk */

    return (
        <section className="m-auto my-8">
            {
                formCompleted
                    ?
                    (
                        loading
                            ?
                            <Loading />
                            :
                            (
                                error
                                    ?
                                    <Error error={error} />
                                    :
                                    <OrdersResult cartList={cartList} cartTotal={cartTotal} setFormCompleted={setFormCompleted} />
                            )
                    )
                    :
                    <OrdersForm orderId={orderId} processForm={processForm} />
            }
        </section>
    );
}

export default Orders;