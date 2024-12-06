import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Création de l'administrateur par défaut
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@iamtechnology.store' },
    update: {},
    create: {
      id: 'admin-default',
      email: 'admin@iamtechnology.store',
      name: 'Administrateur',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    },
  });

  // Création d'un utilisateur commercial
  const salesPassword = await bcrypt.hash('commercial123', 10);
  
  await prisma.user.upsert({
    where: { email: 'commercial@iamtechnology.store' },
    update: {},
    create: {
      id: 'sales-default',
      email: 'commercial@iamtechnology.store',
      name: 'Commercial',
      password: salesPassword,
      role: 'sales_agent',
      isActive: true,
    },
  });

  console.log('✅ Base de données initialisée avec succès');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors de l\'initialisation:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });