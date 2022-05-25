// React
import { useState } from "react";
// Utils
import { formatNumber } from "utils/functions";
// Components
import ArrowDown from "./ArrowDown";
import ArrowUp from "./ArrowUp";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import FreeShipping from "./FreeShipping";
import StarFill from "./StarFill";
import Star from "./Star";

const ItemDetail = ({item}) => {

    const [mainImg, setMainImg] = useState(1);
    const [selectingUnits, setSelectingUnits] = useState(false);
    const [selectedUnits, setSelectedUnits] = useState(1);

    const STARS = Math.round(item.stars);
    const STAR_CLASS = 'w-4 fill-blue-500';

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

    const handleSelectUnits = () => {
        setSelectingUnits(!selectingUnits);
        setSelectedUnits(selectedUnits + 1);
    }

    return(
        <section className="container flex flex-col md:flex-row flex-wrap bg-white rounded p-4 my-4 text-center lg:w-5/6 m-auto">
            { /* --------------------------------- */ }
            <div className="flex w-full md:w-1/2 lg:w-3/12 p-2">
                <div className="flex flex-col w-1/6 justify-start items-center order-1 md:order-none">
                    {
                        [...Array(item.availableImages)].map( (undefined, index) => 
                            {
                                index++
                                return (
                                    <div key={index} className={`w-14 h-14 my-1 cursor-pointer rounded border border-neutral-400 p-1 ${ mainImg === index ? 'border-blue-700' : ''}`} onClick={() => setMainImg(index)} onMouseEnter={() => setMainImg(index)}>
                                        <img className="m-auto max-w-full h-full" src={`https://lautarodesouches.github.io/ecommerce/img/${item.id}-${index}.png`} alt={item.name} />
                                    </div>
                                )
                            }
                        )
                    }
                </div>
                <div className="w-5/6 self-center">
                    <img className="w-4/5 m-auto rounded-xl" src={`https://lautarodesouches.github.io/ecommerce/img/${item.id}-${mainImg}.png`} alt={item.name} />
                </div>
            </div>
            { /* --------------------------------- */ }
            <div className="w-full md:w-1/2 lg:w-5/12 p-2">
                <h2 className="mt-4 text-3xl font-semibold">{item.name}</h2>
                <div className="mt-4 mb-2">
                    {
                        item.discount > 0
                        ?
                        <>
                            <h4 className="font-light text-neutral-500 line-through">{formatNumber(item.price)}</h4>
                            <h3 className="font-light text-5xl">{formatNumber(Math.round(item.price - item.price * item.discount / 100))} <span className="text-green-600 text-base font-medium">{item.discount + "% OFF"}</span> </h3>
                        </>
                        :
                        <h3 className="text-3xl font-light">{formatNumber(item.price)}</h3>
                    }
                </div>
                <div className="mt-10 flex">
                    <h3 className="grow">{item.sold} vendedidos</h3>
                    {5- STARS}
                    <div className="grow flex gap-1 justify-center" alt={`${STARS} estrellas`}>
                        {
                            [...Array(STARS)].map( (undefined, index) => <StarFill key={index} props={STAR_CLASS} />)
                        }
                        {
                            STARS < 5 && [...Array(5 - STARS)].map( (undefined, index) => <Star key={index} props={STAR_CLASS} />)
                        }
                    </div>
                    <h3 className="grow">{item.opinions} opiniones</h3>
                </div>
                <div className="mt-10">
                    <p>{item.description}</p>
                </div>
            </div>
            { /* --------------------------------- */ }
            <div className="w-full lg:w-4/12 p-3">
                {
                    item.freeShipping && <FreeShipping />
                }
                <div className="mt-6 text-lg cursor-pointer" onClick={() => handleSelectUnits()}>
                    Cantidad: {selectedUnits} unidad
                    {
                        selectingUnits
                        ?
                        <ArrowUp prop="mx-2 w-4 inline fill-white bg-blue-500 rounded" />
                        :
                        <ArrowDown prop="mx-2 w-4 inline fill-white bg-blue-500 rounded" />
                    }
                    <span className="text-neutral-500">
                        {` (${item.amountAvailable} disponible${item.amountAvailable > 1 && 's'})`}
                    </span>
                </div>
                <div className="md:flex mt-10 justify-evenly">
                    <ButtonSecondary whith={'md:w-5/12'} margin={'my-2'}>
                        Agregar al carrito
                    </ButtonSecondary>
                    <ButtonPrimary whith={'md:w-5/12'} margin={'my-2'}>
                        Comprar Ahora
                    </ButtonPrimary>
                </div>
            </div>
        </section>
    );
}

export default ItemDetail;