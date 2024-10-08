import {ApiResponse} from "../../models/response/ApiResponse";
import {CallableContext} from "firebase-functions/lib/common/providers/https";
import data from "../../data/data.json"
import admin = require("firebase-admin");

export const ProfileService = {

    dbName: "profile",

    get: async function (context: CallableContext)
        : Promise<ApiResponse<any>> {
        const apiResponse = new ApiResponse<string>();

        try {
            const query = admin.firestore().collection(this.dbName);
            await query.add(data);

            apiResponse.data = data;
            apiResponse.addSuccess();

            return apiResponse;
        } catch (er) {
            console.log(er);
            apiResponse.data = "Error";
            apiResponse.addException();

            return apiResponse;
        }
    },
};
