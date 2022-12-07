export class StarRatingHelper {
  static getStarRating(id: number): 1 | 2 | 3 | 4 | 5 {
    if (id === 110 || id === 210 || id === 310 || id === 410 || id === 610 || id === 710) {
      return 1;
    } else if (id === 115 || id === 220 || id === 320 || id === 420 || id === 620 || id === 720) {
      return 2;
    } else if (id === 120 || id === 230 || id === 330 || id === 430 || id === 630 || id === 730) {
      return 3;
    } else if (id === 130 || id === 240 || id === 340 || id === 440 || id === 640 || id === 740) {
      return 4;
    } else if (id === 150 || id === 250 || id === 350 || id === 450 || id === 650 || id === 750) {
      return 5;
    }
  }
}
