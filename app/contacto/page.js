// app/contacto/page.js
'use client';

import { useState } from 'react';

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setEnviado(true);
        setForm({ nombre: '', email: '', mensaje: '' });
      } else {
        console.error('Error al enviar contacto');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="container py-5">
      <h1 className="mb-4">Contáctanos</h1>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">Mensaje</label>
              <textarea
                className="form-control"
                id="mensaje"
                name="mensaje"
                rows="4"
                value={form.mensaje}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Enviar mensaje</button>
            {enviado && (
              <div className="alert alert-success mt-3">
                ¡Gracias por contactarnos! Te responderemos pronto.
              </div>
            )}
          </form>
        </div>
        <div className="col-md-6">
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3637.367378659412!2d-65.2088163!3d-24.2638955!3m2!1i1024!2i768!4f13.1"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación"
            ></iframe>
          </div>
          <div className="mt-3">
            <p><strong>Dirección:</strong> Palpalá, Jujuy - Argentina</p>
            <p><strong>Email:</strong> ejemplo@inmobiliaria.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
