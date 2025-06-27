Inmobiliaria Marcon

Repositorio oficial de la aplicación web de Inmobiliaria Marcon.

📂 Estructura del proyecto

app/ — Rutas y páginas (App Router)

components/ — Componentes React reutilizables

lib/ — Conexiones y utilidades (Prisma, autenticación)

prisma/ — Esquema, migraciones y seed

public/ — Archivos estáticos (imágenes, uploads)

🚀 Despliegue y configuración local

1. Clonar el repositorio

git clone https://bitbucket.org/demo-inmob/marcon.git
cd marcon

2. Instalar dependencias

npm install

3. Configurar variables de entorno

Crea un archivo .env en la raíz con estas variables (ajusta según tu entorno MySQL):

# URL de conexión a MySQL
DATABASE_URL="mysql://usuario:password@localhost:3306/inmobiliaria_demo"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu_nextauth_secret"

# Mail (opcional)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_SECURE=false
EMAIL_SERVER_USER=tu_email@gmail.com
EMAIL_SERVER_PASSWORD=tu_app_password
CONTACT_DESTINATION_EMAIL=tu_email@gmail.com

4. Inicializar la base de datos

Arrancar MySQL y crear la base de datos:

CREATE DATABASE inmobiliaria_demo;

Ejecutar migraciones Prisma:

npx prisma migrate deploy
# o si es entorno de desarrollo:
npx prisma migrate dev --name init_mysql

Generar Prisma Client:

npx prisma generate

Cargar datos de ejemplo (seed):

node prisma/seed.js

5. Ejecutar en modo desarrollo

npm run dev

Abrir http://localhost:3000 en navegador.

6. Construir para producción

npm run build
npm start


🛠️ Notas adicionales

Usuario y la contraseña en MySQL con permisos adecuados.

Para el envío de correo, configurar correctamente las credenciales SMTP.

Ajustar repositorio remoto si cambia la URL del proyecto:

git remote set-url origin https://bitbucket.org/demo-inmob/marcon.git

© 2025 Inmobiliaria Marcon