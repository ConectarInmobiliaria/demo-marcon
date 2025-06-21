// components/Navbar.js
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed(prev => !prev);

  const isActive = (path) => pathname === path;
  const startsWith = (path) => pathname.startsWith(path);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image src="/logo.png" alt="Marcon" width={200} height={50} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={!collapsed}
          aria-label="Toggle navigation"
          onClick={toggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse${collapsed ? '' : ' show'}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className={`nav-link${isActive('/') ? ' active' : ''}`}>Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/nosotros" className={`nav-link${isActive('/nosotros') ? ' active' : ''}`}>Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link href="/servicios" className={`nav-link${isActive('/servicios') ? ' active' : ''}`}>Servicios</Link>
            </li>
            <li className="nav-item">
              <Link href="/propiedades" className={`nav-link${startsWith('/propiedades') ? ' active' : ''}`}>Propiedades</Link>
            </li>
            <li className="nav-item">
              <Link href="/contacto" className={`nav-link${isActive('/contacto') ? ' active' : ''}`}>Contacto</Link>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            {status === 'authenticated' ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {(session && session.user && session.user.name) ? session.user.name : 'Mi cuenta'}
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <Link href="/dashboard" className="dropdown-item">Dashboard</Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={() => signOut()}>Cerrar sesión</button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link href="/auth/login" className="btn btn-primary">Acceder</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

