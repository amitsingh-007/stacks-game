import { CONFIG } from "../constants";

export default class Row {
  public readonly left: number;
  public readonly length: number;
  public readonly right: number;

  constructor(left: number, length: number) {
    this.left = left;
    this.length = length;
    this.right = left + length - 1;
  }

  setLeft(left: number) {
    const clampedLeft = Math.min(
      Math.max(left, 0),
      CONFIG.Columns - this.length
    );
    if (clampedLeft === this.left) {
      return this;
    }
    return new Row(clampedLeft, this.length);
  }

  setLength(length: number) {
    return new Row(this.left, length);
  }

  isOn(index: number) {
    return this.left <= index && index <= this.right;
  }

  getIntersection(row: Row) {
    return {
      left: Math.max(row.left, this.left),
      right: Math.min(row.right, this.right),
    };
  }

  setLeftRight(left: number, right: number) {
    if (right < left) {
      return new Row(this.left, -1);
    }
    return new Row(left, right - left + 1);
  }
}
