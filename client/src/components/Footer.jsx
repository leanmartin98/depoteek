import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    {/* Seccion de la marca */}
                    <div className="footer-section">
                        <h3 className="footer-title">Depoteek</h3>
                        <p className="footer-text">
                            Tu tienda online de confianza para encontrar los mejores productos al mejor precio. Calidad garantizada.
                        </p>
                    </div>

                    {/* Enlaces rápidos */}
                    <div className="footer-section">
                        <h3 className="footer-subtitle">Enlaces</h3>
                        <ul className="footer-links">
                            <li>
                                <Link to="/" className="footer-link">Home</Link>
                            </li>
                            <li>
                                <Link to="/products" className="footer-link">Products</Link>
                            </li>
                            <li>
                                <Link to="/cart" className="footer-link">Cart</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Información */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Información</h4>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">Sobre nosotros</a>
              </li>
              <li>
                <a href="#" className="footer-link">Términos y condiciones</a>
              </li>
              <li>
                <a href="#" className="footer-link">Política de privacidad</a>
              </li>
              <li>
                <a href="#" className="footer-link">Envíos y devoluciones</a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Contacto</h4>
            <div className="footer-text">
              <p>📧 info@miecommerce.com</p>
              <p>📞 +54 11 1234-5678</p>
              <p>📍 Buenos Aires, Argentina</p>
            </div>
          </div>
        </div>

        {/* Línea de separación y copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 Mi E-commerce. Todos los derechos reservados.
          </p>

                </div>
            </div>
        </footer>
    )
};

export default Footer;