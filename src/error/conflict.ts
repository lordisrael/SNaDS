const {StatusCodes} = require('http-status-codes');
import CustomAPIError from '../error/custom-api';

class ConflictError extends CustomAPIError {
    constructor(message: string) {
        super(message, StatusCodes.CONFLICT);
    }
}

export default ConflictError;