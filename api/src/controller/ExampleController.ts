// ExampleController.ts
import {Request, Response} from "express";
import {ExampleService} from "../services/ExampleService";

export class ExampleController {

    public static async create(req: Request, res: Response) {
        try {
            const result = await ExampleService.create(req.body);
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }

    public static async list(req: Request, res: Response) {
        try {
            const result = await ExampleService.list();
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }

    public static async get(req: Request, res: Response) {
        try {
            const result = await ExampleService.get(req.params.id);
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }

    public static async update(req: Request, res: Response) {
        try {
            const result = await ExampleService.update(req.body);
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }

    public static async delete(req: Request, res: Response) {
        try {
            const result = await ExampleService.delete(req.params.id);
            res.send(result);
        } catch (error) {
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    }
}
