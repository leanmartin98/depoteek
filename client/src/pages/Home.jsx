import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">Welcome my E-commerce</h1>
                <p className="hero-subtitle">
                    Encuentra los mejores productos al mejor precio
                </p>
                <Link to="/products" className="btn-primary hero-btn">
                Ver productos
                </Link>
            </div>
        </section>

        <section className="features-section">
          <div className="container-main">
            <h2 className="title-main">¿Por qué elegirnos?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <h3>Envío Gratis</h3>
                <p>En todas tus compras superiores a $500</p>
              </div>
              <div className="feature-item">
                <h3>Garantia Total</h3>
                <p>30 dias para devolver sin preguntas</p>
              </div>
              <div className="feature-item">
                <h3>Soporte 24/7</h3>
                <p>Estamos aquí siempre para brindarte ayuda</p>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default Home;