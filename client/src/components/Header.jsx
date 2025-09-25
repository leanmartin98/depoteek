import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Header = () => {
    const { getItemCount } = useCart();

    return (
        <header className="header sticky">
            <div className="header-container">
                <div className="header-brand">
                    <Link to="/" className="brand-title">Depoteek</Link>
                </div>


                <nav className="header-nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/products" className="nav-link">Products</Link>
                    <Link to="/cart" className="nav-link">
                     Cart({getItemCount()})
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;