// components/dashboard/Layout.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { SidebarItems } from './SidebarItems'; // definimos lista de secciones

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Si no hay session o rol no permitido, quizá redirigir o mostrar mensaje. Pero middleware ya protege.
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="flex-shrink-0 p-3 bg-light" style={{ width: '250px', minHeight: '100vh' }}>
        <Link href="/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
          <span className="fs-4">Admin Panel</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          {/* Renderiza ítems de SidebarItems */}
          {SidebarItems.map(item => (
            <li key={item.href} className="nav-item">
              <Link href={item.href} className={`nav-link ${pathname.startsWith(item.href) ? 'active' : 'text-dark'}`}>
                <i className={`bi ${item.icon} me-2`}></i> {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <div>
          <button onClick={() => signOut()} className="btn btn-outline-danger w-100">
            <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        {children}
      </div>
    </div>
  );
}
