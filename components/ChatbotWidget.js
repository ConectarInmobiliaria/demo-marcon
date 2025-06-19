// components/ChatbotWidget.js
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // array de { from: 'bot' | 'user', text: string }
  const [awaitingOption, setAwaitingOption] = useState(false);
  const scrollRef = useRef(null);

  // Al abrir el chat por primera vez, mandar saludo inicial
  const openChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        const greeting = {
          from: 'bot',
          text: '¡Hola! 👋 Soy MarconBot. ¿En qué te puedo ayudar hoy?',
        };
        const optionsPrompt = {
          from: 'bot',
          text: 'Selecciona una opción:',
        };
        setMessages([greeting, optionsPrompt]);
        setAwaitingOption(true);
      }, 300);
    }
  };

  // Auto‐scroll al fondo cada vez que cambia `messages`
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Cuando el usuario elige una opción
  const handleOption = (optionText) => {
    // 1) Agregar el mensaje del usuario
    setMessages((prev) => [...prev, { from: 'user', text: optionText }]);
    setAwaitingOption(false);

    // 2) Respuesta automática tras un breve retraso
    setTimeout(() => {
      let botReply;
      switch (optionText) {
        case 'Tasaciones':
          botReply = {
            from: 'bot',
            text:
              'Realizamos tasaciones profesionales basadas en más de 30 años de experiencia. ¿Querés que te enviemos más info?',
          };
          break;
        case 'Administración de Propiedades':
          botReply = {
            from: 'bot',
            text:
              'Ofrecemos administración integral de tus inmuebles: alquileres, mantenimiento y cobros. ¿Te gustaría contactarte ahora?',
          };
          break;
        case 'Comercialización de Alquileres':
          botReply = {
            from: 'bot',
            text:
              'Nos encargamos de publicar y gestionar tu alquiler. Filtramos postulantes y garantizamos cobros. ¿Te gustaría hablar con un asesor?',
          };
          break;
        default:
          botReply = {
            from: 'bot',
            text: '¡Entendido! Si necesitas más ayuda, podés contactarnos:',
          };
          break;
      }

      // 3) Agregar la respuesta del bot y luego mostrar CTA
      setMessages((prev) => [...prev, botReply]);

      setTimeout(() => {
        // Mensaje final con CTA
        const finalMsg = {
          from: 'bot',
          text: 'Podés escribirnos por WhatsApp o completar el formulario de contacto:',
        };
        setMessages((prev) => [...prev, finalMsg]);
      }, 700);
    }, 700);
  };

  // Renderiza el listado de mensajes
  const renderMessages = () =>
    messages.map((m, i) => (
      <div
        key={i}
        className={`d-flex mb-2 ${
          m.from === 'bot' ? 'justify-content-start' : 'justify-content-end'
        }`}
      >
        <div
          className={`p-2 rounded ${
            m.from === 'bot' ? 'bg-light text-dark' : 'bg-primary text-white'
          }`}
          style={{ maxWidth: '70%', wordBreak: 'break-word' }}
        >
          {m.text}
        </div>
      </div>
    ));

  return (
    <>
      {/* 1) Botón flotante (logo circular) */}
      <div
        className="position-fixed"
        style={{
          bottom: '20px',
          right: '20px',
          zIndex: 1050,
        }}
      >
        <button
          onClick={openChat}
          className="rounded-circle border-0"
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: 'transparent',
            backgroundImage: "url('/logochat.png')",
            backgroundSize: 'cover',
            cursor: 'pointer',
          }}
          aria-label="Abrir chat"
        />
      </div>

      {/* 2) Ventana del chat */}
      {isOpen && (
        <div
          className="position-fixed bg-white border rounded shadow d-flex flex-column"
          style={{
            bottom: '90px',
            right: '20px',
            width: '300px',
            height: '400px',
            zIndex: 1040,
          }}
        >
          {/* Header del chat */}
          <div className="d-flex justify-content-between align-items-center p-2 bg-primary text-white rounded-top">
            <strong>MarconBot</strong>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm btn-light text-primary"
              style={{ lineHeight: 1, padding: '0 6px' }}
            >
              ✕
            </button>
          </div>

          {/* Cuerpo: mensajes */}
          <div
            className="flex-grow-1 p-2 overflow-auto"
            ref={scrollRef}
            style={{ backgroundColor: '#f8f9fa' }}
          >
            {renderMessages()}

            {/* Botones de opciones (solo si estamos esperando que el usuario elija) */}
            {awaitingOption && (
              <div className="mt-2">
                {[
                  'Tasaciones',
                  'Administración de Propiedades',
                  'Comercialización de Alquileres',
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOption(opt)}
                    className="btn btn-outline-primary btn-sm me-2 mb-2"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Botones de CTA (aparecen luego de la respuesta del bot final) */}
            {!awaitingOption &&
              messages.some((m) =>
                m.text.toLowerCase().includes('whatsapp')
              ) && (
                <div className="mt-3">
                  <a
                    href="https://wa.me/543764579547"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success btn-sm w-100 mb-2"
                  >
                    Chatear por WhatsApp
                  </a>
                  <Link href="/contacto" className="btn btn-secondary btn-sm w-100">
                    Ir al formulario de contacto
                  </Link>
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
}
