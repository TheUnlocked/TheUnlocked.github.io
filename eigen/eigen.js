function quadratic(a, b, c){
    let disc = b*b-4*a*c;
    if (Math.abs(disc) < 1e-12){ // Float safety
        return [-b / (2 * a)];
    }
    else if (disc < 0){
        return [];
    }
    else{
        let addend = Math.sqrt(disc);
        return [(-b + addend) / (2 * a), (-b - addend) / (2 * a)];
    }
}

function transformPoint(pt){
    return [pt[0] * m_00 + pt[1] * m_10, pt[0] * m_01 + pt[1] * m_11];
}

function inverseTransformPoint(pt){
    let determinant = m_00 * m_11 - m_10 * m_01;
    return [(pt[0]*m_11 - pt[1]*m_10) / determinant, (-pt[0]*m_01 + pt[1]*m_00) / determinant];
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
        if (m_00 == value){
            if (m_10 == 0 && m_01 == 0){
                return [];
            }
            else if (m_10 == 0){
                eigenVectors.push([0, 1]);
            }
            else{
                eigenVectors.push([1, 0]);
            }
        }
        else{
            eigenVectors.push([-m_10 / (m_00 - value), 1]);
        }
    }

    if (eigenVectors.length == 2 && eigenVectors[0][0] == eigenVectors[1][0] && eigenVectors[0][1] == eigenVectors[1][1]){
        eigenVectors = [eigenVectors[0]];
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

function getVectorCoefficients(eigenVectors, targetedPoint){
    let px = targetedPoint[0], py = targetedPoint[1],
        v1x = eigenVectors[0][0], v1y = eigenVectors[0][1], 
        v2x = eigenVectors[1][0], v2y = eigenVectors[1][1];
    let a = (py - (v2y * px / v2x)) / (v1y - (v2y * v1x / v2x));
    let b = (px - (a * v1x)) / v2x;

    return [a, b];
}