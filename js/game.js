class Mino {

  static randomTypeIndex = this.getRandomTypeIndexGenerator();

  static getTypeArray() {
    const array = [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [1, 1],
        [1, 1],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
    ];
    return array;
  }

  /**
   * @param {number} index
   * @returns {number[][]}
   */
  static getNextByIndex(index) {
    return this.getTypeArray()[index].map(arr => arr.map(val => val * (Number(index) + 1)));
  }

  static getNext() {
    const typeIndex = this.getNextTypeIndex();
    const nextType = this.getNextByIndex(typeIndex);
    return nextType;
  }

  static getNextTypeIndex() {
    return this.randomTypeIndex.next().value;
  }

  static *getRandomTypeIndexGenerator() {
    while (true) {
      const keys = [...Object.keys(this.getTypeArray())];
      for (let i = keys.length; 1 < i; i--) {
        const k = Math.floor(Math.random() * i);
        [keys[k], keys[i - 1]] = [keys[i - 1], keys[k]];
      }
      yield* keys;
    }
  }

  constructor(mino) {
    if (mino) {
      this.tbl = mino.tbl;
      return;
    }

    this.typeIndex = this.constructor.getNextTypeIndex();
    this.tbl = this.constructor.getNextByIndex(this.typeIndex);
    this._angle = 0;
  }

  set angle(value) {
    this._angle += value;
    if (this._angle < 0) {
      this._angle = 270;
    } else if (this._angle > 360) {
      this._angle = 90;
    }
  }

  get angle() {
    return this._angle;
  }

  clone() {
    return new this.constructor(this);
  }

  rotate(dir) {
    const dummyTbl = [];
    for (let y = 0; y < this.tbl.length; y++) {
      dummyTbl[y] = [];
      for (let x = 0; x < this.tbl[y].length; x++) {
        if (dir === "left") {
          this.angle = -90;
          dummyTbl[y][x] = this.tbl[x][this.tbl[y].length - y - 1];
        } else if (dir === "right") {
          this.angle = 90;
          dummyTbl[y][x] = this.tbl[this.tbl.length - x - 1][y];
        }
      }
    }
    this.tbl = dummyTbl;
  }

  getSize() {
    return this.tbl.length;
  }

  getTypeIndex() {
    return this.typeIndex;
  }

  /**
   * 指定座標ブロック取得
   * @param {number} x 
   * @param {number} y 
   * @returns {number}
   */
  getPointBlock(x, y) {
    return this.tbl[y][x];
  }
}

class Field {
  constructor(width, height, nextCount, minoClass) {
    this.width = width;
    this.height = height;
    this.nextCount = nextCount;
    this.minoClass = minoClass;

    this.tbl = [...Array(height)].map(() => Array(width).fill(0));
    this.mino = new minoClass();
    this.nextMinoArray = [...Array(nextCount)].map(() => new minoClass());

    this.setStartPosition();
  }

  setStartPosition() {
    const minoSize = this.mino.getSize();
    const fieldCenter = Math.floor(this.width / 2);
    const minoCenter = Math.ceil(minoSize / 2);
    this.positionX = fieldCenter - minoCenter;
    this.positionY = -1;
  }

  getPositionBlock(x, y) {
    if (
      this.positionX <= x &&
      x < this.positionX + this.mino.getSize() &&
      this.positionY <= y &&
      y < this.positionY + this.mino.getSize() &&
      this.mino.getPointBlock(x - this.positionX, y - this.positionY)
    ) {
      return this.mino.getPointBlock(x - this.positionX, y - this.positionY);
    }
    return this.tbl[y][x];
  }

  getNextMinoArray() {
    return this.nextMinoArray;
  }

  rotateMino(dir) {
    const dummyMino = this.mino.clone();
    dummyMino.rotate(dir);
    if (this.fieldCheck(this.positionX, this.positionY, dummyMino)) {
      this.mino = dummyMino;
    }
  }

  moveMino(dir) {
    if (dir === "left") {
      if (this.fieldCheck(this.positionX - 1, this.positionY, this.mino)) {
        this.positionX -= 1;
      }
    } else if (dir === "right") {
      if (this.fieldCheck(this.positionX + 1, this.positionY, this.mino)) {
        this.positionX += 1;
      }
    }
  }

  down() {
    if (this.fieldCheck(this.positionX, this.positionY + 1, this.mino)) {
      this.positionY += 1;
      return false;
    } else {
      this.fixation();
      return true;
    }
  }

  /**
   * フィールドチェック
   * @param {number} x 
   * @param {number} y 
   * @param {Mino} mino 
   * @returns {boolean} 判定結果
   */
  fieldCheck(x, y, mino) {
    const minoSize = mino.getSize();
    for (let yy = 0; yy < minoSize; yy++) {
      for (let xx = 0; xx < minoSize; xx++) {
        if (mino.getPointBlock(xx, yy)) {
          if (x + xx < 0 || x + xx >= this.width || y + yy >= this.height) {
            return false;
          } else if (this.tbl[y + yy][x + xx]) {
            return false;
          }
        }
      }
    }
    return true;
  }

  fixation() {
    const minoSize = this.mino.getSize();
    for (let y = 0; y < minoSize; y++) {
      for (let x = 0; x < minoSize; x++) {
        if (this.mino.getPointBlock(x, y)) {
          if (this.positionY + y >= 0) {
            this.tbl[this.positionY + y][this.positionX + x] =
              this.mino.getPointBlock(x, y);
          }
        }
      }
    }
  }

  getLineCount() {
    return this.lineCount;
  }

  next() {
    this.mino = this.nextMinoArray[0];
    for (let i = 0; i < this.nextMinoArray.length - 1; i++) {
      this.nextMinoArray[i] = this.nextMinoArray[i + 1];
    }
    this.nextMinoArray[this.nextMinoArray.length - 1] = new this.minoClass();
    this.setStartPosition();
  }
}

class View {
  static getTypeColorArray() {
    return [
      "skyblue",
      "orange",
      "blue",
      "purple",
      "yellow",
      "red",
      "lightgreen",
    ];
  }
  constructor(canvas, width, height, nextCount, minoClass) {
    this.canvas = canvas;
    this.virtualCanvas = document.createElement("canvas");
    this.width = width;
    this.height = height;
    this.nextCount = nextCount;
    this.minoClass = minoClass;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.virtualCanvas.width = this.width;
    this.virtualCanvas.height = this.height;
    this.context = this.canvas.getContext("2d");

    this.draw();
  }

  draw() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // this.drawField();
    // this.drawMino();
  }

  /**
   * フィールド描画
   * @param {Field} field 
   */
  drawField(field) {
    const g = this.context;
    g.fillStyle = "black";
    g.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const typeColorArray = this.constructor.getTypeColorArray();
    const color = typeColorArray[field.mino.typeIndex];
    const BLOCK_SIZE = 30;
    g.strokeStyle = "white";
    g.lineWidth = 2;
    for (let y = 0; y < field.height; y++) {
      for (let x = 0; x < field.width; x++) {
        if (field.getPositionBlock(x, y)) {
          g.fillStyle = typeColorArray[field.getPositionBlock(x, y) - 1];
          g.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          g.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        } else {
          g.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
      }
    }
  }

  drawBlock() {

  }
}

class Game {

  static get minoClass() {
    return Mino;
  }

  static get fieldClass() {
    return Field;
  }

  static get viewClass() {
    return View;
  }

  static get width() {
    return 10;
  }

  static get height() {
    return 20;
  }

  static get nextCount() {
    return 6;
  }

  static get canvas() {
    return document.getElementById("game-view");
  }

  constructor() {
    const viewClass = this.constructor.viewClass;
    this.view = new viewClass(
      this.constructor.canvas,
      // this.constructor.width,
      // this.constructor.height,
      window.innerWidth, window.innerHeight,
      this.constructor.nextCount,
      this.constructor.minoClass
    );
    this.startSettings();
    this.stopFlg = true;
    this.start();
  }

  startSettings() {
    this.score = 0;
    this.line = 0;
    this.level = 1;
    this.downTime = 800;
    this.nextTime = 500;
  }

  start() {
    clearTimeout(this.downTimeout);
    clearTimeout(this.nextTimeout);
    const fieldClass = this.constructor.fieldClass;
    this.field = new fieldClass(this.constructor.width, this.constructor.height, this.constructor.nextCount, this.constructor.minoClass);
    this.startSettings();
    this.stopFlg = false;

    this.view.drawField(this.field);

    const self = this;
    this.downTimeout = setTimeout(() => {
      self.down();
    }, this.downTime);
  }

  rotateMino(dir) {
    if (!this.stopFlg) {
      this.field.rotateMino(dir);
      this.view.drawField(this.field);
    }
  }

  moveMino(dir) {
    if (!this.stopFlg) {
      if (dir === 'down') {
        this.down();
        return;
      }
      this.field.moveMino(dir);
      this.view.drawField(this.field);
    }
  }

  down() {
    clearTimeout(this.downTimeout);
    const self = this;
    if (this.field.down()) {
      this.stopFlg = true;
      this.nextTimeout = setTimeout(() => {
        self.next();
      }, this.nextTime);
    } else {
      this.view.drawField(this.field);
      this.downTimeout = setTimeout(() => {
        self.down();
      }, this.downTime);
    }
  }

  next() {
    clearTimeout(this.nextTimeout);
    this.stopFlg = false;
    this.field.next();
    this.view.drawField(this.field);
    const self = this;
    this.downTime = setTimeout(() => {
      self.down();
    }, this.downTime);
  }
}
