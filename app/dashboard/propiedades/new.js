// pages/dashboard/propiedades/new.js
import { useState } from 'react';
import { supabaseClient } from '../../lib/supabaseClient'; // ajusta ruta
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function NewPropertyPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      setErrorMsg('Debes iniciar sesión');
      return;
    }
    setLoading(true);
    let imageUrl = null;
    try {
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data, error: uploadError } = await supabaseClient.storage
          .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME)
          .upload(`propiedades/${fileName}`, imageFile);
        if (uploadError) {
          throw new Error(uploadError.message);
        }
        imageUrl = `${process.env.SUPABASE_BUCKET_URL}/propiedades/${fileName}`;
      }
      // Ahora enviamos datos al servidor (API route) para crear con Prisma
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          price: parseFloat(price),
          location,
          categoryId: parseInt(categoryId, 10),
          imageUrl,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Error al crear propiedad');
      }
      // Redirigir a lista de propiedades en dashboard
      router.push('/dashboard/propiedades');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Tendrás que cargar categorías desde API o Prisma
  // Ejemplo: fetch('/api/categories')...
  // Y proteger la página en getServerSideProps o con useSession + redirect client.
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Crear nueva propiedad</h1>
      {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          className="w-full p-2 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ubicación"
          className="w-full p-2 border rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        {/* Selector de categoría */}
        <select
          className="w-full p-2 border rounded"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Selecciona categoría</option>
          {/* Aquí deberás mapear categorías obtenidas de /api/categories */}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files.length) setImageFile(e.target.files[0]);
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
        >
          {loading ? 'Creando...' : 'Crear Propiedad'}
        </button>
      </form>
    </div>
  );
}

