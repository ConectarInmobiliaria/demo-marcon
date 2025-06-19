// components/Navbar.js
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);

  const toggleNavbar = () => setNavbarCollapsed(prev => !prev);

  // Devuelve clase 'nav-link active' o 'nav-link' según ruta activa
  const linkClass = (isActive) => isActive ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Logo / marca a la izquierda */}
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image src="/logo.png" alt="Marcon Inmobiliaria" width={200} height={50} />
        </Link>

        {/* Toggler móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={!navbarCollapsed}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido colapsable */}
        <div
          className={`collapse navbar-collapse${navbarCollapsed ? '' : ' show'}`}
          id="navbarSupportedContent"
        >
          {/* Menú centrado: usamos .mx-auto en el ul */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className={linkClass(pathname === '/')}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/nosotros"
                className={linkClass(pathname === '/nosotros')}
              >
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/servicios"
                className={linkClass(pathname === '/servicios')}
              >
                Servicios
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/propiedades"
                className={linkClass(pathname.startsWith('/propiedades'))}
              >
                Propiedades
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/contacto"
                className={linkClass(pathname === '/contacto')}
              >
                Contacto
              </Link>
            </li>
          </ul>

          {/* Botón o menú de usuario a la derecha */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            {session ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mi cuenta
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link href="/dashboard" className="dropdown-item">
                      Dashboard
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => signOut()}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              // Botón “Corredores” alineado a la derecha
              <li className="nav-item">
                <Link href="/auth/login" className="btn btn-primary">
                  Corredores
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
