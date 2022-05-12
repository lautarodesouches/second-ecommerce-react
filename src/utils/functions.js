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