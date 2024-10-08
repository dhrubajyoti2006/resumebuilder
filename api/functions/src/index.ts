import {ProfileController} from "./api/ProfileController";
import {initializeApp} from "firebase-admin/app";

initializeApp();

/**
 *
 */
module.exports = {
    profile: ProfileController,
};