function renderMath(){
    if (typeof katex != 'undefined'){
        let values = getEigenValues();
        let vectors = getNormalizedEigenVectors();

        let start = "\\large{";
        let cap = "}";

        let displayString = "";

        if (vectors.length == 2){
            displayString += `
            v_{\\lambda=${roundToPlaces(values[0], 2)}}= \\langle ${roundToPlaces(vectors[0][0], 2)}t, ${roundToPlaces(vectors[0][1], 2)}t \\rangle ; \\;\\;
            v_{\\lambda=${roundToPlaces(values[1], 2)}}= \\langle ${roundToPlaces(vectors[1][0], 2)}s, ${roundToPlaces(vectors[1][1], 2)}s \\rangle`;

            if (targetedPoint){
                let coefficients = getVectorCoefficients(vectors, targetedPoint);

                displayString += `}\\\\ \\large{
                    v_{selected}=${roundToPlaces(coefficients[0], 2)}\\langle ${roundToPlaces(vectors[0][0], 2)}, ${roundToPlaces(vectors[0][1], 2)} \\rangle +
                    ${roundToPlaces(coefficients[1], 2)}\\langle ${roundToPlaces(vectors[1][0], 2)}, ${roundToPlaces(vectors[1][1], 2)} \\rangle =
                    \\langle ${roundToPlaces(targetedPoint[0], 2)}, ${roundToPlaces(targetedPoint[1], 2)} \\rangle`;
            }

            displayString += `}\\\\ \\large{
                v_{\\lambda=${roundToPlaces(values[0], 2)}_{transformed}}=${roundToPlaces(values[0], 2)}v_{\\lambda=${roundToPlaces(values[0], 2)}_{initial}} ; \\;\\;
                v_{\\lambda=${roundToPlaces(values[1], 2)}_{transformed}}=${roundToPlaces(values[1], 2)}v_{\\lambda=${roundToPlaces(values[1], 2)}_{initial}}`;
        }
        else if (vectors.length == 1){
            displayString += `v_{\\lambda=${roundToPlaces(values[0], 2)}}= \\langle ${roundToPlaces(vectors[0][0], 2)}t, ${roundToPlaces(vectors[0][1], 2)}t \\rangle`;
        }

        katex.render(start + displayString + cap, document.getElementById('katexRender'));
    }

    setTimeout(renderMath, 100);
}

function roundToPlaces(num, places){
    return +(Math.round(+(num + `e${places}`)) + `e-${places}`);
}

renderMath();