enum ApiMessageCode {
  error,
  success,
  exception
}

class ApiMessage {
  code: ApiMessageCode;

  text: string;

  constructor(code: ApiMessageCode, text: string) {
    this.code = code;
    this.text = text;
  }

  static fromJson(json: any): ApiMessage {
    return new ApiMessage(
      ApiMessageCode[json.code as keyof typeof ApiMessageCode],
      json.text
    );
  }
}
