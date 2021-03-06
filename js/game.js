class Mino {

  static randomizer = this.getRandomizer();

  static get TYPE_LIST() {
    return [
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
  }

  static get MAX_SIZE() {
    let max = 0;
    for (const type of this.TYPE_LIST) {
      if (max < type.length) max = type.length;
    }
    return max;
  }

  /**
   * @param {number} index
   * @returns {number[][]}
   */
  static getNextByIndex(index) {
    index = Number(index);
    return this.TYPE_LIST[index].map(arr => arr.map(val => val * (index + 1)));
  }

  static getNext() {
    const index = this.getNextIndex();
    const next = this.getNextByIndex(index);
    return next;
  }

  static getNextIndex() {
    return Number(this.randomizer.next().value);
  }

  static *getRandomizer() {
    while (true) {
      const keys = [...Object.keys(this.TYPE_LIST)];
      for (let i = keys.length; 1 < i; i--) {
        const k = Math.floor(Math.random() * i);
        [keys[k], keys[i - 1]] = [keys[i - 1], keys[k]];
      }
      yield* keys;
    }
  }

  /**
   * ミノクラス
   * @param {Mino} mino 
   */
  constructor(mino) {
    if (mino) {
      this.index = mino.index;
      this.tbl = mino.tbl;
      this._angle = mino._angle;
      this.position = mino.position;
      return;
    }

    this.index = Mino.getNextIndex();
    this.tbl = Mino.getNextByIndex(this.index);
    this._angle = 0;
  }

  set angle(value) {
    if (value !== -90 && value !== 90) return;
    const dummyTbl = [];
    for (let y = 0; y < this.tbl.length; y++) {
      dummyTbl[y] = [];
      for (let x = 0; x < this.tbl[y].length; x++) {
        if (value === -90) {
          dummyTbl[y][x] = this.tbl[x][this.tbl[y].length - y - 1];
        } else if (value === 90) {
          dummyTbl[y][x] = this.tbl[this.tbl.length - x - 1][y];
        }
      }
    }
    this.tbl = dummyTbl;
    this._angle += value;
    if (this._angle < 0) {
      this._angle = 270;
    } else if (this._angle >= 360) {
      this._angle = 0;
    }
  }

  get angle() {
    return this._angle;
  }

  clone() {
    return new Mino(this);
  }

  rotate(dir) {
    if (dir === "LEFT") {
      this.angle = -90;
    } else if (dir === "RIGHT") {
      this.angle = 90;
    }
  }

  getSize() {
    return this.tbl.length;
  }

  getTypeIndex() {
    return this.index;
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
  static get MOVE_PATTERN() {
    return [
      {
        0: {
          LEFT: [Vector2.ZERO, Vector2.LEFT, Vector2.RIGHT.times(2), Vector2.add(Vector2.LEFT, Vector2.UP.times(2)), Vector2.add(Vector2.RIGHT.times(2), Vector2.DOWN)],
          RIGHT: [Vector2.ZERO, Vector2.LEFT.times(2), Vector2.RIGHT, Vector2.add(Vector2.LEFT.times(2), Vector2.DOWN), Vector2.add(Vector2.RIGHT, Vector2.UP.times(2))],
        },
        90: {
          LEFT: [Vector2.ZERO, Vector2.RIGHT.times(2), Vector2.LEFT, Vector2.add(Vector2.RIGHT.times(2), Vector2.UP), Vector2.add(Vector2.LEFT, Vector2.DOWN.times(2))],
          RIGHT: [Vector2.ZERO, Vector2.LEFT, Vector2.RIGHT.times(2), Vector2.add(Vector2.LEFT, Vector2.UP.times(2)), Vector2.add(Vector2.RIGHT.times(2), Vector2.DOWN)],
        },
        180: {
          LEFT: [Vector2.ZERO, Vector2.RIGHT, Vector2.LEFT.times(2), Vector2.add(Vector2.RIGHT, Vector2.DOWN.times(2)), Vector2.add(Vector2.LEFT.times(2), Vector2.UP)],
          RIGHT: [Vector2.ZERO, Vector2.RIGHT.times(2), Vector2.LEFT, Vector2.add(Vector2.RIGHT.times(2), Vector2.UP), Vector2.add(Vector2.LEFT, Vector2.DOWN.times(2))],
        },
        270: {
          LEFT: [Vector2.ZERO, Vector2.RIGHT, Vector2.LEFT.times(2), Vector2.add(Vector2.LEFT.times(2), Vector2.DOWN), Vector2.add(Vector2.RIGHT, Vector2.UP.times(2))],
          RIGHT: [Vector2.ZERO, Vector2.LEFT.times(2), Vector2.RIGHT, Vector2.add(Vector2.RIGHT, Vector2.DOWN.times(2)), Vector2.add(Vector2.LEFT.times(2), Vector2.UP)],
        },
      },
      {
        0: {
          LEFT: [Vector2.ZERO, Vector2.RIGHT, Vector2.RIGHT_UP, Vector2.DOWN.times(2), Vector2.add(Vector2.RIGHT, Vector2.DOWN.times(2))],
          RIGHT: [Vector2.ZERO, Vector2.LEFT, Vector2.ONE.inverse, Vector2.DOWN.times(2), Vector2.add(Vector2.LEFT, Vector2.DOWN.times(2))],
        },
        90: {
          LEFT: [Vector2.ZERO, Vector2.RIGHT, Vector2.ONE, Vector2.UP.times(2), Vector2.add(Vector2.RIGHT, Vector2.UP.times(2))],
          RIGHT: [Vector2.ZERO, Vector2.RIGHT, Vector2.ONE, Vector2.UP.times(2), Vector2.add(Vector2.RIGHT, Vector2.UP.times(2))],
        },
        180: {
          LEFT: [Vector2.ZERO, Vector2.LEFT, Vector2.ONE.inverse, Vector2.DOWN.times(2), Vector2.add(Vector2.LEFT, Vector2.DOWN.times(2))],
          RIGHT: [Vector2.ZERO, Vector2.RIGHT, Vector2.RIGHT_UP, Vector2.DOWN.times(2), Vector2.add(Vector2.RIGHT, Vector2.DOWN.times(2))],
        },
        270: {
          LEFT: [Vector2.ZERO, Vector2.LEFT, Vector2.LEFT_DOWN, Vector2.UP.times(2), Vector2.add(Vector2.LEFT, Vector2.UP.times(2))],
          RIGHT: [Vector2.ZERO, Vector2.LEFT, Vector2.LEFT_DOWN, Vector2.UP.times(2), Vector2.add(Vector2.LEFT, Vector2.UP.times(2))],
        },
      },
    ];
  }

  /**
   * フィールドクラス
   * @param {number} col 
   * @param {number} row 
   * @param {number} nextCount 
   */
  constructor(col, row, nextCount) {
    this.col = col;
    this.row = row + Mino.MAX_SIZE;
    this.nextCount = nextCount;

    this.tbl = [...Array(this.row)].map(() => Array(this.col).fill(0));
    this.mino = new Mino();
    this.nextMinoArray = [...Array(this.nextCount)].map(() => new Mino());

    this.setStartPosition();
  }

  setStartPosition(mino = this.mino) {
    this.mino.position = this.getStartPosition(mino);
  }

  getStartPosition(mino = this.mino) {
    const minoSize = mino.getSize();
    const fieldCenter = Math.floor(this.col / 2);
    const minoCenter = Math.ceil(minoSize / 2);
    return new Vector2(fieldCenter - minoCenter, 2);
  }

  getPositionBlock(x, y) {
    return this.tbl[y][x];
  }

  getNextMinoArray() {
    return this.nextMinoArray;
  }

  rotateMino(dir) {
    dir = dir.toUpperCase();
    const dummyMino = this.mino.clone();
    dummyMino.rotate(dir);

    let patternList;
    const movePattern = Field.MOVE_PATTERN;
    if (dummyMino.getTypeIndex() === 0) {
      patternList = movePattern[0][this.mino.angle][dir];
    } else {
      patternList = movePattern[1][this.mino.angle][dir];
    }

    for (const vector of patternList) {
      if (this.checkMove(vector, dummyMino)) {
        this.mino.position.add(vector);
        this.mino = dummyMino;
        return;
      }
    }
  }

  moveMino(dir) {
    dir = dir.toUpperCase();
    if (dir === "LEFT") {
      if (this.checkMove(Vector2.LEFT)) {
        this.mino.position.add(Vector2.LEFT);
      }
    } else if (dir === "RIGHT") {
      if (this.checkMove(Vector2.RIGHT)) {
        this.mino.position.add(Vector2.RIGHT);
      }
    }
  }

  down() {
    if (this.checkMove(Vector2.DOWN)) {
      this.mino.position.add(Vector2.DOWN);
      return false;
    } else {
      this.fixation();
      return true;
    }
  }

  checkMove(vector, mino = this.mino) {
    const position = this.mino.position.clone().add(vector);
    return this.fieldCheck(position, mino);
  }

  fieldCheck(position, mino) {
    const minoSize = mino.getSize();
    for (let yy = 0; yy < minoSize; yy++) {
      for (let xx = 0; xx < minoSize; xx++) {
        if (mino.getPointBlock(xx, yy)) {
          if (position.x + xx < 0 || position.x + xx >= this.col || position.y + yy >= this.row) {
            return false;
          } else if (this.tbl[position.y + yy][position.x + xx]) {
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
          if (this.mino.position.y + y >= 0) {
            this.tbl[this.mino.position.y + y][this.mino.position.x + x] =
              this.mino.getPointBlock(x, y);
          }
        }
      }
    }
    // ラインチェック
    this.lineCount = 0;
    for (let y = 0; y < this.row; y++) {
      let lineFlg = true;
      for (let x = 0; x < this.col; x++) {
        if (this.getPositionBlock(x, y) <= 0) {
          lineFlg = false;
          break;
        }
      }
      if (lineFlg) {
        for (let i = y; i > 0; i--) {
          for (let j = 0; j < this.col; j++) {
            this.tbl[i][j] = this.tbl[i - 1][j];
          }
        }
        for (let j = 0; j < this.col; j++) {
          this.tbl[0][j] = 0;
        }
        this.lineCount++;
      }
    }

    // テトリミノを非表示
    this.mino.position.y = this.row + 1;

    const next = this.nextMinoArray[0];
    const startPosition = this.getStartPosition(next);
    if (!this.gameOverFlg && !this.fieldCheck(startPosition, next)) {
      // 次に出てくるテトリミノと重なる場合はゲームオーバー
      this.gameOverFlg = true;
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
    this.nextMinoArray[this.nextMinoArray.length - 1] = new Mino();
    this.setStartPosition();
  }
}

class View {
  static get COLOR_LIST() {
    return [
      "deepskyblue",
      "orange",
      "blue",
      "violet",
      "yellow",
      "orangered",
      "lime",
    ];
  }

  /**
   * 表示クラス
   * @param {HTMLCanvasElement} canvas 
   * @param {number} width 
   * @param {number} height 
   * @param {number} nextCount 
   */
  constructor(canvas, width, height, nextCount) {
    this.canvas = canvas;
    this.virtualCanvas = document.createElement('canvas');
    this.width = width;
    this.height = height;
    this.nextCount = nextCount;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');

    this.fieldRect = new Rectangle(
      0, Const.BLOCK_SIZE * Mino.MAX_SIZE + Const.BLOCK_SIZE * 0.7,
      Const.BLOCK_SIZE * Const.FIELD_COL, Const.BLOCK_SIZE * (Const.FIELD_ROW + Mino.MAX_SIZE)
    );
    this.virtualCanvas.width = this.fieldRect.right;
    this.virtualCanvas.height = this.fieldRect.bottom;
  }

  /**
   * ブロック描画
   * @param {CanvasRenderingContext2D} ctx 
   * @param {Vector2} position 
   * @param {CanvasFillStrokeStyles} fillStyle 
   * @param {CanvasCompositing} alpha 
   */
  drawBlock(ctx, position, fillStyle, alpha = 1) {
    const g = ctx;
    const x = position.x;
    const y = position.y;
    g.save();
    g.fillStyle = fillStyle;
    g.globalAlpha = alpha;
    g.fillRect(x * Const.BLOCK_SIZE, y * Const.BLOCK_SIZE, Const.BLOCK_SIZE, Const.BLOCK_SIZE);
    g.lineWidth = 2;
    g.globalAlpha = 1;
    g.strokeStyle = "white";
    g.strokeRect(x * Const.BLOCK_SIZE, y * Const.BLOCK_SIZE, Const.BLOCK_SIZE, Const.BLOCK_SIZE);
    g.restore();
  }

  /**
   * フィールド描画
   * @param {Field} field
   */
  drawField(field) {
    // 仮想キャンバスを取得
    const fieldCanvas = this.virtualCanvas;
    const g = fieldCanvas.getContext('2d');
    // 仮想キャンバスをクリア
    g.clearRect(0, 0, fieldCanvas.width, fieldCanvas.height);
    // フィールドを描画
    for (const v = Vector2.ZERO; v.y < field.row; v.y++) {
      for (v.x = 0; v.x < field.col; v.x++) {
        if (field.getPositionBlock(v.x, v.y)) {
          const color = View.COLOR_LIST[field.getPositionBlock(v.x, v.y) - 1];
          this.drawBlock(g, v, color);
        } else {
          const color = "rgba(0, 0, 0, 0)";
          this.drawBlock(g, v, color);
        }
      }
    }
    // 操作中ミノの影表示位置を算出
    const shadowPosition = Vector2.ZERO;
    while (field.checkMove(Vector2.add(shadowPosition, Vector2.DOWN))) {
      shadowPosition.add(Vector2.DOWN);
    }
    // 操作中ミノと影を描画
    const mino = field.mino;
    const minoSize = mino.getSize();
    for (const v = Vector2.ZERO; v.y < minoSize; v.y++) {
      for (v.x = 0; v.x < minoSize; v.x++) {
        if (mino.getPointBlock(v.x, v.y)) {
          const color = View.COLOR_LIST[mino.getPointBlock(v.x, v.y) - 1];
          const position = Vector2.add(mino.position, v);
          this.drawBlock(g, position, color);
          this.drawBlock(g, position.add(shadowPosition), color, Const.SHADOW_ALPHA);
        }
      }
    }
    // 実際のキャンバスに転写
    this.draw();
    const fx = 0;
    const fy = Const.BLOCK_SIZE * Mino.MAX_SIZE - Const.BLOCK_SIZE * 0.3;
    const fw = fieldCanvas.width;
    const fh = fieldCanvas.height - fy;
    const vx = this.canvas.width / 2 - fw / 2;
    const vy = this.canvas.height / 2 - fh / 2;
    const fieldRect = new Rectangle(fx, fy, fw, fh);
    const viewRect = new Rectangle(vx, vy, fw, fh);
    this.drawImage(this.context, fieldCanvas, fieldRect, viewRect);
  }

  draw() {
    const g = this.context;
    g.save();
    g.fillStyle = "black";
    g.fillRect(0, 0, this.canvas.width, this.canvas.height);
    g.restore();
  }

  /**
   * 画像描画
   * @param {CanvasDrawImage} ctx
   * @param {CanvasImageSource} img
   * @param {Rectangle} rect1
   * @param {Rectangle} rect2
   */
  drawImage(ctx, img, rect1, rect2) {
    ctx.drawImage(img,
      rect1.left, rect1.top, rect1.right, rect1.bottom,
      rect2.left, rect2.top, rect2.right, rect2.bottom);
  }
}

class Game {

  /**
   * ゲームクラス
   */
  constructor() {
    this.view = new View(
      Const.MAIN_CANVAS,
      window.innerWidth,
      window.innerHeight,
      Const.NEXT_COUNT
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
    this.nextTime = 0;
  }

  start() {
    clearTimeout(this.downTimeout);
    clearTimeout(this.nextTimeout);
    this.field = new Field(
      Const.FIELD_COL,
      Const.FIELD_ROW,
      Const.NEXT_COUNT
    );
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
    dir = dir.toUpperCase();
    if (!this.stopFlg) {
      if (dir === 'DOWN') {
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

  hardDrop() {
    clearTimeout(this.downTimeout);
    const self = this;
    while (!this.field.down()) {
      this.score++;
    }
    this.stopFlg = true;
    this.nextTimeout = setTimeout(() => {
      self.next();
    }, this.nextTime);
  }

  next() {
    clearTimeout(this.nextTimeout);
    this.stopFlg = false;
    this.field.next();
    this.view.drawField(this.field);
    const self = this;
    this.downTimeout = setTimeout(() => {
      self.down();
    }, this.downTime);
  }
}
