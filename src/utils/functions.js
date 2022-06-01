export function formatNumber(number) {
    let formatOfNumber = new Intl.NumberFormat("es-AR");
    return "$" + formatOfNumber.format(number);
}

export function capitalize(sentence) {
    return sentence && sentence[0].toUpperCase() + sentence.slice(1);
}

export function shuffle(array) {
    return array.sort((a, b) => 0.5 - Math.random());
}

export function notification(text, bg) {
    const body  = document.getElementsByTagName("body")[0];
    const div   = document.createElement("div");
    //
    let removed = false;
    // Insert message
    div.innerText = text;
    div.classList = `${bg} text-white px-4 py-2 rounded fixed m-2 top-0 right-0 cursor-pointer fade`;
    //
    div.onclick = () => {
        body.removeChild(div);
        removed = true;
    };
    //
    body.appendChild(div);
    //
    setTimeout(() => {
        if (!removed) {
            div.classList.remove('fade');
            div.classList.add('r-fade');   
        }
    }, 10000);
    setTimeout(() => {
        !removed && body.removeChild(div);
    }, 11000);
}