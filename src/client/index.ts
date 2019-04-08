// import * as io from 'socket.io-client';
//
// var socket = io('http://localhost:5000/');
// socket.on('message', function(data: any) {
//   console.log(data);
// });
//
// var movement = {
//   up: false,
//   down: false,
//   left: false,
//   right: false,
// };
//
// document.addEventListener('keydown', function(event: any) {
//   switch (event.keyCode) {
//     case 65: // A
//       movement.left = true;
//       break;
//     case 87: // W
//       movement.up = true;
//       break;
//     case 68: // D
//       movement.right = true;
//       break;
//     case 83: // S
//       movement.down = true;
//       break;
//   }
// });
// document.addEventListener('keyup', function(event: any) {
//   switch (event.keyCode) {
//     case 65: // A
//       movement.left = false;
//       break;
//     case 87: // W
//       movement.up = false;
//       break;
//     case 68: // D
//       movement.right = false;
//       break;
//     case 83: // S
//       movement.down = false;
//       break;
//   }
// });
//
// socket.emit('new player');
// setInterval(function() {
//   socket.emit('movement', movement);
// }, 1000 / 60);
//
const canvas: any = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.width = 500;
// canvas.height = 500;
const context = canvas.getContext('2d');
// context.font = '20px Georgia';
// socket.on('state', function(players: Array<any>) {
//   context.clearRect(0, 0, 800, 600);
//   for (var id in players) {
//     var player = players[id];
//     context.fillStyle = player.color;
//     context.beginPath();
//     context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
//     context.fill();
//
//     context.fillText(`x: ${player.x}, y: ${player.y}`, player.x, player.y);
//   }
// });

import { Loader } from './loader';
import { Keyboard } from './keyboard';
import { Game } from './game';

const game = new Game();

window.onload = function() {
  game.run(context);
};
