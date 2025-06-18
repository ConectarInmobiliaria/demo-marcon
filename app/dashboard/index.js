// pages/dashboard/index.js
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  // Opcional: verificar role
  if (session.user.role !== 'admin' && session.user.role !== 'corredor') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: { session } };
}

export default function DashboardPage({ session }) {
  return (
    <div>
      <h1 className="text-primary text-2xl font-bold">Bienvenido, {session.user.name}</h1>
      {/* Links a gestión de propiedades, etc. */}
    </div>
  );
}

