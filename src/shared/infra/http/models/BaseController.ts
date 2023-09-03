
import { Request, Response, BadRequestException } from '@nestjs/common'

export abstract class BaseController {

    protected abstract executeImpl(req: Request, res: Response): Promise<void | any>;

    public async execute(req: Request, res: Response): Promise<any> {
        try {
            return await this.executeImpl(req, res);
        } catch (err) {
            console.log(`[BaseController]: Uncaught controller error`);
            console.log(err);
            return new BadRequestException(err.message)
        }
    }

    // public static jsonResponse(res: Response, code: number, message: string) {
    //     return res.status(code).json({ message })
    // }

    public ok<T>(dto?: T) {
        if (!!dto) {
            return dto
        } else {
            return;
        }
    }

    // public created(res: Response) {
    //     return res.sendStatus(201);
    // }

    // public clientError(res: Response, message?: string) {
    //     return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized');
    // }

    // public unauthorized(res: Response, message?: string) {
    //     return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized');
    // }

    // public paymentRequired(res: Response, message?: string) {
    //     return BaseController.jsonResponse(res, 402, message ? message : 'Payment required');
    // }

    // public forbidden(res: Response, message?: string) {
    //     return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden');
    // }

    // public notFound(res: Response, message?: string) {
    //     return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
    // }

    // public conflict(res: Response, message?: string) {
    //     return BaseController.jsonResponse(res, 409, message ? message : 'Conflict');
    // }

    // public tooMany(res: Response, message?: string) {
    //     return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests');
    // }

    // public todo(res: Response) {
    //     return BaseController.jsonResponse(res, 400, 'TODO');
    // }

    public fail(error: Error | string) {
        console.log('fail:', error);
        return {
            message: error.toString()
        }
    }
}