import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para poder redirigir al usuario

const CrearOferta = () => {
  const navigate = useNavigate();
  
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    descripcion: '',
    interes: ''
  });

  // Estado para la previsualización de la foto
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Creamos URL temporal para ver la foto
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la conexión al backend. Por ahora, simulamos éxito.
    alert("¡Oferta creada con éxito! (Simulación)");
    console.log("Datos guardados:", formData);
    
    // Redirigimos al usuario al inicio después de "guardar"
    navigate('/');
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4 fw-bold">Nuevo Trueque</h2>
              
              <form onSubmit={handleSubmit}>
                {/* Título */}
                <div className="mb-3">
                  <label className="form-label">¿Qué ofreces?</label>
                  <input 
                    type="text" 
                    name="titulo"
                    className="form-control" 
                    placeholder="Ej: Guitarra eléctrica" 
                    required 
                    onChange={handleChange}
                  />
                </div>

                {/* Categoría */}
                <div className="mb-3">
                  <label className="form-label">Categoría</label>
                  <select className="form-select" name="categoria" required onChange={handleChange}>
                    <option value="">Selecciona una opción...</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="hogar">Hogar & Muebles</option>
                    <option value="ropa">Ropa & Accesorios</option>
                    <option value="deportes">Deportes</option>
                    <option value="libros">Libros</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>

                {/* Imagen con Previsualización */}
                <div className="mb-3">
                  <label className="form-label">Foto del producto</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    required
                  />
                  {/* Zona de Preview */}
                  {preview && (
                    <div className="mt-3 text-center bg-light p-2 rounded">
                      <p className="small text-muted mb-1">Vista previa:</p>
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="img-fluid rounded shadow-sm" 
                        style={{ maxHeight: '200px' }}
                      />
                    </div>
                  )}
                </div>

                {/* Descripción */}
                <div className="mb-3">
                  <label className="form-label">Descripción / Estado</label>
                  <textarea 
                    className="form-control" 
                    name="descripcion"
                    rows="3" 
                    placeholder="Detalla el estado, tiempo de uso, etc."
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Interés */}
                <div className="mb-4">
                  <label className="form-label fw-bold text-primary">¿Qué buscas a cambio?</label>
                  <input 
                    type="text" 
                    name="interes"
                    className="form-control border-primary" 
                    placeholder="Ej: Un monitor, o abierto a ofertas"
                    required
                    onChange={handleChange}
                  />
                </div>

                {/* Botones de Acción */}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Publicar Oferta
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/')}
                  >
                    Cancelar
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearOferta;
