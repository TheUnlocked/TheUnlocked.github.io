from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
import json

games = {}
clients = []

class Game():
    def __init__(self, name, grid, freeSpace, host):
        self.name = name
        self.grid = grid
        self.freeSpace = freeSpace
        self.players = [host]
        self.host = host
        self.tiles = {}

    def propogateBoard(self, sender):
        for player in self.players:
            if player is not sender:
                player.sendGrid(self)

    def propogateTile(self, sender, pos):
        for player in self.players:
            if player is not sender:
                player.sendTile(self, pos)

class BingoClient(WebSocket):
    def handleMessage(self):
        try:
            data = json.loads(self.data)
            if data['message'] == 'joinServer':
                if data['nick'] == '':
                    self.nick = self.address[0]
                else:
                    self.nick = data['nick']
                if data['server'] not in games:
                    self.host = True
                    self.game = Game(data['server'], [], None, self)
                    games[data['server']] = self.game

                else:
                    self.host = False
                    self.game = games[data['server']]
                    self.game.players.append(self)
                    self.sendGrid(self.game)

                self.sendMessage(json.dumps({
                    'message': 'joinPing',
                    'isHost': self.host,
                    'nick': self.nick,
                    'serverName': self.game.name
                }))
            elif data['message'] == 'updateBoard':
                if self.host:
                    self.game.grid = data['board']
                    if 'freeSpace' not in data:
                        data['freeSpace'] = None
                    self.game.freeSpace = data['freeSpace']
                    self.game.tiles = {}
                    self.game.propogateBoard(self)
            elif data['message'] == 'setTile':
                if (data['x'], data['y']) not in self.game.tiles:
                    self.game.tiles[(data['x'], data['y'])] = []
                    self.game.tiles[(data['x'], data['y'])].append(self)
                elif self.nick in self.game.tiles[(data['x'], data['y'])]:
                    if data['state']:
                        self.game.tiles[(data['x'], data['y'])].append(self)
                    else:
                        self.game.tiles[(data['x'], data['y'])].remove(self)
                else:
                    if data['state']:
                        self.game.tiles[(data['x'], data['y'])].append(self)
                    else:
                        self.game.tiles[(data['x'], data['y'])].remove(self)
                self.game.propogateTile(self, (data['x'], data['y']))
        except Exception as e:
            print(e)

    def sendGrid(self, game):
        self.sendMessage(json.dumps({
            'message': 'updateBoard',
            'board': game.grid,
            'freeSpace': game.freeSpace,
            'tiles': dict([(str(key[0]) + "," + str(key[1]), [player.nick for player in game.tiles[key]]) for key in game.tiles])
        }))

    def sendTile(self, game, pos):
        self.sendMessage(json.dumps({
            'message': 'updateTile',
            'x': pos[0],
            'y': pos[1],
            'playersCompleted': [player.nick for player in game.tiles[pos] if player is not self]
        }))

    def handleConnected(self):
        clients.append(self)
        print(self.address, 'connected')

    def handleClose(self):
        try:
            clients.remove(self)
            self.game.players.remove(self)
            if self.host:
                if len(self.game.players) == 0:
                    del games[self.game.name]
                    print("All players left, deleting game " + self.game.name)
                else:
                    self.game.host = self.game.players[0]
                    self.game.host.host = True
                    self.game.host.sendMessage(json.dumps({
                        'message': 'joinPing',
                        'isHost': True,
                        'nick': self.game.host.nick,
                        'serverName': self.game.name
                    }))
                    print("Host left game " + self.game.name + ", reassigning host")
            print(self.address, 'closed')
        except Exception as e:
            print(e)

server = SimpleWebSocketServer('', 8000, BingoClient)
server.serveforever()