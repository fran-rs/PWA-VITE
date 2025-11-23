import React, { useState, useEffect, useRef } from 'react';
import { conversacionesIniciales, respuestasBot } from '../data/chatData';

const Chat = () => {
  // Estado 1: La lista de todos los chats
  const [chats, setChats] = useState(conversacionesIniciales);
  // Estado 2: El chat que está abierto actualmente (por defecto el primero)
  const [chatActivo, setChatActivo] = useState(chats[0]);
  // Estado 3: El mensaje que estás escribiendo
  const [mensajeNuevo, setMensajeNuevo] = useState("");
  // Estado 4: Simular "Escribiendo..."
  const [escribiendo, setEscribiendo] = useState(false);

  // Referencia para hacer scroll automático al final
  const messagesEndRef = useRef(null);

  // Función para hacer scroll al fondo cada vez que llega un mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatActivo.mensajes, escribiendo]); // Se ejecuta cuando cambian los mensajes

  // LOGICA DE ENVIAR MENSAJE
  const handleEnviar = (e) => {
    e.preventDefault();
    if (!mensajeNuevo.trim()) return;

    // 1. Crear tu mensaje
    const nuevoMsg = {
      id: Date.now(),
      texto: mensajeNuevo,
      enviadoPorMi: true,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // 2. Agregarlo al chat activo
    const chatActualizado = {
      ...chatActivo,
      mensajes: [...chatActivo.mensajes, nuevoMsg]
    };

    setChatActivo(chatActualizado);
    setMensajeNuevo(""); // Limpiar input

    // 3. SIMULACIÓN DE RESPUESTA (EL TRUCO DE MAGIA)
    setEscribiendo(true); // Muestra "Escribiendo..."
    
    setTimeout(() => {
      // Elegir respuesta al azar
      const respuestaRandom = respuestasBot[Math.floor(Math.random() * respuestasBot.length)];
      
      const msgBot = {
        id: Date.now() + 1,
        texto: respuestaRandom,
        enviadoPorMi: false,
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Agregar respuesta al chat
      setChatActivo(prev => ({
        ...prev,
        mensajes: [...prev.mensajes, msgBot]
      }));
      
      setEscribiendo(false); // Quitar "Escribiendo..."
    }, 2000); // Espera 2 segundos antes de responder
  };

  return (
    <div className="container mt-4 mb-5" style={{ height: '80vh' }}>
      <div className="card shadow h-100">
        <div className="row g-0 h-100">
          
          {/* COLUMNA IZQUIERDA: Lista de Contactos (Solo visible en móvil si no hay chat activo, pero simplificaremos para MVP) */}
          <div className="col-md-4 border-end d-none d-md-block overflow-auto h-100 bg-light">
            <div className="p-3 border-bottom bg-white sticky-top">
              <h5 className="mb-0 fw-bold">Mensajes</h5>
            </div>
            <div className="list-group list-group-flush">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  className={`list-group-item list-group-item-action border-0 py-3 ${chatActivo.id === chat.id ? 'bg-white border-start border-primary border-4' : 'bg-light'}`}
                  onClick={() => setChatActivo(chat)}
                >
                  <div className="d-flex align-items-center">
                    <img src={chat.avatar} className="rounded-circle me-3" width="45" alt="Avatar" />
                    <div>
                      <h6 className="mb-0 fw-bold">{chat.usuario}</h6>
                      <small className="text-muted text-truncate d-block" style={{maxWidth: '150px'}}>
                        {chat.mensajes[chat.mensajes.length - 1].texto}
                      </small>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* COLUMNA DERECHA: Ventana de Chat */}
          <div className="col-md-8 d-flex flex-column bg-white">
            
            {/* Encabezado del Chat */}
            <div className="p-3 border-bottom d-flex align-items-center bg-light">
               <img src={chatActivo.avatar} className="rounded-circle me-3" width="40" alt="Avatar" />
               <div>
                 <h6 className="mb-0 fw-bold">{chatActivo.usuario}</h6>
                 <small className="text-success">{escribiendo ? 'Escribiendo...' : 'En línea'}</small>
               </div>
            </div>

            {/* Área de Mensajes (Scrollable) */}
            <div className="flex-grow-1 p-4 overflow-auto" style={{ backgroundColor: '#f8f9fa' }}>
              {chatActivo.mensajes.map((msg) => (
                <div key={msg.id} className={`d-flex mb-3 ${msg.enviadoPorMi ? 'justify-content-end' : 'justify-content-start'}`}>
                  <div 
                    className={`p-3 rounded-3 shadow-sm ${msg.enviadoPorMi ? 'bg-primary text-white' : 'bg-white text-dark'}`}
                    style={{ maxWidth: '75%' }}
                  >
                    <p className="mb-1">{msg.texto}</p>
                    <small className={`d-block text-end ${msg.enviadoPorMi ? 'text-light' : 'text-muted'}`} style={{ fontSize: '0.7rem' }}>
                      {msg.hora}
                    </small>
                  </div>
                </div>
              ))}
              {/* Burbuja fantasma para scroll */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input para escribir */}
            <div className="p-3 border-top bg-white">
              <form onSubmit={handleEnviar} className="d-flex gap-2">
                <input 
                  type="text" 
                  className="form-control rounded-pill" 
                  placeholder="Escribe un mensaje..." 
                  value={mensajeNuevo}
                  onChange={(e) => setMensajeNuevo(e.target.value)}
                />
                <button type="submit" className="btn btn-primary rounded-circle p-2" style={{width: '45px', height: '45px'}}>
                  ➤
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;