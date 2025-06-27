const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Iniciando seed...');

  const usersData = [
    { name: 'Administrador', email: 'admin@marcon.com.ar', password: 'Admin123!', role: 'ADMIN' },
    { name: 'Corredor Ejemplo', email: 'corredor@marcon.com.ar', password: 'Corredor123!', role: 'CORREDOR' },
  ];

  for (const u of usersData) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } });
    const hash = await bcrypt.hash(u.password, 10);

    if (!existing) {
      await prisma.user.create({
        data: {
          name: u.name,
          email: u.email,
          passwordHash: hash,
          role: u.role,
        },
      });
      console.log(`✅ Usuario creado: ${u.email}`);
    } else {
      console.log(`ℹ️ Usuario ya existe: ${u.email}`);
    }
  }

  console.log('🎉 Seed finalizado.');
}

main()
  .catch(e => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
