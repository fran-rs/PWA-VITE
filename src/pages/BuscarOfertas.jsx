import React, { useState, useEffect } from 'react';
import { publicaciones } from '../data/mockData'; // Importamos tus datos

const Buscar = () => {
  // Estado para guardar el texto que escribe el usuario
  const [busqueda, setBusqueda] = useState('');
  // Estado para la categoría seleccionada
  const [categoria, setCategoria] = useState('todas');
  // Estado para los resultados filtrados
  const [resultados, setResultados] = useState(publicaciones);

  // EL MOTOR DE BÚSQUEDA (UseEffect)
  // Cada vez que cambie 'busqueda' o 'categoria', esto se ejecuta automáticamente
  useEffect(() => {
    const filtrados = publicaciones.filter((item) => {
      // 1. Filtro por texto (convertimos a minúsculas para que no importen las mayúsculas)
      const coincideTexto = item.titulo.toLowerCase().includes(busqueda.toLowerCase()) || 
                            item.descripcion.toLowerCase().includes(busqueda.toLowerCase());
      
      // 2. Filtro por categoría
      const coincideCategoria = categoria === 'todas' ? true : item.categoria.toLowerCase() === categoria.toLowerCase();

      return coincideTexto && coincideCategoria;
    });

    setResultados(filtrados);
  }, [busqueda, categoria]);

  return (
    <div className="container mt-5 mb-5">
      
      {/* SECCIÓN DE CONTROLES (Buscador y Filtros) */}
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8">
          <div className="card p-3 shadow-sm border-0 bg-light">
            <h4 className="mb-3">¿Qué estás buscando?</h4>
            <div className="row g-2">
              
              {/* Input de Texto */}
              <div className="col-md-8">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">🔍</span>
                  <input 
                    type="text" 
                    className="form-control border-start-0" 
                    placeholder="Ej: Monitor, Libros, Silla..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
              </div>

              {/* Select de Categoría */}
              <div className="col-md-4">
                <select 
                  className="form-select" 
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="todas">Todas las categorías</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="hogar">Hogar</option>
                  <option value="ropa">Ropa</option>
                  <option value="deportes">Deportes</option>
                  <option value="libros">Libros</option>
                </select>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE RESULTADOS */}
      <div className="row">
        {/* Mensaje si no hay resultados */}
        {resultados.length === 0 && (
          <div className="text-center mt-4">
            <h3 className="text-muted">😕 No encontramos trueques con esa descripción.</h3>
            <p>Intenta con otra palabra o categoría.</p>
          </div>
        )}

        {/* Mapeo de Resultados (Reutilizando el diseño de card) */}
        {resultados.map((item) => (
          <div className="col-md-4 col-sm-6 mb-4" key={item.id}>
            <div className="card h-100 shadow-sm border-0 hover-effect">
              <img 
                src={item.imagen} 
                className="card-img-top" 
                alt={item.titulo} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title text-truncate">{item.titulo}</h5>
                  <span className="badge bg-secondary rounded-pill">{item.categoria}</span>
                </div>
                <p className="card-text text-muted small flex-grow-1">
                  {item.descripcion.substring(0, 80)}...
                </p>
                <div className="mt-3 pt-3 border-top">
                  <p className="fw-bold text-primary small mb-1">Busca: {item.interes}</p>
                  <button className="btn btn-outline-primary w-100 btn-sm">
                    Ver Detalle
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buscar;
