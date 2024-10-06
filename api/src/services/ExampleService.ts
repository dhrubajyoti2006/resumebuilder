import "dotenv/config";
import OpenAI from "openai";
import { generateDoc } from './generator';
import data from "../data/data.json"

// The const openai is needed when Assistant Api is called
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

interface CreatePayload {
    name: string,
    description: string
}

interface UpdatePayload {
    id: string,
    name: string,
    description: string
}

export class ExampleService {

    public static async create(createPayload: CreatePayload) {
        return "Create response from server";
    }

    public static async list() {
        await generateDoc();
        return "List response from server";   // Ideally this should be an array
    }

    public static async get(id: string) {
        return data;
    }

    public static async update(updatePayload: UpdatePayload) {
        return "Update response from server";
    }

    public static async delete(id: string) {
        return "Delete response from server";
    }

}