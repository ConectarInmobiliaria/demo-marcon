'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FadeInSectionClient } from '@/components/Motion/FadeInSectionClient';
import { FadeInHeadingClient } from '@/components/Motion/FadeInHeadingClient';

const servicios = [
  {
    key: 'tasaciones',
    title: 'Tasaciones',
    description:
      'Realizamos tasaciones precisas basadas en nuestro profundo conocimiento del mercado local.',
    iconClass: 'bi bi-rulers',
    img: '/tasaciones.jpg',
  },
  {
    key: 'ventas',
    title: 'Ventas',
    description:
      'Comercializamos casas, departamentos, dúplex, terrenos, locales y cocheras con estrategia de marketing digital y tradicional.',
    iconClass: 'bi bi-currency-dollar',
    img: '/ventas.jpg',
  },
  {
    key: 'alquileres',
    title: 'Alquileres y Administración',
    description:
      'Gestionamos contratos de alquiler y administración de propiedades para propietarios e inquilinos, incluyendo mantenimiento y cobros.',
    iconClass: 'bi bi-house-lock',
    img: '/alquileres.jpg',
  },
  {
    key: 'asesoria-legal',
    title: 'Asesoría Legal',
    description:
      'Contamos con un equipo legal especializado en derecho inmobiliario para asegurar transacciones seguras.',
    iconClass: 'bi bi-briefcase',
    img: '/asesoria-legal.jpg',
  },
  {
    key: 'gestion-contable',
    title: 'Gestión Contable',
    description:
      'Manejamos todas las obligaciones impositivas y contables para que tu operación esté al día.',
    iconClass: 'bi bi-calculator',
    img: '/gestion-contable.jpg',
  },
  {
    key: 'busqueda',
    title: 'Búsqueda Personalizada',
    description:
      'Ayudamos a encontrar la propiedad que se ajuste a tus necesidades y presupuesto, con opciones exclusivas.',
    iconClass: 'bi bi-search',
    img: '/busqueda-personalizada.jpg',
  },
];

export default function ServiciosClient() {
  return (
    <div>
      {/* Encabezado */}
      <section className="container py-5">
        <FadeInHeadingClient as="h1" className="mb-4 text-center text-primary">
          Servicios
        </FadeInHeadingClient>
        <FadeInSectionClient>
          <p className="text-center mx-auto" style={{ maxWidth: '800px' }}>
            Ofrecemos servicios integrales: tasación de inmuebles, venta y alquiler,
            administración de propiedades, asesoría legal, búsqueda personalizada
            y gestión contable.
          </p>
        </FadeInSectionClient>
      </section>

      {/* Listado de servicios */}
      {servicios.map((srv, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <section key={srv.key} className="container py-5">
            <FadeInSectionClient delay={0.1 * idx}>
              <div className="row gx-0 align-items-center">
                {/* Texto */}
                <div className={`col-lg-6 d-flex flex-column justify-content-center ${
                  isEven ? '' : 'order-lg-2 text-lg-end'
                }`}>
                  <div className="content px-4 px-lg-0">
                    <div className="d-flex align-items-center mb-3 justify-content-">
                      {isEven && <i className={`${srv.iconClass} fs-1 me-3 text-primary`}></i>}
                      <h3 className="mb-0">{srv.title}</h3>
                      {!isEven && <i className={`${srv.iconClass} fs-1 ms-3 text-primary`}></i>}
                    </div>
                    <p className="mt-3">{srv.description}</p>
                  </div>
                </div>

                {/* Imagen */}
                <div className={`col-lg-6 d-flex justify-content-center ${
                  isEven ? '' : 'order-lg-1'
                }`}>
                  <Image
                    src={srv.img}
                    alt={srv.title}
                    width={600}
                    height={400}
                    className="img-fluid rounded shadow"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </FadeInSectionClient>
          </section>
        );
      })}
    </div>
  );
}
