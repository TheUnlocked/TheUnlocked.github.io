function vh() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

function vw() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

function vmin() {
    return Math.min(vh(), vw());
}

function vmax() {
    return Math.max(vh(), vw());
}

let weapons = [

];

let challenges = [

];

function addChallenges(){
    challenges = [];
    
    challenges = challenges.concat(document.getElementById('extras').value.split(','));
}


function generateBoard({free} = {}){
    addChallenges();

    let grid = [];
    let spaces = getRandom(challenges, 25);
    let table = document.createElement('table');
    table.classList.add('bingo');
    for(let x = 0; x < 5; x++){
        let tr = document.createElement('tr');
        grid.push([]);
        for(let y = 0; y < 5; y++){
            let th = document.createElement('th');
            if (free && x == 2 && y == 2){
                th.innerText = free;
                th.freeSpace = true;
                th.completed = true;
                th.classList.add('free');
            }
            else{
                th.innerText = spaces[5 * x + y];
            }
            grid[x].push(th);
            tr.appendChild(th);
        }
        table.appendChild(tr);
    }
    document.getElementById('bingo').parentNode.replaceChild(table, document.getElementById('bingo'));
    table.id = 'bingo';
    let x = 0;
    for(let col of grid){
        let y = 0;
        for(let tile of col){
            tile.x = x;
            tile.y = y;
            textFit(tile, {maxFontSize: vmin() * 0.04});
            tile.children[0].style.fontSize = (parseInt(tile.children[0].style.fontSize.slice(0, -2)) * 100 / vmin()) + "vmin";

            tile.classList.add('unselected');
            tile.addEventListener('click', (e) => {
                tile.classList.toggle('unselected');
                tile.classList.toggle('selected');
                tile.completed = tile.classList.contains('selected');
                if (tile.freeSpace){
                    tile.completed = true;
                }
                if (grid[tile.x][0].completed && grid[tile.x][1].completed && grid[tile.x][2].completed && grid[tile.x][3].completed && grid[tile.x][4].completed){
                    for (let i = 0; i < 5; i++)
                        grid[tile.x][i].classList.add('completedX');
                }
                else{
                    for (let i = 0; i < 5; i++)
                        grid[tile.x][i].classList.remove('completedX');
                }

                if (grid[0][tile.y].completed && grid[1][tile.y].completed && grid[2][tile.y].completed && grid[3][tile.y].completed && grid[4][tile.y].completed){
                    for (let i = 0; i < 5; i++)
                        grid[i][tile.y].classList.add('completedY');
                }
                else{
                    for (let i = 0; i < 5; i++)
                        grid[i][tile.y].classList.remove('completedY');
                }

                if (tile.x == tile.y){
                    if  (grid[0][0].completed && grid[1][1].completed && grid[2][2].completed && grid[3][3].completed && grid[4][4].completed){
                        for (let i = 0; i < 5; i++)
                            grid[i][i].classList.add('completedDF');
                    }
                    else{
                        for (let i = 0; i < 5; i++)
                            grid[i][i].classList.remove('completedDF');
                    }
                }

                if (tile.x == 4-tile.y){
                    if (grid[0][4].completed && grid[1][3].completed && grid[2][2].completed && grid[3][1].completed && grid[4][0].completed){
                        for (let i = 0; i < 5; i++)
                            grid[i][4-i].classList.add('completedDR');
                    }
                    else{
                        for (let i = 0; i < 5; i++)
                            grid[i][4-i].classList.remove('completedDR');
                    }
                }
            });
            y++;
        }
        x++;
    }
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}