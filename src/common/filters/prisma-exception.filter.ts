// src/common/filters/prisma-exception.filter.ts
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Prisma } from '../../../generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    switch (exception.code) {
      case 'P2002': {
        // Unique constraint violation
        status = HttpStatus.CONFLICT;

        // With database adapter, the structure is different
        const meta = exception.meta as any;
        let field = 'resource';

        // Try to extract field name from adapter error structure
        if (meta?.driverAdapterError?.cause?.constraint?.fields) {
          const fields = meta.driverAdapterError.cause.constraint
            .fields as string[];
          // Remove quotes from field names
          field = fields.map((f) => f.replace(/"/g, '')).join(', ');
        } else if (meta?.target) {
          // Fallback for non-adapter Prisma
          field = (meta.target as string[]).join(', ');
        }

        message = `A resource with this ${field} already exists`;
        break;
      }
      case 'P2025': // Record not found
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found';
        break;
      default:
        // In production, hide technical details
        message =
          process.env.NODE_ENV === 'production'
            ? 'An unexpected error occurred'
            : `Prisma error: ${exception.message}`;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error:
        status === HttpStatus.CONFLICT
          ? 'Conflict'
          : status === HttpStatus.NOT_FOUND
            ? 'Not Found'
            : 'Internal Server Error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
