// components/dashboard/EditPropertyForm.js
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function EditPropertyForm({ property }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState(property.title);
  const [description, setDescription] = useState(property.description);
  const [price, setPrice] = useState(property.price.toString());
  const [location, setLocation] = useState(property.location);
  const [categoryId, setCategoryId] = useState(property.categoryId.toString());
  const [newImages, setNewImages] = useState([]);        // archivos seleccionados
  const [currentImages, setCurrentImages] = useState(property.otherImageUrls || []); // URLs existentes
  const [categories, setCategories] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Carga categorías para el select
  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (status !== 'authenticated') {
      setErrorMsg('Debes iniciar sesión');
      return;
    }
    setErrorMsg('');
    if (!title || !description || !price || !location || !categoryId) {
      setErrorMsg('Completa todos los campos');
      return;
    }
    setLoading(true);

    try {
      // 1) Si hay imágenes nuevas, subimos al servidor mediante multipart/form-data
      let uploadedUrls = [];
      if (newImages.length) {
        const form = new FormData();
        newImages.forEach(file => form.append('images', file));
        form.append('propertyId', property.id);

        const upRes = await fetch('/api/dashboard/propiedades/upload-images', {
          method: 'POST',
          body: form
        });
        const upJson = await upRes.json();
        if (!upRes.ok) throw new Error(upJson.error || 'Error subiendo imágenes');
        uploadedUrls = upJson.urls; // array de URLs WebP/AVIF generadas
      }

      // 2) Llamada PUT para actualizar la propiedad
      const res = await fetch(`/api/dashboard/propiedades/${property.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          price: parseFloat(price),
          location,
          categoryId: parseInt(categoryId, 10),
          otherImageUrls: [...currentImages, ...uploadedUrls]
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error actualizando propiedad');

      router.push('/dashboard/propiedades');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Editar Propiedad</h1>
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      <form onSubmit={handleSubmit} className="mb-3">
        {/* Campos básicos */}
        {/* ... título, descripción, precio, ubicación, categoría (igual que antes) ... */}

        {/* Previsualizar imágenes existentes */}
        <div className="mb-3">
          <label className="form-label">Imágenes actuales</label>
          <div className="d-flex flex-wrap gap-2">
            {currentImages.map((url, idx) => (
              <div key={idx} style={{ width: 120, height: 80, position: 'relative' }}>
                <Image src={url} alt={`img-${idx}`} fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Subir nuevas imágenes (múltiples) */}
        <div className="mb-3">
          <label className="form-label">Añadir imágenes (Opcional)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="form-control"
            onChange={e => setNewImages(Array.from(e.target.files))}
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary me-2">
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
        <button type="button" onClick={() => router.back()} className="btn btn-outline-secondary">
          Cancelar
        </button>
      </form>
    </div>
  );
}
