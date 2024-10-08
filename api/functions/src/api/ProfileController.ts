import {onCall, CallableRequest} from "firebase-functions/v2/https";
import {ProfileService} from "../services/profile/ProfileService";


export const ProfileController = {
    get: onCall(async (request: CallableRequest) => {
        console.log("1");
        return await ProfileService.get(request);
    }),
};
