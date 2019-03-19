import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as socketIo from 'socket.io';

console.log('SERVER INDEX:');

const app = express();
const server = new http.Server(app);
const io = socketIo(server);
app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));
// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '../../static/index.html'));
});
// Starts the server.
server.listen(5000, () => {
  console.log('Starting server on port 5000');
});

const step = 5;
const speed = 0.1;

interface Player {
  x?: number;
  y?: number;
  color?: string;
  movement?: PlayerMovement;
}

interface PlayerMovement {
  up?: boolean;
  down?: boolean;
  left?: boolean;
  right?: boolean;
}

const colors: Array<string> = ['green', 'lime', 'blue', 'red', 'yellow', 'black'];
const players: { [player: string]: Player } = {};
io.on('connection', function(socket: any) {
  socket.on('new player', function() {
    console.log('Player connected.');
    players[socket.id] = {
      x: 300,
      y: 300,
      movement: { left: false, up: false, right: false, down: false },
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  });
  socket.on('movement', function(data: any) {
    const player: Player = players[socket.id] || {};
    player.movement = {
      up: data.up,
      down: data.down,
      right: data.right,
      left: data.left,
    };
    // if (data.left) {
    //     player.x -= 5;
    // }
    // if (data.up) {
    //     player.y -= 5;
    // }
    // if (data.right) {
    //     player.x += 5;
    // }
    // if (data.down) {
    //     player.y += 5;
    // }
  });

  socket.on('disconnect', function() {
    // remove disconnected player
    delete players[socket.id];
  });
});
// setInterval(function() {
//     io.sockets.emit('state', players);
// }, 1000 / 60);

let lastUpdateTime = new Date().getTime();
let fixedTime = 0;
setInterval(function() {
  // code ...
  const currentTime = new Date().getTime();
  fixedTime = currentTime - lastUpdateTime;
  fixedUpdate();
  lastUpdateTime = currentTime;
}, 1000 / 60);

function fixedUpdate() {
  for (let playerId in players) {
    if (players.hasOwnProperty(playerId)) {
      const player = players[playerId];

      if (player.movement.left) {
        player.x -= step * speed * fixedTime;
      }
      if (player.movement.up) {
        player.y -= step * speed * fixedTime;
      }
      if (player.movement.right) {
        player.x += step * speed * fixedTime;
      }
      if (player.movement.down) {
        player.y += step * speed * fixedTime;
      }
    }
  }
  io.sockets.emit('state', players);
}
