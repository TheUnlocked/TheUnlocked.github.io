let ws = {isHost: false};

function connect(){
    if (document.getElementById('server-name').value.length < 3){
        return;
    }
    if (ws.readyState)
        ws.close();
    if (window.location.protocol == "file:"){
        ws = new WebSocket('wss://localhost:443');
    }
    else{
        ws = new WebSocket('wss://104.196.103.122:443');
    }
    ws.onopen = onConnect;
    ws.onmessage = messageDispatch;
}

function onConnect(e){
    ws.nick = document.getElementById('server-nick').value;
    ws.send(JSON.stringify({
        message: "joinServer",
        server: document.getElementById('server-name').value,
        nick: ws.nick
    }));
}

function sendGrid(grid, {free} = {}){
    ws.send(JSON.stringify({
        message: "updateBoard",
        board: grid,
        freeSpace: free
    }));
}

function sendSetTile(x, y, state){
    ws.send(JSON.stringify({
        message: "setTile",
        state: state,
        x: x,
        y: y
    }));
}

function messageDispatch(e){
    let data = JSON.parse(e.data);
    switch(data.message){
        case "joinPing":
            ws.isHost = data.isHost;
            document.getElementById('nickname-label').innerHTML = 'Username: ' + data.nick.replace(/</g, '&lt');
            if (ws.isHost){
                document.getElementById('nickname-label').innerHTML += ' (Host)';
                document.getElementById('regenerate-button').style.display = '';
                if(grid.length != 0){
                    sendGrid(grid, freeSpace);
                }
            }
            else{
                document.getElementById('regenerate-button').style.display = 'none';
            }
            document.getElementById('server-name-label').innerHTML = 'Server Name: ' + data.serverName.replace(/</g, '&lt');
            document.getElementById('server-nick').style.display = 'none';
            document.getElementById('server-name').style.display = 'none';
            document.getElementById('connect').style.display = 'none';
            break;
        case "updateTile":
            board[data.x][data.y].playersCompleted.innerHTML = data.playersCompleted.join('<br>');
            break;
        case "updateBoard":
            if (data.board.length == 0){
                for(let col of board)
                {
                    for (let tile of col){
                        tile.className = "";
                        tile.innerHTML = "";
                    }
                }
            }
            generateBoard(data.board, {free: data.freeSpace});
            for(let posStr of Object.keys(data.tiles)){
                let pos = posStr.split(',');
                let completeds = data.tiles[posStr];
                if (completeds.includes(ws.nick)){
                    completeds = completeds.splice(completeds.indexOf(ws.nick), 1);
                    toggleTile(board[pos[0]][pos[1]], false);
                }
                board[pos[0]][pos[1]].playersCompleted.innerHTML = data.tiles[posStr].join('<br>');
            }
            break;
    }
}