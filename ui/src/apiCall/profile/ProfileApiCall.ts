import { BaseApiCall } from '../BaseApiCall';

import type { ApiResponse } from '../ApiResponse';

class ProfileApiCall extends BaseApiCall {
  constructor() {
    super();
  }

  static async get(data, context: any): Promise<ApiResponse> {
    const apiResponse = await BaseApiCall.callServer(
      'http://127.0.0.1:5001/resumebuilder-22336/us-central1/profile-get',
      data
    );

    return apiResponse;
  }

  static async get1(data, context: any): Promise<ApiResponse> {
    const apiResponse = await BaseApiCall.callServer(
      'get/1',
      data,
      context
    );

    return apiResponse;
  }
}

export { ProfileApiCall };
