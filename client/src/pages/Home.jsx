import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero section con imagen */}
        <section className="hero-section-image">
          {/* Contenedor con dos columnas */}
            <div className="hero-content-split">
              {/* Columna izquierda - texto */}
              <div className="hero-text">
                <h1 className="hero-title-large">Welcome my E-commerce</h1>
                <p className="hero-subtitle-large">
                    Discover the best products at unbeatable prices!
                </p>
                <Link to="/products" className="hero-btn-large">
                View products
                </Link>
              </div>
              {/* columna derecha - imagen */}
              <div className="hero-image-container">
                <img src="/img/cyber-monday-shopping.avif" alt="featured product" className="hero-product-image" />
              </div>
            </div>
        </section>

        <section className="features-section">
          <div className="container-main">
            <h2 className="title-main">Why shop with us?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <h3>Enjoy free shipping</h3>
                <p>On all orders over $500</p>
              </div>
              <div className="feature-item">
                <h3>100% satisfaction guaranteed</h3>
                <p>30-day hassle-free returns</p>
              </div>
              <div className="feature-item">
                <h3>Support 24/7</h3>
                <p>We’re always here to help you</p>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default Home;