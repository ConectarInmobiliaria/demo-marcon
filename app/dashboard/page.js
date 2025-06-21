// app/dashboard/page.js
'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardHome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="container py-5">Cargando...</div>;
  }
  // Ya autenticado
  const role = session.user.role;
  return (
    <div className="container py-5">
      <h1>Dashboard</h1>
      {role === 'admin' && (
        <div>
          <h2>Administración</h2>
          <ul>
            <li><a href="/dashboard/usuarios" className="btn btn-link">Gestionar Usuarios</a></li>
            <li><a href="/dashboard/propiedades" className="btn btn-link">Gestionar Propiedades</a></li>
            <li><a href="/dashboard/solicitudes" className="btn btn-link">Ver Solicitudes</a></li>
          </ul>
        </div>
      )}
      {role === 'corredor' && (
        <div>
          <h2>Panel de Corredor</h2>
          <ul>
            <li><a href="/dashboard/propiedades" className="btn btn-link">Mis Propiedades</a></li>
            <li><a href="/dashboard/propiedades/new" className="btn btn-link">Crear Propiedad</a></li>
            <li><a href="/dashboard/solicitudes" className="btn btn-link">Solicitudes Recibidas</a></li>
          </ul>
        </div>
      )}
      {role === 'cliente' && (
        <div>
          <h2>Panel de Cliente</h2>
          <p>Aquí verás tus consultas, favoritos, etc.</p>
        </div>
      )}
    </div>
  );
}
