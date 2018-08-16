let tile_size = 30;
let tiles_r = 8;

function setup(){
    createCanvas(tiles_r * 2 * tile_size + 1, tiles_r * 2 * tile_size + 1);
}

function draw(){
    clear();
    scale(1, -1);
    translate(0, -(tiles_r * 2 * tile_size + 1));
    
    let amount = document.getElementById("transform_amount").value;

    m_00 = lerp(1, +document.getElementById("matrix_00").value, amount);
    m_10 = lerp(0, +document.getElementById("matrix_10").value, amount);
    m_01 = lerp(0, +document.getElementById("matrix_01").value, amount);
    m_11 = lerp(1, +document.getElementById("matrix_11").value, amount);


    // 1, 0, 1, 0

    // strokeWeight(2);
    // stroke(230);
    // for (let i = 0; i <= tiles_r * 2; i++){
    //     line(0, i * tile_size, tiles_r * 2 * tile_size, i * tile_size);
    // }
    // for (let i = 0; i <= tiles_r * 2; i++){
    //     line(i * tile_size, 0, i * tile_size, tiles_r * 2 * tile_size);
    // }
    // stroke(200);
    // line(0, tiles_r * tile_size, tiles_r * 2 * tile_size, tiles_r * tile_size);
    // line(tiles_r * tile_size, 0, tiles_r * tile_size, tiles_r * 2 * tile_size);

    // Transformed
    strokeWeight(1);
    stroke(150);
    let p1, p2;

    for (let i = 0; i <= tiles_r * 2; i++){
        p1 = transformPoint([-tiles_r, i - tiles_r]);
        p2 = transformPoint([tiles_r, i - tiles_r]);
        line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);
    }
    for (let i = 0; i <= tiles_r * 2; i++){
        p1 = transformPoint([i - tiles_r, -tiles_r]);
        p2 = transformPoint([i - tiles_r, tiles_r]);
        line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);
    }
    stroke(0);

    p1 = transformPoint([-tiles_r, 0]);
    p2 = transformPoint([tiles_r, 0]);
    line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);

    p1 = transformPoint([0, -tiles_r]);
    p2 = transformPoint([0, tiles_r]);
    line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);

    let color = 0;

    let eigenVectors = getNormalizedEigenVectors();

    if (targetedPoint && eigenVectors.length == 2){
        let px = targetedPoint[0], py = targetedPoint[1],
            v1x = eigenVectors[0][0], v1y = eigenVectors[0][1], 
            v2x = eigenVectors[1][0], v2y = eigenVectors[1][1];
        let s = (py - (v1y*px / v1x)) / ((v1y*v2y / v1x) + v2y);
        let t = (px - (s * v2x)) / v1x;
        
        strokeWeight(4);

        stroke(0, 255, 0);
        p1 = transformPoint([0, 0]);
        p2 = transformPoint([v1x * t, v1y * t]);
        line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);

        stroke(0, 255, 0);
        p1 = p2;
        p2 = transformPoint([v2x * s, v2y * s]);
        p2 = [p1[0] + p2[0], p1[1] + p2[1]];
        line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);
    }

    strokeWeight(3);
    for (let vector of eigenVectors){
        switch(color){
            case 0:
                stroke(255, 0, 0);
                break;
            case 1:
                stroke(0, 0, 255);
                break;
            case 2:
                stroke(0, 255, 0);
                break;
        }

        strokeWeight(3);
        p1 = transformPoint([0, 0]);
        p2 = transformPoint(vector);
        line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);


        switch(color){
            case 0:
                stroke(255, 0, 0, 200);
                break;
            case 1:
                stroke(0, 0, 255, 200);
                break;
            case 2:
                stroke(0, 255, 0, 200);
                break;
        }

        strokeWeight(1);
        line((tiles_r * tile_size) + vector[0] * -1000, (tiles_r * tile_size) + vector[1] * -1000, (tiles_r * tile_size) + vector[0] * 1000, (tiles_r * tile_size) + vector[1] * 1000);
        color = color + 1 % 3;
    }
}

let targetedPoint;

function mouseClicked() {
    if (0 < mouseY && mouseY < tiles_r * 2 * tile_size && 0 < mouseX && mouseX < tiles_r * 2 * tile_size){
        targetedPoint = inverseTransformPoint([mouseX / tile_size - tiles_r, tiles_r - (mouseY / tile_size)]);
    }
}

//mouseDragged = mouseClicked;