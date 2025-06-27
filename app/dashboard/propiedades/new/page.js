'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function NewPropertyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  const [images, setImages] = useState([]); // archivos seleccionados
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (status !== 'authenticated') {
      setErrorMsg('Debes iniciar sesión para crear una propiedad');
      return;
    }
    if (!title || !description || !price || !location || !categoryId) {
      setErrorMsg('Completa todos los campos obligatorios');
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ Subir y convertir imágenes
      let otherImageUrls = [];
      if (images.length) {
        const formData = new FormData();
        images.forEach((img) => formData.append('images', img));
        const uploadRes = await fetch('/api/upload-images', {
          method: 'POST',
          body: formData,
        });
        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadJson.error || 'Error subiendo imágenes');
        otherImageUrls = uploadJson.urls;
      }

      // 2️⃣ Crear propiedad en tu API (Prisma)
      const res = await fetch('/api/propiedades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          price: parseFloat(price),
          location,
          categoryId: parseInt(categoryId, 10),
          imageUrl: otherImageUrls[0] || null, // primera imagen como principal
          otherImageUrls,                      // array JSON
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error al crear propiedad');

      router.push('/dashboard/propiedades');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Nueva Propiedad</h1>
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título *</label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción *</label>
          <textarea
            id="description"
            className="form-control"
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="price" className="form-label">Precio *</label>
            <input
              id="price"
              type="number"
              step="0.01"
              className="form-control"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="location" className="form-label">Ubicación *</label>
            <input
              id="location"
              type="text"
              className="form-control"
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="category" className="form-label">Categoría *</label>
            <select
              id="category"
              className="form-select"
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              required
              disabled={loading}
            >
              <option value="">-- Selecciona categoría --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="images" className="form-label">
            Imágenes (puedes seleccionar varias)
          </label>
          <input
            id="images"
            type="file"
            accept="image/*"
            multiple
            className="form-control"
            onChange={handleImageChange}
            disabled={loading}
          />
        </div>

        <div className="d-flex">
          <button
            type="submit"
            className="btn btn-primary me-2"
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Guardar'}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
