class Vector2 {
  static add(v1, v2) {
    return v1.clone().add(v2);
  }

  static sub(v1, v2) {
    return v1.clone().sub(v2);
  }

  static times(v1, num) {
    return v1.clone().times(num);
  }

  static dot(v1, v2) {
    return (v1.x * v2.x + v1.y * v2.y);
  }

  static cross(v1, v2) {
    return (v1.x * v2.y - v1.y * v2.x);
  }

  static distance(v1, v2) {
    return Vector2.sub(v1, v2).magnitude;
  }

  static isParallel(v1, v2) {
    return (Vector2.cross(v1, v2) === 0);
  }

  static isVertical(v1, v2) {
    return (Vector2.dot(v1, v2) === 0);
  }

  /**
   * @returns {Vector2} Vector2(0, 0)
   */
  static get ZERO() {
    return new Vector2(0, 0);
  }

  /**
   * @returns {Vector2} Vector2(1, 1)
   */
  static get ONE() {
    return new Vector2(1, 1);
  }

  /**
   * @returns {Vector2} Vector2(1, 0)
   */
  static get RIGHT() {
    return new Vector2(1, 0);
  }

  /**
   * @returns {Vector2} Vector2(-1, 0)
   */
  static get LEFT() {
    return new Vector2(-1, 0);
  }

  /**
   * @returns {Vector2} Vector2(0, -1)
   */
  static get UP() {
    return new Vector2(0, -1);
  }

  /**
   * @returns {Vector2} Vector2(0, 1)
   */
  static get DOWN() {
    return new Vector2(0, 1);
  }

  /**
   * @returns {Vector2} Vector2(1, -1)
   */
  static get RIGHT_UP() {
    return new Vector2(1, -1);
  }

  /**
   * @returns {Vector2} Vector2(1, 1)
   */
  static get RIGHT_DOWN() {
    return new Vector2(1, 1);
  }

  /**
   * @returns {Vector2} Vector2(-1, -1)
   */
  static get LEFT_UP() {
    return new Vector2(-1, -1);
  }

  /**
   * @returns {Vector2} Vector2(-1, 1)
   */
  static get LEFT_DOWN() {
    return new Vector2(-1, 1);
  }

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  clone() {
    return new Vector2(this.x, this.y);
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  times(num) {
    this.x *= num;
    this.y *= num;
    return this;
  }

  get inverse() {
    return this.clone().times(-1);
  }

  get magnitude() {
    const { x, y } = this;
    return Math.sqrt(x ** 2 + y ** 2);
  }

  get normalized() {
    const { x, y, magnitude } = this;
    return new Vector2(x / magnitude, y / magnitude);
  }
}

class Rectangle {
  /**
   * @param {number} left 
   * @param {number} top 
   * @param {number} right 
   * @param {number} bottom 
   */
  constructor(left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }
}