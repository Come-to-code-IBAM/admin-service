import { DomainErrorCode } from './codes.error';

/** Erreur métier levée par le domaine (indépendante du transport HTTP). */
export class BusinessError extends Error {
  constructor(
    readonly code: DomainErrorCode,
    message: string,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = 'BusinessError';
  }
}
