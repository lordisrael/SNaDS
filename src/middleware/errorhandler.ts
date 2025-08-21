import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../error/custom-api";
import { Request, Response } from "express";
import { NextFunction } from "express";

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    let customError = {
            statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            msg: err.message || 'Something went wrong, Please try again',
            stack: err.stack
        }
    // if (err instanceof CustomAPIError) {
    //     return res.status(err.statusCode).json({ message: err.message });
    // }
    if(err.code && err.code == 11000) {
        const field = Array.isArray(Object.keys(err.keyValue)) ? Object.keys(err.keyValue)[0] : Object.keys(err.keyValue);
        customError.msg = `Duplicate value entered for ${field} field, please choose another value`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }
    if(err.name == 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item:any) => item.message).join(',')
        customError.statusCode = StatusCodes.BAD_REQUEST
    }
    if(err.name == 'CastError') {
        const id = (req.params && (req.params.id || req.params._id)) ? (req.params.id || req.params._id) : JSON.stringify(req.params);
        customError.msg = `No item found with this id: ${id}`
        customError.statusCode = StatusCodes.NOT_FOUND
    }
    return res.status(customError.statusCode).json({
        msg: customError.msg,
        ...(process.env.NODE_ENV !== 'production' && { stack: customError.stack })
    })
};

export default errorHandlerMiddleware;
