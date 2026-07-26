import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import {
  PublicIdGeneratorPort,
  PublicIdPrefix,
} from '../../../domain/port/in/generate-public-id/generator-public-id.port';

/**
 * Adaptateur de génération de public-id : nanoid préfixé par entité.
 * Produit des identifiants lisibles et non devinables, ex. "anm_V1StGXR8Z5jT".
 */
@Injectable()
export class NanoidGeneratorAdapter implements PublicIdGeneratorPort {
  /** Longueur de la partie aléatoire (hors préfixe). */
  private static readonly SIZE = 12;

  generate(prefix: PublicIdPrefix): string {
    return `${prefix}_${nanoid(NanoidGeneratorAdapter.SIZE)}`;
  }
}
