export class AppError extends Error {
    public code: number;
    constructor(message: string, code: number = 500) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Ресурсот не е пронајден') {
        super(message, 404);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = 'Неовластен пристап') {
        super(message, 401);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class BadRequestError extends AppError {
    constructor(message = 'Лоша барање') {
        super(message, 400);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export class ConflictError extends AppError {
    constructor(message = 'Конфликт во барањето') {
        super(message, 409);
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}

export class InternalServerError extends AppError {
    constructor(message = 'Внатрешна серверска грешка') {
        super(message, 500);
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}

export class TooManyRequestsError extends AppError {
    constructor(message = 'Прекумерни барања, ве молиме обидете се повторно подоцна') {
        super(message, 429);
        Object.setPrototypeOf(this, TooManyRequestsError.prototype);
    }
}

export class ValidationError extends AppError {
    constructor(message = 'Валидацијата не успеа') {
        super(message, 400);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}