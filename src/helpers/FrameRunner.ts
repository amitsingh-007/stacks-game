import { TOnFrame } from "@/types/IFrameRunner";

export default class FrameRunner {
  private isStarted = false;
  private isRunning = false;
  private startTime = Date.now();
  private lastFrameTime = Date.now();
  private frameCount = 0;
  private frameId?: number;
  private pauseTime?: number;
  private onFrame?: TOnFrame;

  constructor() {
    this.reset();
  }

  replaceOnFrame(onFrame: TOnFrame) {
    this.onFrame = onFrame;
  }

  start() {
    if (this.isStarted) {
      throw new Error("Cannot start the timer when it is already started");
    }
    this.cancelFrame();
    this.reset();
    this.isStarted = true;
    this.isRunning = true;
    this.scheduleNextFrame();
  }

  stop() {
    if (!this.isStarted) {
      throw new Error("Cannot stop the timer when it is not started");
    }
    this.cancelFrame();
    this.frameCount = 0;
    this.pauseTime = undefined;
    this.isStarted = false;
    this.isRunning = false;
  }

  pause() {
    if (!this.isRunning) {
      throw new Error("Cannot pause when it is not running");
    }
    if (!this.isStarted) {
      throw new Error("Cannot pause when the timer is not started");
    }
    this.pauseTime = Date.now();
    this.cancelFrame();
    this.isRunning = false;
  }

  resume() {
    if (this.isRunning) {
      throw new Error("Cannot resume when it is running");
    }
    if (this.pauseTime === undefined) {
      throw new Error("Unexpected pauseTime to be undefined when it is paused");
    }
    const pauseLength = Date.now() - this.pauseTime;
    this.startTime = this.startTime + pauseLength;
    this.lastFrameTime = this.lastFrameTime + pauseLength;
    this.pauseTime = undefined;
    this.isRunning = true;
    this.scheduleNextFrame();
  }

  frame = () => {
    const now = Date.now();
    const totalDuration = now - this.startTime;
    const frameLength = now - this.lastFrameTime;

    this.onFrame?.(this.frameCount, frameLength, totalDuration);

    // it is possible that the frame handler paused or stopped the game
    if (this.isStarted && this.isRunning) {
      this.frameCount++;
      this.lastFrameTime = now;
      this.scheduleNextFrame();
    }
  };

  cancelFrame = () => {
    if (this.frameId !== undefined) {
      window.cancelAnimationFrame(this.frameId);
      this.frameId = undefined;
    }
  };

  scheduleNextFrame = () => {
    this.frameId = window.requestAnimationFrame(this.frame);
  };

  reset = () => {
    this.startTime = Date.now();
    this.lastFrameTime = this.startTime;
    this.frameCount = 0;
    this.isStarted = false;
    this.isRunning = false;
  };
}
