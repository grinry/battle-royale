export class Loader {
  images: { [key: string]: HTMLImageElement } = {};
  public loadImage(key: string, src: string): Promise<HTMLImageElement> {
    const img = new Image();
    const d: Promise<HTMLImageElement> = new Promise((resolve, reject) => {
      img.onload = () => {
        this.images[key] = img;
        resolve(img);
      };

      img.onerror = () => {
        reject('Could not load image: ' + src);
      };
    });
    img.src = src;
    return d;
  }
  public getImage(key: string) {
    return key in this.images ? this.images[key] : null;
  }
}

export const LoaderService = new Loader();
