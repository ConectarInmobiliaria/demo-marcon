// app/propiedades/[id]/page.js
import { fetchPropiedadById } from '@/lib/api';
export default async function PropiedadPage({ params }) {
  const id = params.id;
  const prop = await fetchPropiedadById(id);
  if (!prop) return <p className="container py-5">Propiedad no encontrada.</p>;
  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <img src={prop.imagenUrl} className="img-fluid rounded mb-4" alt={prop.titulo} />
          <h2>{prop.titulo}</h2>
          <p>{prop.descripcion}</p>
          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item"><strong>Precio:</strong> ${prop.precio}</li>
            <li className="list-group-item"><strong>Ubicación:</strong> {prop.ubicacion}</li>
            {/* Otros detalles */}
          </ul>
        </div>
        <div className="col-lg-4">
          {/* Formulario de consulta o reserva */}
          <h5>Contactar al agente</h5>
          <form action={`/api/inquiries`} method="post">
            <input type="hidden" name="propiedadId" value={id} />
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="nombre" name="nombre" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">Mensaje</label>
              <textarea className="form-control" id="mensaje" name="mensaje" rows="3" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Enviar consulta</button>
          </form>
        </div>
      </div>
    </section>
  );
}
