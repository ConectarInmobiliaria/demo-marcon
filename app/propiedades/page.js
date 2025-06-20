// app/propiedades/page.js
import Link from 'next/link';
import Image from 'next/image';
import { fetchPropiedades } from '@/lib/api';

export default async function PropiedadesPage() {
  let propiedades = [];
  try {
    propiedades = await fetchPropiedades();
  } catch (err) {
    console.error('Error en PropiedadesPage fetchPropiedades:', err);
    // Puedes manejar error mostrando mensaje en UI
  }
  return (
    <section className="container py-5">
      <h1 className="mb-4">Propiedades</h1>
      <div className="row">
        {propiedades.map(prop => (
          <div key={prop.id} className="col-md-4 mb-4">
            <div className="card h-100">
              {/* Usar Image si lo deseas */}
              <Image
                src={prop.imagenUrl || '/placeholder.png'}
                className="card-img-top"
                alt={prop.titulo}
                width={400}
                height={250}
                style={{ objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{prop.titulo}</h5>
                <p className="card-text text-truncate">{prop.descripcion}</p>
                <Link href={`/propiedades/${prop.id}`} className="btn btn-outline-primary mt-auto">
                  Ver detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
