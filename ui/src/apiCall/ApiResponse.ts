class ApiResponse {
  data: any;

  messages: ApiMessage[];

  constructor(data: any, messages: ApiMessage[]) {
    this.data = data;
    this.messages = messages;
  }
}

export { ApiResponse };
