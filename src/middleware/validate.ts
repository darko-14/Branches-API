import { ZodSchema, ZodError } from 'zod'
import { Request, Response, NextFunction } from 'express'
import { InternalServerError } from '../utils/errors'

declare module 'express-serve-static-core' {
    interface Request {
        validatedBody?: any
        validatedQuery?: any
        validatedParams?: any
    }
}

export function validateZod(
    schema: ZodSchema,
    source: 'body' | 'query' | 'params' = 'query'
) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = schema.parse(req[source])

            if (source === 'body') req.validatedBody = result
            if (source === 'query') req.validatedQuery = result as any
            if (source === 'params') req.validatedParams = result as any

            next()
        } catch (error: unknown) {
            console.log(error);

            if (error instanceof ZodError) {
                const formattedErrors = error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message
                }))

                return res.status(400).json({
                    success: false,
                    error: {
                        code: 400,
                        message: 'Валидацијата не успеа',
                        errors: formattedErrors
                    }
                })
            }

            throw new InternalServerError()
        }
    }
}