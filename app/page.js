// app/page.js
import Hero from '../components/Hero';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Sección de introducción */}
      <section className="container py-5">
        <h2 className="mb-4 text-center">Bienvenidos a Inmobiliaria Marcon</h2>
        <p className="text-center mx-auto" style={{ maxWidth: '800px' }}>
          “Más de tres décadas de experiencia en negocios inmobiliarios en el noreste argentino, sur de Paraguay y costa de Brasil.
          Tenemos un know how propio sobre tasaciones, comercialización de alquileres y administración de propiedades
          en Posadas y principales ciudades de Misiones. Vendemos casas, departamentos, dúplex, terrenos, locales, depósitos y cocheras.”
        </p>
        {/* Botón centrado de llamada a acción */}
        <div className="text-center mt-4">
          <Link href="/propiedades" className="btn btn-primary btn-lg">
            Ver Propiedades
          </Link>
        </div>
      </section>
      <section className="container py-5">
        <h2 className="mb-4">Propiedades destacadas</h2>
        <div className="row">
          {/* Ejemplo estático */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img src="/propiedad-ejemplo.jpg" className="card-img-top" alt="Propiedad" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Casa en el centro</h5>
                <p className="card-text">Hermosa casa céntrica con 3 dormitorios.</p>
                {/* En Next 13+ no se usa <a> dentro de <Link> */}
                <Link href="/propiedades/1" className="btn btn-outline-primary mt-auto">
                  Ver detalles
                </Link>
              </div>
            </div>
          </div>
          {/* Repite para más propiedades */}
        </div>
      </section>
    </>
  );
}
