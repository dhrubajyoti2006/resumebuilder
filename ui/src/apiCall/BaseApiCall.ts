import { ApiManager } from './ApiManager';

import type { ApiResponse } from './ApiResponse';

class BaseApiCall {
  static async callServer(
    collectionName: string,
    data?: any,
    context?: any, // Since there is no direct equivalent of BuildContext, we can use any or define it as per your app context.
    autoClose?: boolean
  ): Promise<ApiResponse> {
    return ApiManager.callServer({
      collectionName,
      data,
      context,
      autoClose,
    });
  }
}

export { BaseApiCall };
