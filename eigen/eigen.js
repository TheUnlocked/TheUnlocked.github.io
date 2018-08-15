let m_00, m_10,
    m_01, m_11;

function quadratic(a, b, c){
    let addend = Math.sqrt((b*b)-4*a*c);
    if (isNaN(addend)){
        return [];
    }
    else if (addend == 0){
        return [-b / (2 * a)];
    }
    else{
        return [(-b + addend) / (2 * a), (-b - addend) / (2 * a)];
    }
}

function transformPoint(pt){
    return [pt[0] * m_00 + pt[1] * m_10, pt[0] * m_01 + pt[1] * m_11];
}

function getEigenValues(){
    return quadratic(1, -(m_00 + m_11), m_00*m_11 - m_10*m_01);
}

function normalizeVector(vector){
    let magnitude = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
    return [vector[0] / magnitude, vector[1] / magnitude];
}

function getEigenVectors(){
    let eigenValues = getEigenValues();
    let eigenVectors = [];

    for (let value of eigenValues){
        eigenVectors.push([-m_10 / (m_00 - value), 1]);
    }

    return eigenVectors;
}

function getNormalizedEigenVectors(){
    let eigenVectors = getEigenVectors();
    let normalizedVectors = [];

    for (let vector of eigenVectors){
        normalizedVectors.push(normalizeVector(vector));
    }

    return normalizedVectors;
}