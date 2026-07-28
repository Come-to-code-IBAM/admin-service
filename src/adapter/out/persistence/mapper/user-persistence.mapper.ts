import { UserTable, Prisma } from '@prisma/client';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserRoleEnum } from '../../../../domain/enums/user-role.enum';

/** Convertit une ligne Prisma (UserTable) en entité de domaine et inversement. */
export class UserPersistenceMapper {
  static toDomain(row: UserTable): UserEntity {
    return new UserEntity({
      id: row.id,
      publicId: row.public_id,
      email: row.email,
      passwordHash: row.password_hash,
      name: row.name,
      phoneNumber: row.phone_number ?? undefined,
      role: row.role as UserRoleEnum,
      organization: row.organization ?? undefined,
      habilitationCode: row.habilitation_code ?? undefined,
      createdAt: row.created_at,
    });
  }

  static toPersistence(user: UserEntity): Prisma.UserTableUncheckedCreateInput {
    return {
      public_id: user.publicId,
      email: user.email,
      password_hash: user.passwordHash,
      name: user.name,
      phone_number: user.phoneNumber ?? null,
      role: user.role,
      organization: user.organization ?? null,
      habilitation_code: user.habilitationCode ?? null,
    };
  }
}
