// Components
import Error from "components/Error";
import OrdersResult from "components/OrdersResult";
import Loading from "components/Loading";
import OrdersForm from "components/OrdersForm";
// React
import { useState } from "react";
// Utils
import db from "utils/firebaseConfig";
// Firebase
import { doc, getDoc } from "firebase/firestore";
// Functions
import { useParams } from "react-router-dom";

const Orders = () => {

    const [formCompleted, setFormCompleted] = useState(false);
    const [error, setError] = useState(undefined);
    const [cartList, setCartList] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const orderId = useParams().orderId;

    const processForm = (e) => {

        e.preventDefault();

        (async () => {
            console.log(e.target.children[1].children[1].value);
            const docRef = doc(db, "orders", e.target.children[1].children[1].value);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data());
                return docSnap.data();
            }
            return new Error("No se encontro documento");
        })()
            .then((res) => {
                console.log(res);
                setCartList(res.items);
                setCartTotal(res.total);
            })
            .catch((error) => {
                console.log(error);
                setError(error);
            })
            .finally(() => setLoading(false))

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
                                error === undefined
                                    ?
                                    <OrdersResult cartList={cartList} cartTotal={cartTotal} setFormCompleted={setFormCompleted} />
                                    :
                                    <Error message='' />
                            )
                    )
                    :
                    <OrdersForm orderId={orderId} processForm={processForm} />
            }
        </section>

    );
}

export default Orders;