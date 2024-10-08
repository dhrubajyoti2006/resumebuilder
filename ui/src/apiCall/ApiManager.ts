import axios from 'axios';

import {ApiResponse} from './ApiResponse';

class ApiManager {
  // Function to handle auto-close of a modal (context equivalent in Flutter)
  static executeAutoClose(context?: any, autoClose?: boolean) {
    if (context) {
      if (autoClose) {
        if (autoClose === true) {
          // Close the modal (assuming context is some modal handler)
          context.close();
        }
      } else {
        context.close();
      }
    }
  }

  // Function to make the API call
  static async callServer({
                            collectionName,
                            data,
                            context,
                            autoClose,
                          }: {
    collectionName: string;
    data?: any;
    context?: any;
    autoClose?: boolean;
  }): Promise<ApiResponse> {
    try {
      // Show loading indicator (Modal or similar)
      if (context) {
        context.showLoading(); // Assuming you have some context method to show a loading state
      }

      // API call using axios
      const response = await axios.post(
        `${collectionName}`, // Example URL to Firebase Function emulator
        data
      );

      const resultsData = response.data;

      // Map messages from response
      const messages: ApiMessage[] = (resultsData.messages || []).map(
        (msg: any) => ApiMessage.fromJson(msg)
      );

      // Create ApiResponse
      const apiResponse = new ApiResponse(resultsData, messages);

      // Handle auto-close of loading modal or similar
      ApiManager.executeAutoClose(context, autoClose);

      return apiResponse;
    } catch (error: any) {
      console.error(error);

      // Auto-close on error
      ApiManager.executeAutoClose(context, autoClose);

      // Handle error as ApiMessage
      const messages: ApiMessage[] = [
        new ApiMessage(ApiMessageCode.error, error.toString(),
        ),
      ];

      return new ApiResponse(null, messages);
    }
  }
}

export {ApiManager};
