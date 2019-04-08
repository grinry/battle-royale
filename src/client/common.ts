import { Loader } from './loader';
import { Keyboard } from './keyboard';
import { Game } from './game';

const loader = new Loader();
const keyboard = new Keyboard();
const game = new Game();

window.onload = function() {
  const canvas: any = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // canvas.width = 500;
  // canvas.height = 500;
  const context = canvas.getContext('2d');
  game.run(context);
};
