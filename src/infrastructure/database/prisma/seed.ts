import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import { PublicIdPrefix } from '../../../domain/port/in/generate-public-id/generator-public-id.port';

const prisma = new PrismaClient();

/** Reproduit le format des public-id (préfixe_nanoid) hors du conteneur Nest. */
function publicId(prefix: PublicIdPrefix): string {
  return `${prefix}_${nanoid(12)}`;
}

async function seedAdmin() {
  const passwordHash = await bcrypt.hash('Admin123!', 10);
  return prisma.userTable.upsert({
    where: { email: 'admin@carnet-troupeau.local' },
    update: {},
    create: {
      public_id: publicId(PublicIdPrefix.USER),
      email: 'admin@carnet-troupeau.local',
      password_hash: passwordHash,
      name: 'Administrateur',
      role: 'admin',
      organization: 'Carnet du troupeau',
    },
  });
}

async function seedEleveurs(registeredBy: string) {
  const eleveurs = [
    { phone_number: '+22670000001', name: 'Issa Ouédraogo', village: 'Ouagadougou' },
    { phone_number: '+22670000002', name: 'Boureima Sawadogo', village: 'Koudougou' },
    { phone_number: '+22670000003', name: 'Adama Kaboré', village: 'Dori' },
  ];
  for (const eleveur of eleveurs) {
    await prisma.eleveurTable.upsert({
      where: { phone_number: eleveur.phone_number },
      update: {},
      create: {
        public_id: publicId(PublicIdPrefix.ELEVEUR),
        ...eleveur,
        registered_by: registeredBy,
      },
    });
  }
}

async function seedAgriculteurs(registeredBy: string) {
  const agriculteurs = [
    { phone_number: '+22670000011', name: 'Salif Compaoré', village: 'Ziniaré' },
    { phone_number: '+22670000012', name: "Mariam Zongo", village: "Fada N'Gourma" },
  ];
  for (const agriculteur of agriculteurs) {
    await prisma.agriculteurTable.upsert({
      where: { phone_number: agriculteur.phone_number },
      update: {},
      create: {
        public_id: publicId(PublicIdPrefix.AGRICULTEUR),
        ...agriculteur,
        registered_by: registeredBy,
      },
    });
  }
}

/** Valeurs indicatives, à affiner avec des références INERA/CIRDES réelles (cf. 2.2 module-python). */
async function seedFoodItems() {
  const items = [
    { name: 'Foin de brousse', category: 'fourrage', dry_matter_pct: 90, energy_ufl: 0.5, protein_pct: 6, calcium_pct: 0.4, phosphorus_pct: 0.15 },
    { name: 'Paille de céréales', category: 'fourrage', dry_matter_pct: 92, energy_ufl: 0.35, protein_pct: 3.5, calcium_pct: 0.3, phosphorus_pct: 0.1 },
    { name: 'Tourteau de coton', category: 'concentré', dry_matter_pct: 91, energy_ufl: 0.9, protein_pct: 38, calcium_pct: 0.2, phosphorus_pct: 1.1 },
    { name: 'Son de blé', category: 'concentré', dry_matter_pct: 88, energy_ufl: 0.85, protein_pct: 15, calcium_pct: 0.15, phosphorus_pct: 0.9 },
    { name: 'Farine de maïs', category: 'concentré', dry_matter_pct: 88, energy_ufl: 1.05, protein_pct: 9, calcium_pct: 0.05, phosphorus_pct: 0.3 },
    { name: 'Pierre à lécher (minéraux)', category: 'complément minéral', dry_matter_pct: 100, energy_ufl: 0, protein_pct: 0, calcium_pct: 24, phosphorus_pct: 12 },
  ];
  for (const item of items) {
    await prisma.foodItemTable.upsert({
      where: { name: item.name },
      update: {},
      create: { public_id: publicId(PublicIdPrefix.FOOD_ITEM), ...item },
    });
  }
}

async function main(): Promise<void> {
  const admin = await seedAdmin();
  await seedEleveurs(admin.public_id);
  await seedAgriculteurs(admin.public_id);
  await seedFoodItems();
  console.log('Seed terminé : 1 admin, éleveurs/agriculteurs de test, référentiel d\'aliments.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
