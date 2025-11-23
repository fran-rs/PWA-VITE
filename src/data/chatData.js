export const conversacionesIniciales = [
  {
    id: 1,
    usuario: "Juan Perez",
    avatar: "https://i.pravatar.cc/150?u=juan",
    ultimoMensaje: "Hola, ¿aún tienes la bici?",
    mensajes: [
      { id: 1, texto: "Hola, ¿aún tienes la bici?", enviadoPorMi: false, hora: "10:00" },
      { id: 2, texto: "Sí, todavía la tengo.", enviadoPorMi: true, hora: "10:05" }
    ]
  },
  {
    id: 2,
    usuario: "Ana Maria",
    avatar: "https://i.pravatar.cc/150?u=ana",
    ultimoMensaje: "Te ofrezco mi colección de libros",
    mensajes: [
      { id: 1, texto: "Te ofrezco mi colección de libros", enviadoPorMi: false, hora: "09:30" }
    ]
  },
  {
    id: 3,
    usuario: "Carlos Tech",
    avatar: "https://i.pravatar.cc/150?u=carlos",
    ultimoMensaje: "¿Aceptas cambios por electrónica?",
    mensajes: [
      { id: 1, texto: "¿Aceptas cambios por electrónica?", enviadoPorMi: false, hora: "Yesterday" }
    ]
  }
];

// Respuestas automáticas del "bot" para simular vida
export const respuestasBot = [
  "¡Me interesa mucho! ¿Cuándo podemos vernos?",
  "Déjame pensarlo y te aviso.",
  "¿Tiene algún detalle estético?",
  "Trato hecho. ¿En qué metro nos juntamos?",
  "Vale, me sirve."
];