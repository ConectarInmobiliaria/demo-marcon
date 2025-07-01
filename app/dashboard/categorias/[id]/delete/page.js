'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteCategoryPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error al eliminar categoría');
      router.push('/dashboard/categorias');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Eliminar Categoría</h1>
      {error && <p className="text-danger">{error}</p>}
      <p>¿Seguro que deseas eliminar la categoría con ID <strong>{id}</strong>? Esta acción es irreversible.</p>
      <button
        onClick={handleDelete}
        className="btn btn-danger me-2"
        disabled={loading}
      >
        {loading ? 'Eliminando...' : 'Sí, eliminar'}
      </button>
      <button
        onClick={() => router.back()}
        className="btn btn-outline-secondary"
        disabled={loading}
      >
        Cancelar
      </button>
    </div>
  );
}
