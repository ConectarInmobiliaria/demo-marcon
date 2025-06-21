// app/nosotros/page.js
import Image from 'next/image';
import { FadeInSectionClient } from '@/components/Motion/FadeInSectionClient';
import { FadeInHeadingClient } from '@/components/Motion/FadeInHeadingClient';

export default function NosotrosPage() {
  return (
    <section className="container py-5">
      <FadeInHeadingClient as="h1" className="mb-4 text-center">
        Nosotros
      </FadeInHeadingClient>
      <FadeInSectionClient delay={0.2}>
        <p>
          En Inmobiliaria Marcon contamos con más de tres décadas de experiencia en negocios inmobiliarios
          en el noreste argentino, sur de Paraguay y costa de Brasil. Nuestro know-how abarca tasaciones,
          comercialización de alquileres y administración de propiedades en Posadas y principales ciudades de Misiones.
        </p>
      </FadeInSectionClient>

      <div className="row gy-4 mt-4">
        <div className="col-md-4">
          <FadeInSectionClient delay={0.4}>
            <div className="card h-100 shadow-sm border-primary">
              <div className="card-body d-flex flex-column">
                <div className="mb-3 text-primary fs-3">
                  <i className="bi bi-bullseye"></i>
                </div>
                <h5 className="card-title">Misión</h5>
                <p className="card-text">
                  Nuestra misión es transformar tu experiencia de compra, venta o alquiler en un proceso fácil y rentable.
                  Queremos que, a lo largo de toda la operación, disfrutes del camino hacia tu nuevo hogar o inversión.
                </p>
              </div>
            </div>
          </FadeInSectionClient>
        </div>
        <div className="col-md-4">
          <FadeInSectionClient delay={0.6}>
            <div className="card h-100 shadow-sm border-success">
              <div className="card-body d-flex flex-column">
                <div className="mb-3 text-success fs-3">
                  <i className="bi bi-file-earmark-text"></i>
                </div>
                <h5 className="card-title">Legal</h5>
                <p className="card-text">
                  En nuestra empresa, valoramos tu tranquilidad. Contamos con un departamento legal especializado
                  que te brindará asistencia en cada paso del proceso inmobiliario, asegurando que estés respaldado en todo momento.
                </p>
              </div>
            </div>
          </FadeInSectionClient>
        </div>
        <div className="col-md-4">
          <FadeInSectionClient delay={0.8}>
            <div className="card h-100 shadow-sm border-warning">
              <div className="card-body d-flex flex-column">
                <div className="mb-3 text-warning fs-3">
                  <i className="bi bi-calculator"></i>
                </div>
                <h5 className="card-title">Contable</h5>
                <p className="card-text">
                  La gestión adecuada de las obligaciones impositivas es esencial en cualquier transacción económica.
                  Con nuestra experiencia en el ámbito contable, nos encargamos de que estés al día, permitiéndote centrarte solo en realizar un buen negocio.
                </p>
              </div>
            </div>
          </FadeInSectionClient>
        </div>
      </div>

      {/* Presentación Mirta */}
      <FadeInSectionClient delay={1.0} className="mt-5">
        <h2 className="mb-4 text-center">Presentación de Mirta Marcon</h2>
        <div className="row align-items-center gx-4">
          <div className="col-md-4 text-center">
            <Image
              src="/mirta.jpg"
              alt="Mirta Marcon"
              width={300}
              height={300}
              className="rounded-circle img-fluid shadow"
            />
          </div>
          <div className="col-md-8">
            <p>
              Con una sólida formación en arquitectura, Mirta Marcon ha forjado su carrera en el vibrante mundo inmobiliario,
              acompañando a su padre desde muy temprana edad, en un entorno donde los remates de ganado, los campos y las tasaciones
              son parte de su historia. Desde su llegada a tierras misioneras en 1984, Mirta ha estado comprometida con la misión de ayudar
              a las personas a encontrar las mejores opciones de compra y venta de inmuebles. Su pasión por el sector y su experiencia única
              le permiten ofrecer un servicio excepcional, garantizando que cada cliente reciba la atención y asesoramiento que necesita para
              tomar decisiones informadas.
            </p>
          </div>
        </div>
      </FadeInSectionClient>
    </section>
  );
}
