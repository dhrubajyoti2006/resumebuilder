import { ApiResponse } from './ApiResponse';
import { ApiManager } from './ApiManager';

class BaseApiCall {
  static async callServer(
    collectionName: string,
    data?: any,
    context?: any, // Since there is no direct equivalent of BuildContext, we can use any or define it as per your app context.
    autoClose?: boolean
  ): Promise<ApiResponse> {
    return await ApiManager.callServer({
      collectionName: collectionName,
      data: data,
      context: context,
      autoClose: autoClose,
    });
  }
}

export { BaseApiCall };
