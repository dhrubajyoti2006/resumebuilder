import { BaseApiCall } from '../BaseApiCall';

import type { ApiResponse } from '../ApiResponse';

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
