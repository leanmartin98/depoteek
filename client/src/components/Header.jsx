import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
    const { getItemCount } = useCart();
    const { user, logout, isAuthenticated } = useAuth();

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
                     Cart {getItemCount()}
                    </Link>

                    {isAuthenticated() ? (
                        <>
                        <span className="nav-link">
                            Hola, {user?.first_name || user?.email}
                        </span>
                        <Link to='/profile' className="nav-link">
                        Perfil
                        </Link>
                        <button onClick={logout} className="nav-link">
                            Cerrar Sesión
                        </button>
                        </>
                    ) : (
                        <>
                        <Link to='/login' className="nav-link">Login</Link>
                        <Link to='/register' className="nav-link">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;