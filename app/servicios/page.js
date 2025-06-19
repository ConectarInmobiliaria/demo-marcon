// app/servicios/page.js
export default function ServiciosPage() {
  return (
    <section className="container py-5">
      <h1 className="mb-4">Servicios</h1>
      <p>
        Ofrecemos servicios integrales: tasación de inmuebles, venta y alquiler, administración de propiedades,
        asesoría legal inmobiliaria, búsqueda personalizada de vivienda, gestión de préstamos hipotecarios, entre otros.
      </p>
      {/* Puedes detallar cada servicio en tarjetas o listas */}
      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Tasaciones</h5>
              <p className="card-text">
                Realizamos tasaciones precisas basadas en nuestro profundo conocimiento del mercado local.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Ventas</h5>
              <p className="card-text">
                Comercializamos casas, departamentos, dúplex, terrenos, locales y cocheras con estrategia de marketing digital y tradicional.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Alquileres y administración</h5>
              <p className="card-text">
                Gestionamos contratos de alquiler y administración de propiedades para propietarios e inquilinos.
              </p>
            </div>
          </div>
        </div>
        {/* Agrega más cards según sea necesario */}
      </div>
    </section>
  );
}
