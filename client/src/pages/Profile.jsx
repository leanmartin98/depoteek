import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import '../styles/components.css';

const Profile = () => {
    const { user, logout } = useAuth();
    const { items, total, getItemCount } = useCart();

    return (
        <div className="container-main">
            <div className="profile-container">
                <h1 className="title-main">My Profile</h1>

                {/* Información del usuario */}
                <div className="profile-card">
                    <h2 className="profile-section-title">
                        Personal Information
                    </h2>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="profile-avatar">
                            {user?.first_name?.charAt(0)}
                            {user?.last_name?.charAt(0)}
                            </div>

                            <div>
                            <h3 className="profile-user-name">
                            {user?.first_name} 
                            {user?.last_name}
                            </h3>
                            <p className="profile-user-email">
                                {user?.email}
                            </p>
                            </div>
                        </div>

                        <div className="profile-info-grid">
                            <div className="profile-info-item">
                                <p className="profile-info-label">Name</p>
                                <p className="profile-info-value">{user?.first_name}</p>
                            </div>

                            <div className="profile-info-item">
                                <p className="profile-info-label">Last Name</p>
                                <p className="profile-info-value">{user?.last_name}</p>
                            </div>

                            <div className="profile-info-item profile-info-item-full">
                                <p className="profile-info-label">Email</p>
                                <p className="profile-info-value">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resumen del carrito */}
                <div className="profile-card">
                    <h2 className="profile-section-title">
                        My current cart
                    </h2>

                    {items.length === 0 ? (
                        <p className="text-gray-600">You have no products in your cart</p>
                    ) : (
                        <div>
                            <div className="space-y-4">
                                {items.map(item => (
                                    <div key={item.id} className="profile-cart-item">
                                        <div className="profile-cart-item-info">
                                            <p className="profile-cart-item-name">{item.name}</p>
                                            <p className="profile-cart-item-quantity">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="profile-cart-item-price">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="profile-cart-total">
                                <div className="profile-cart-total-row">
                                    <span>Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <p className="profile-cart-total-info">
                                    {getItemCount()} {getItemCount() === 1 ? 'product' : 'products'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Acciones */}
                <div className="profile-card">
                    <h2 className="profile-section-title">
                        Actions
                    </h2>

                    <div className="space-y-4">
                        <button
                        onClick={logout} className="profile-action-button">Sign out</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;