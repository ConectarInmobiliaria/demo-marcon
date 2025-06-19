// app/api/contact/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { nombre, email, mensaje } = await request.json();

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // Leer variables de entorno
    const {
      EMAIL_SERVER_HOST,
      EMAIL_SERVER_PORT,
      EMAIL_SERVER_USER,
      EMAIL_SERVER_PASSWORD,
      EMAIL_SERVER_SECURE,
      CONTACT_DESTINATION_EMAIL,
    } = process.env;

    if (
      !EMAIL_SERVER_HOST ||
      !EMAIL_SERVER_PORT ||
      !EMAIL_SERVER_USER ||
      !EMAIL_SERVER_PASSWORD ||
      !CONTACT_DESTINATION_EMAIL
    ) {
      console.error('Faltan variables SMTP en entorno');
      return NextResponse.json({ error: 'Configuración de email incorrecta' }, { status: 500 });
    }

    // Configurar transporte
    const transporter = nodemailer.createTransport({
      host: EMAIL_SERVER_HOST,
      port: Number(EMAIL_SERVER_PORT),
      secure: EMAIL_SERVER_SECURE === 'true', // true para puerto 465
      auth: {
        user: EMAIL_SERVER_USER,
        pass: EMAIL_SERVER_PASSWORD,
      },
    });

    // Construir el email
    const mailOptions = {
      from: `"Sitio Web Contacto" <${EMAIL_SERVER_USER}>`,
      to: CONTACT_DESTINATION_EMAIL,
      subject: `Nuevo mensaje de contacto de ${nombre}`,
      text: `
Has recibido un nuevo mensaje de contacto:

Nombre: ${nombre}
Email: ${email}

Mensaje:
${mensaje}
      `,
      html: `
        <p>Has recibido un nuevo mensaje de contacto:</p>
        <ul>
          <li><strong>Nombre:</strong> ${nombre}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.messageId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error en API /api/contact:', error);
    return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 });
  }
}
