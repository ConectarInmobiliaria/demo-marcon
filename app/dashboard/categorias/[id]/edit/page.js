// app/dashboard/categorias/[id]/edit/page.js
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditCategoriaPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar categoría existente
  useEffect(() => {
    fetch(`/api/categories/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar categoría');
        return res.json();
      })
      .then(data => setName(data.name))
      .catch(err => {
        console.error(err);
        setErrorMsg(err.message);
      });
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error al actualizar');
      router.push('/dashboard/categorias');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Editar Categoría</h1>
      {errorMsg && <p className="text-danger">{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
}
