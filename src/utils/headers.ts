const deviceTypeHeaderName = "x-next-device-type";

export default class NextHeaders {
  private readonly headers: Headers;

  constructor(headers: Headers) {
    this.headers = headers;
  }

  public build() {
    return this.headers;
  }

  public getDeviceType() {
    return this.headers.get(deviceTypeHeaderName) ?? undefined;
  }

  public setDeviceType(deviceType?: string) {
    this.headers.set(deviceTypeHeaderName, deviceType ?? "");
    return this;
  }
}
