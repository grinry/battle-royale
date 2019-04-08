export enum KeyboardKeys {
  LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40,
}

export class Keyboard {
  private _keys: { [key: number]: boolean } = {};
  public listenForEvents(keys: Array<KeyboardKeys>) {
    window.addEventListener('keydown', this._onKeyDown.bind(this));
    window.addEventListener('keyup', this._onKeyUp.bind(this));

    keys.forEach((key: KeyboardKeys) => {
      this._keys[key] = false;
    });
  }

  public isDown(keyCode: number) {
    if (!(keyCode in this._keys)) {
      throw new Error('Keycode ' + keyCode + ' is not being listened to');
    }
    return this._keys[keyCode];
  }

  private _onKeyDown(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    if (keyCode in this._keys) {
      event.preventDefault();
      this._keys[keyCode] = true;
    }
  }

  private _onKeyUp(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    if (keyCode in this._keys) {
      event.preventDefault();
      this._keys[keyCode] = false;
    }
  }
}

export const KeyboardService = new Keyboard();
