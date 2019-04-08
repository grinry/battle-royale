import { LoaderService } from './loader';
import { KeyboardKeys, KeyboardService } from './keyboard';
import { Camera, map } from './camera';

export class Game {
  ctx: any;
  tileAtlas: HTMLImageElement;
  camera: any;
  private _previousElapsed: number;

  public run(context: HTMLCanvasElement) {
    this.ctx = context;
    this.ctx.scale(0.5, 0.5);
    this._previousElapsed = 0;

    const p = this.load();
    Promise.all(p).then(loaded => {
      this.init();
      window.requestAnimationFrame(this.tick);
    });
  }

  tick = (elapsed: number) => {
    window.requestAnimationFrame(this.tick);

    this.ctx.clearRect(0, 0, 2 * window.innerWidth - 100, 2 * window.innerHeight - 100);

    let delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    this._previousElapsed = elapsed;

    this.update(delta);
    this.render();
  };

  public init() {
    KeyboardService.listenForEvents([KeyboardKeys.LEFT, KeyboardKeys.RIGHT, KeyboardKeys.UP, KeyboardKeys.DOWN]);
    this.tileAtlas = LoaderService.getImage('tiles');
    // this.camera = new Camera(map, 500, 500);
    this.camera = new Camera(map, 2 * window.innerWidth + 100, 2 * window.innerHeight + 100);
  }

  public update(delta: any) {
    // handle camera movement with arrow keys
    var dirx = 0;
    var diry = 0;
    if (KeyboardService.isDown(KeyboardKeys.LEFT)) {
      dirx = -1;
    }
    if (KeyboardService.isDown(KeyboardKeys.RIGHT)) {
      dirx = 1;
    }
    if (KeyboardService.isDown(KeyboardKeys.UP)) {
      diry = -1;
    }
    if (KeyboardService.isDown(KeyboardKeys.DOWN)) {
      diry = 1;
    }

    this.camera.move(delta, dirx, diry);
  }

  public render() {
    this._drawLayer(0);
    this._drawLayer(1);
  }

  public load() {
    return [LoaderService.loadImage('tiles', '../assets/tiles.png')];
  }

  private _drawLayer(layer: number) {
    var startCol = Math.floor(this.camera.x / map.tsize);
    var endCol = startCol + this.camera.width / map.tsize;
    var startRow = Math.floor(this.camera.y / map.tsize);
    var endRow = startRow + this.camera.height / map.tsize;
    var offsetX = -this.camera.x + startCol * map.tsize;
    var offsetY = -this.camera.y + startRow * map.tsize;

    for (var c = startCol; c <= endCol; c++) {
      for (var r = startRow; r <= endRow; r++) {
        var tile = map.getTile(layer, c, r);
        var x = (c - startCol) * map.tsize + offsetX;
        var y = (r - startRow) * map.tsize + offsetY;
        if (tile !== 0) {
          // 0 => empty tile
          this.ctx.drawImage(
            this.tileAtlas, // image
            (tile - 1) * map.tsize, // source x
            0, // source y
            map.tsize, // source width
            map.tsize, // source height
            Math.round(x), // target x
            Math.round(y), // target y
            map.tsize, // target width
            map.tsize // target height
          );
        }
      }
    }
  }
}

export const GameService = new Game();
