import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { BusinessError } from '../../domain/errors/business.error';

/** Traduit une BusinessError du domaine en réponse HTTP. */
@Catch(BusinessError)
export class BusinessErrorFilter implements ExceptionFilter {
  catch(exception: BusinessError, host: ArgumentsHost): void {
    throw new Error('Not implemented');
  }
}
