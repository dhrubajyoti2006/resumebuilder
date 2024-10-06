import { ApiResponse } from '../ApiResponse';
import { BaseApiCall } from '../BaseApiCall';

class ProfileApiCall extends BaseApiCall {
  constructor() {
    super();
  }

  static async get(data, context: any): Promise<ApiResponse> {
    const apiResponse = await BaseApiCall.callServer(
      'get/1',
      context
    );

    return apiResponse;
  }
}

export { ProfileApiCall };
