let tile_size = 30;
let tiles_r = 8;

function setup(){
    createCanvas(tiles_r * 2 * tile_size + 1, tiles_r * 2 * tile_size + 1);
}

function draw(){
    clear();
    
    let amount = document.getElementById("transform_amount").value;

    m_00 = lerp(1, document.getElementById("matrix_00").value, amount);
    m_10 = lerp(0, document.getElementById("matrix_10").value, amount);
    m_01 = lerp(0, document.getElementById("matrix_01").value, amount);
    m_11 = lerp(1, document.getElementById("matrix_11").value, amount);


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

    strokeWeight(3);
    for (let vector of getEigenVectors()){
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