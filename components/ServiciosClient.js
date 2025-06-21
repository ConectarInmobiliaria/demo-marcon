// components/ServiciosClient.js
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ServiciosClient() {
  // Define lista de servicios con título, descripción e ícono (Bootstrap Icons)
  const servicios = [
    {
      title: 'Tasaciones',
      description:
        'Realizamos tasaciones precisas basadas en nuestro profundo conocimiento del mercado local.',
      icon: <i className="bi bi-rulers"></i>,
    },
    {
      title: 'Ventas',
      description:
        'Comercializamos casas, departamentos, dúplex, terrenos, locales y cocheras con estrategia de marketing digital y tradicional.',
      icon: <i className="bi bi-currency-dollar"></i>,
    },
    {
      title: 'Alquileres y Administración',
      description:
        'Gestionamos contratos de alquiler y administración de propiedades para propietarios e inquilinos, incluyendo mantenimiento y cobros.',
      icon: <i className="bi bi-house-lock"></i>,
    },
    {
      title: 'Asesoría Legal',
      description:
        'Contamos con un equipo legal especializado en derecho inmobiliario para asegurar transacciones seguras.',
      icon: <i className="bi bi-briefcase"></i>,
    },
    {
      title: 'Gestión Contable',
      description:
        'Manejamos todas las obligaciones impositivas y contables para que tu operación esté al día.',
      icon: <i className="bi bi-calculator"></i>,
    },
    {
      title: 'Búsqueda Personalizada',
      description:
        'Ayudamos a encontrar la propiedad que se ajuste a tus necesidades y presupuesto, con opciones exclusivas.',
      icon: <i className="bi bi-search"></i>,
    },
    // Agrega más servicios según necesidades
  ];

  return (
    <section className="container py-5">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-center"
      >
        Servicios
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center mx-auto"
        style={{ maxWidth: '800px' }}
      >
        Ofrecemos servicios integrales: tasación de inmuebles, venta y alquiler, administración de
        propiedades, asesoría legal inmobiliaria, búsqueda personalizada de vivienda, gestión de
        préstamos hipotecarios, entre otros.
      </motion.p>

      <div className="row mt-4 gy-4">
        {servicios.map((srv, idx) => (
          <div key={idx} className="col-md-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="card h-100 shadow-sm"
            >
              <div className="card-body d-flex flex-column">
                <div className="mb-3 fs-2 text-primary">{srv.icon}</div>
                <h5 className="card-title">{srv.title}</h5>
                <p className="card-text">{srv.description}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
