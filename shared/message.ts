import { HttpStatusCode } from './http-status-code';
class Result {
  private statusCode: number;
  private code: number;
  private message: string;
  private data?: any;

  constructor(statusCode: number, code: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  bodyToString () {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
      },
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        data: this.data,
      }),
    };
  }
}

export class MessageUtil {
  static success(data: object): any {
    const result = new Result(HttpStatusCode.Success, 0, 'success', data);

    return result.bodyToString();
  }

  static error(code: number = 1000, message: string) {
    const result = new Result(HttpStatusCode.Success, code, message);

    console.log(result.bodyToString());
    return result.bodyToString();
  }
}