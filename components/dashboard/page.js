// app/dashboard/page.js
import DashboardLayout from '@/components/dashboard/Layout';
import { prisma } from '@/lib/prisma';

export default async function DashboardHome() {
  // Solo accesible a ADMIN/CORREDOR (middleware)
  // Fetch de estadísticas desde Prisma
  const [userCount, propCount, solicitudesCount] = await Promise.all([
    prisma.user.count(),
    prisma.propiedad.count(),         // asume tabla propiedad
    prisma.solicitud.count({ where: { estado: 'PENDIENTE' } }), // ejemplo
  ]);

  return (
    <DashboardLayout>
      <h1 className="mb-4">Panel de Control</h1>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <h5 className="card-title">Usuarios</h5>
              <p className="card-text fs-2">{userCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success h-100">
            <div className="card-body">
              <h5 className="card-title">Propiedades</h5>
              <p className="card-text fs-2">{propCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <h5 className="card-title">Solicitudes Pendientes</h5>
              <p className="card-text fs-2">{solicitudesCount}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
