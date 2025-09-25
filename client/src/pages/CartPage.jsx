import { useCart } from "../context/CartContext";

const CartPage = () => {
    const { items, total, removeItem, updateQuantity, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="container-main">
                <div className="cart-empty">
                    <h2 className="title-main">Tu carrito esta vacio</h2>
                    <p className="text-gray-600 text-center">
                        ¡Agrega algunos productos para comenzar!
                    </p>
                </div>
            </div>
        )
    };

    return (
        <div className="container-main">
            <h2 className="title-main">Tu carrito de Compras</h2>

            <div className="cart-items">
                {items.map(item => (
                    <div key={item.id} className="cart-item">
                        <div className="cart-item-info">
                            <h3 className="cart-item-name">{item.name}</h3>
                            <p className="cart-item-category">Categoria: {item.category_name}</p>
                            <p className="cart-item-price">{item.price}</p>
                            <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
                        </div>

                        <div className="cart-item-actions">
                            {/* Aqui estan los controles de cantidad */}
                            <div className="quantity-controls">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="quantity-btn">-</button>
                                <span className="quantity-display">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="quantity-btn">+</button>
                            </div>

                            <p className="cart-item-subtotal">
                                subtotal: ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button onClick={() => removeItem(item.id)} className="btn-remove">
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <div className="cart-total">
                    <h3>Total: ${total.toFixed(2)}</h3>
                </div>
                <div className="cart-actions">
                    <button onClick={clearCart} className="btn-secondary">
                        Vaciar carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;