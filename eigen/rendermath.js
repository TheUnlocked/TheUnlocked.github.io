function renderMath(){
    if (typeof katex != 'undefined'){
        let values = getEigenValues();
        let vectors = getNormalizedEigenVectors();

        let start = "\\large{";
        let cap = "}";

        let displayString = "";

        if (vectors.length == 2){
            displayString += `
            \\textcolor{#FF0000}{ v_{\\lambda=${roundToPlaces(values[0], 2)}} \\textcolor{#000000}{=} \\langle ${roundToPlaces(vectors[0][0], 2)}t, ${roundToPlaces(vectors[0][1], 2)}t \\rangle } ; \\;\\;
            \\textcolor{#0000FF}{ v_{\\lambda=${roundToPlaces(values[1], 2)}} \\textcolor{#000000}{=} \\langle ${roundToPlaces(vectors[1][0], 2)}s, ${roundToPlaces(vectors[1][1], 2)}s \\rangle }`;

            if (targetedPoint){
                let coefficients = getVectorCoefficients(vectors, targetedPoint);

                displayString += `}\\\\ \\large{
                    \\textcolor{#FF00FF}{ v_{selected} } =
                    \\textcolor{#FFC800}{ ${roundToPlaces(coefficients[0], 2)} } \\textcolor{#FF0000}{ \\langle ${roundToPlaces(vectors[0][0], 2)}, ${roundToPlaces(vectors[0][1], 2)} \\rangle } +
                    \\textcolor{#46C8FF}{ ${roundToPlaces(coefficients[1], 2)} } \\textcolor{#0000FF}{ \\langle ${roundToPlaces(vectors[1][0], 2)}, ${roundToPlaces(vectors[1][1], 2)} \\rangle } =
                    \\textcolor{#FF00FF}{ \\langle ${roundToPlaces(targetedPoint[0], 2)}, ${roundToPlaces(targetedPoint[1], 2)} \\rangle }`;
            }

            displayString += `}\\\\ \\large{
                \\textcolor{#FF0000}{ v_{\\lambda=${roundToPlaces(values[0], 2)}_{transformed}} \\textcolor{#000000}{=} ${roundToPlaces(values[0], 2)}v_{\\lambda=${roundToPlaces(values[0], 2)}_{initial}} } ; \\;\\;
                \\textcolor{#0000FF}{ v_{\\lambda=${roundToPlaces(values[1], 2)}_{transformed}} \\textcolor{#000000}{=} ${roundToPlaces(values[1], 2)}v_{\\lambda=${roundToPlaces(values[1], 2)}_{initial}} }`;
        }
        else if (vectors.length == 1){
            displayString += `\\textcolor{#FF0000}{ v_{\\lambda=${roundToPlaces(values[0], 2)}} \\textcolor{#000000}{=} \\langle ${roundToPlaces(vectors[0][0], 2)}t, ${roundToPlaces(vectors[0][1], 2)}t \\rangle }`;
        }

        katex.render(start + displayString + cap, document.getElementById('katexRender'));
    }

    setTimeout(renderMath, 100);
}

function roundToPlaces(num, places){
    return +(Math.round(+(num + `e${places}`)) + `e-${places}`);
}

renderMath();