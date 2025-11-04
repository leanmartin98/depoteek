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
                            Your trusted online store for finding the best products at the best prices. Quality guaranteed.
                        </p>
                    </div>

                    {/* Enlaces rápidos */}
                    <div className="footer-section">
                        <h3 className="footer-subtitle">Links</h3>
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
            <h4 className="footer-subtitle">Information</h4>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">About us</a>
              </li>
              <li>
                <a href="#" className="footer-link">Terms and conditions</a>
              </li>
              <li>
                <a href="#" className="footer-link">Privacy policy</a>
              </li>
              <li>
                <a href="#" className="footer-link">Shipping and returns</a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact</h4>
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
            © 2025 Depoteek. All rights reserved.
          </p>
          </div>
          </div>
        </footer>
    )
};

export default Footer;