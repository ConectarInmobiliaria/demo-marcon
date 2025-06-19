// app/dashboard/index.js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== 'admin' && session.user.role !== 'corredor')) {
    // Puedes redirigir con Next.js 13 App Router:
    // import { redirect } from 'next/navigation';
    // redirect('/auth/login');
    return <p className="p-6 text-center">No autorizado. Por favor inicia sesión.</p>;
  }
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard/propiedades">
            <a className="text-primary hover:underline">Gestión de Propiedades</a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/solicitudes">
            <a className="text-primary hover:underline">Ver Solicitudes de Visita</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
