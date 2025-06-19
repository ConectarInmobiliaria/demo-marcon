// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-2">© {new Date().getFullYear()} Inmobiliaria Marcon. Todos los derechos reservados.</p>
        <Link href="https://your-website.com" className="text-white text-decoration-none d-inline-flex align-items-center justify-content-center">
          <img src="/firma.png" alt="Firma" width={90} height={40} className="me-2" />
          <span>Desarrollado por Marcon</span>
        </Link>
      </div>
    </footer>
  );
}
