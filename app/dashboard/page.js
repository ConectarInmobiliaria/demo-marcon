// app/dashboard/page.js o components/dashboard/page.js según tu estructura
import DashboardLayout from '@/components/dashboard/Layout';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export default async function DashboardHome() {
  // *ANTES*:
  // const [userCount, propCount, solicitudesCount] = await Promise.all([
  //   prisma.user.count(),
  //   prisma.propiedad.count(),         // <--- aquí falla: no existe modelo "propiedad"
  //   prisma.solicitud.count({ where: { estado: 'PENDIENTE' } }), // <--- no existe modelo "solicitud" ni campo estado
  // ]);

  // *AHORA* corregimos usando los nombres reales de modelos Prisma:
  // User => usuario
  // Property => propiedad
  // Inquiry => solicitud/inquiry
  // Y dado que Inquiry no tiene campo 'estado', contaremos todas o definiremos otra lógica si quieres filtrar.

  const [userCount, propertyCount, inquiryCount] = await Promise.all([
    prisma.user.count(),
    prisma.property.count(),
    prisma.inquiry.count(), // todas las solicitudes
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
              <p className="card-text fs-2">{propertyCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <h5 className="card-title">Consultas / Solicitudes</h5>
              <p className="card-text fs-2">{inquiryCount}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
