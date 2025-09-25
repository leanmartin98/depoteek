import ProductCard from "./ProductCard"
import '../styles/components.css';

const ProductList = ({ products, loading }) => {
    if (loading) {
        return <div className="loading">Loading products...</div>
    }

    return (
        <div className="container-main">
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default ProductList;