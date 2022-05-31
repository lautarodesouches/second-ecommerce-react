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

export function notification(text, bg, time) {
    const body  = document.getElementsByTagName("body")[0];
    const div   = document.createElement("div");
    div.innerText = text;
    div.classList = `${bg} text-white px-4 py-2 rounded fixed m-2 top-0 right-0 cursor-pointer fade`;
    let removed = false;
    div.onclick = () => {
        body.removeChild(div);
        removed = true;
    };
    body.appendChild(div);
    setTimeout(() => {
        !removed && body.removeChild(div);
    }, time);
}