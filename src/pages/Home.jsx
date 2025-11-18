import React from 'react';
import { publicaciones } from '../data/mockData.js'; // Importamos los datos falsos

const Inicio = () => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Mercado de Trueques</h1>
        <p className="lead text-muted">Intercambia lo que tienes por lo que necesitas.</p>
      </div>

      {/* Filtros visuales (Solo visuales por ahora) */}
      <div className="d-flex justify-content-center gap-2 mb-4">
        <button className="btn btn-outline-primary rounded-pill">Todos</button>
        <button className="btn btn-outline-secondary rounded-pill">Tecnología</button>
        <button className="btn btn-outline-secondary rounded-pill">Ropa</button>
        <button className="btn btn-outline-secondary rounded-pill">Hogar</button>
      </div>

      {/* Grid de Productos */}
      <div className="row">
        {publicaciones.map((item) => (
          <div className="col-md-4 col-sm-6 mb-4" key={item.id}>
            <div className="card h-100 shadow-sm border-0">
              <img src={item.imagen} className="card-img-top" alt={item.titulo} />
              
              <div className="card-body d-flex flex-column">
                <div className="mb-2">
                  <span className="badge bg-info text-dark">{item.categoria}</span>
                </div>
                <h5 className="card-title">{item.titulo}</h5>
                <p className="card-text text-muted small">{item.descripcion}</p>
                
                <div className="mt-auto">
                    <p className="fw-bold text-primary mb-1">Busca: {item.interes}</p>
                    <button className="btn btn-primary w-100 mt-2">
                      Ofertar Trueque
                    </button>
                </div>
              </div>
              <div className="card-footer bg-white border-top-0">
                <small className="text-muted">Publicado por: {item.usuario}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inicio;
