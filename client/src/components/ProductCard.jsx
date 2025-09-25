import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
    const { addItem } = useCart();

    const handleAddToCart = () => {
        addItem(product);
    };

    return (
        <div className="card">
            {/* Placeholder para imagen - estilo Nike */}
            <div className="card-image-placeholder">
                <img 
                src={product.image_url || 'https://placehold.co/600x400?text=Sin+Imagen&font=roboto'}
                alt={product.name}
                className="card-image"
                loading="lazy"
                onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400?text=Sin+Imagen&font=roboto'
                }}
                />
            </div>

            <div className="card-content">
            <h3 className="card-title">{product.name}</h3>
            <p className="card-subtitle">Categoria: {product.category_name}</p>
            <p className="card-description">{product.description}</p>
            <p className="card-price">{product.price}</p>
            <p className="card-stock">Stock: {product.stock} unidades</p>
            <p className="card-date">Creado: {new Date(product.created_at).toLocaleDateString()}</p>
            <button className="btn-primary" onClick={handleAddToCart}>Add to cart</button>
            </div>
        </div>
    );
}

export default ProductCard;