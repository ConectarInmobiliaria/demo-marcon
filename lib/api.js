// lib/api.js
import { supabase } from './supabaseClient';

/**
 * Obtiene todas las propiedades desde Supabase.
 * Ajusta los nombres de columnas según tu tabla.
 * Ejemplo: supabase.from('propiedades').select('id, titulo, descripcion, precio, imagen_url')
 */
export async function fetchPropiedades() {
  // Ajusta el nombre de la tabla y columnas según tu esquema en Supabase
  const { data, error } = await supabase
    .from('propiedades')
    .select('id, titulo, descripcion, precio, imagen_url'); 
  if (error) {
    console.error('Error fetchPropiedades:', error);
    throw new Error(error.message);
  }
  // Mapear a la forma que usarás en el frontend
  // por ejemplo, estandarizar campo imagenUrl
  return data.map(item => ({
    id: item.id,
    titulo: item.titulo,
    descripcion: item.descripcion,
    precio: item.precio,
    // si en Supabase la columna se llama `imagen_url`, la convertimos:
    imagenUrl: item.imagen_url,
  }));
}

/**
 * Obtiene una propiedad por ID.
 */
export async function fetchPropiedadById(id) {
  const { data, error } = await supabase
    .from('propiedades')
    .select('id, titulo, descripcion, precio, ubicacion, imagen_url')
    .eq('id', id)
    .single();
  if (error) {
    console.error('Error fetchPropiedadById:', error);
    throw new Error(error.message);
  }
  return {
    id: data.id,
    titulo: data.titulo,
    descripcion: data.descripcion,
    precio: data.precio,
    ubicacion: data.ubicacion,
    imagenUrl: data.imagen_url,
  };
}
