// components/ContactForm.js
'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ContactForm() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) {
      setErrorMsg('Por favor completa todos los campos.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre.trim(), email: email.trim(), mensaje: mensaje.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error desconocido');
      setStatus('success');
      toast.success('Mensaje enviado');
      setNombre('');
      setEmail('');
      setMensaje('');
    } catch (err) {
      console.error('Error al enviar contacto:', err);
      setErrorMsg(err.message);
      toast.error('Error al enviar');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-base-100 p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-center">Envíanos un mensaje</h2>
      <div>
        <label htmlFor="nombre" className="label">
          <span className="label-text">Nombre</span>
        </label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="input input-bordered w-full"
          disabled={status === 'loading'}
        />
      </div>
      <div>
        <label htmlFor="email" className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input input-bordered w-full"
          disabled={status === 'loading'}
        />
      </div>
      <div>
        <label htmlFor="mensaje" className="label">
          <span className="label-text">Mensaje</span>
        </label>
        <textarea
          id="mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          className="textarea textarea-bordered w-full"
          rows={5}
          disabled={status === 'loading'}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className={`btn btn-primary w-full ${status === 'loading' ? 'loading' : ''}`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </div>
      {status === 'success' && (
        <p className="text-green-600 text-center mt-2">¡Gracias! Te responderemos pronto.</p>
      )}
      {errorMsg && status !== 'success' && (
        <p className="text-red-500 text-center mt-2">{errorMsg}</p>
      )}
    </form>
  );
}

