// app/propiedades/page.js
import Link from 'next/link';
import { fetchPropiedades } from '@/lib/api';
import Image from 'next/image';

export default async function PropiedadesPage() {
  let propiedades = [];
  try {
    propiedades = await fetchPropiedades();
  } catch (err) {
    console.error('Error en PropiedadesPage fetchPropiedades:', err);
    // Puedes retornar un mensaje o un array vacío
    propiedades = [];
  }

  return (
    <section className="container py-5">
      <h1 className="mb-4">Propiedades</h1>
      {propiedades.length === 0 ? (
        <p>No hay propiedades disponibles.</p>
      ) : (
        <div className="row">
          {propiedades.map(prop => (
  <div key={prop.id} className="col-md-4 mb-4">
    <div className="card h-100">
      {prop.imagenUrl ? (
        <Image
          src={prop.imagenUrl}
          alt={prop.titulo}
          width={400}
          height={300}
          className="card-img-top"
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <img src="/placeholder.jpg" className="card-img-top" alt="Sin imagen" />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{prop.titulo}</h5>
        <p className="card-text text-truncate">{prop.descripcion}</p>
        <Link
          href={`/propiedades/${prop.id}`}
          className="btn btn-outline-primary mt-auto"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  </div>
          ))}
        </div>
      )}
    </section>
  );
}
