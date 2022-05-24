// React
import { useEffect, useState } from "react";
// Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "utils/firebaseConfig";
// React Router DOM
import { useParams } from "react-router-dom";
// Utils
import { formatNumber } from "utils/functions";
// Components
import Loading from "components/Loading";
import NotFound from "components/NotFound";
import Truck from "components/Truck";
import ArrowDown from "components/ArrowDown";

const Product = () => {

    const [ product, setProduct ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ selectedUnits, setSelectedUnits ] = useState(1);
    const [ mainImg, setMainImg ] = useState(1);
    
    const { productID } = useParams();
    
    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"), where("id", "==", parseInt(productID) ));
            return await getDocs(querySnapshot);
        })()
        .then(result => {
            setProduct( result.docs.map( (doc) => ({ id: doc.id, ...doc.data() }) )[0] );
            // Loading finished
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
        })
    }, [productID])

    const getImages = () => {
        const images = [];
        for (let index = 1; index < product.availableImages + 1; index++) {
            images.push(
                (<div key={index} className={`w-14 h-14 my-1 cursor-pointer rounded border border-neutral-400 p-1 ${ mainImg === index && 'border-blue-700'}`} onClick={() => setMainImg(index)} onMouseEnter={() => setMainImg(index)}>
                    <img className="m-auto max-w-full h-full" src={`https://lautarodesouches.github.io/ecommerce/img/${product.id}-${index}.png`} alt={product.name} />
                </div>)
            )
        }
        return images;
    }

    /*
    
    X availableColors: (3) ['negro', 'verde', 'blanco']
    X opinions: 53
    X brand: "Soundpeats"
    X category: "Auriculares"

    > amountAvailable: 95
    > availableImages: 3
    > description: "Con el Smart TV UN50AU7000G vas a acceder a las aplicaciones en las que se encuentran tus contenidos favoritos. Además, podés navegar por Internet, interactuar en redes sociales y divertirte con videojuegos."
    > discount: 7
    > freeShipping: false
    > id: 20
    > name: "Auriculares in-ear inalámbricos Soundpeats"
    > price: 5591
    > sold: 337
    > stars: 3.4

    */

    return(
        <>
        {
            loading
            ?
            <Loading />
            :
                product
                ?
                <section className="container flex flex-col md:flex-row bg-white rounded p-4 my-4 text-center w-5/6 m-auto">
                    { /* --------------------------------- */ }
                    <div className="flex w-full md:w-3/12 p-2">
                        <div className="flex flex-col w-1/6 justify-start items-center">
                            {
                                getImages()
                            }
                        </div>
                        <div className="w-5/6 self-center">
                            <img className="w-4/5 m-auto rounded-xl" src={`https://lautarodesouches.github.io/ecommerce/img/${product.id}-${mainImg}.png`} alt={product.name} />
                        </div>
                    </div>
                    { /* --------------------------------- */ }
                    <div className="w-full md:w-5/12 p-2">
                        <div className="flex justify-evenly text-neutral-500 text-sm">
                            <h3>{product.sold} vendedidos</h3>
                            <h3>Estrellas: {product.stars}</h3>
                        </div>
                        <h2 className="mt-4 text-2xl font-semibold">{product.name}</h2>
                        <div className="mt-4 mb-2">
                            {
                                product.discount > 0
                                ?
                                <>
                                    <h4 className="font-light text-neutral-500 text-sm line-through">{formatNumber(product.price)}</h4>
                                    <h3 className="font-light text-4xl">{formatNumber(Math.round(product.price - product.price * product.discount / 100))} <span className="text-green-600 text-base font-medium">{product.discount + "% OFF"}</span> </h3>
                                </>
                                :
                                <h3 className="text-3xl font-light">{formatNumber(product.price)}</h3>
                            }
                        </div>
                        <div className="mt-4 text-left">
                            <p>{product.description}</p>
                        </div>
                    </div>
                    { /* --------------------------------- */ }
                    <div className="w-full md:w-4/12 p-3">
                        {
                            product.freeShipping && 
                            (
                                <div className="flex justify-center gap-4">
                                    <Truck prop="fill-green-600 w-6" />
                                    <h3 className="text-green-600 font-semibold text-lg">Envio Gratis!</h3>
                                </div>
                            )
                        }
                        <div className="text-left my-4">
                            {product.sold} ventas
                        </div>
                        <div className="mt-6 text-lg cursor-pointer" onClick={() => setSelectedUnits(selectedUnits + 1)}>
                            Cantidad: {selectedUnits} unidad
                            {
                                true
                                ?
                                <ArrowDown prop="ml-1 mr-2 w-4 inline fill-blue-700" />
                                :
                                <ArrowDown prop="ml-1 mr-2 w-4 inline fill-blue-700" />
                            }
                            <span className="text-neutral-500">
                                {` (${product.amountAvailable} disponible${product.amountAvailable > 1 && 's'})`}
                            </span>
                        </div>
                        <div className="flex mt-10 justify-evenly">
                            <button className="w-5/12 font-semibold bg-blue-50 hover:bg-blue-100 transition-all duration-500 px-3 py-2 rounded text-blue-600">Agregar al carrito</button>
                            <button className="w-5/12 font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-500 px-3 py-2 rounded text-white">Comprar</button>
                        </div>
                    </div>
                </section>
                :
                <NotFound message="No se ha encontrado el producto" />            
        }
        </>
    );
}

export default Product;