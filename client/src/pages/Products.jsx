import { useState, useEffect } from "react";
import { productAPI } from "../services/api";
import  ProductList  from "../components/ProductList";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    //obtener productos de la DB
    productAPI.getAll()
    .then(data => {
      setProducts(data);
      setLoading(false)
    })
    .catch(error => {
      console.error('Error obteniendo productos:' , error);
      setLoading(false);
    });
  }, []);

  return (
    <div>
        <div className="page-header">
            <h1 className="page-title">All our products</h1>
            <p className="page-subtitle">
                Explore our complete collection
            </p>
        </div>

        <ProductList 
        products={products}
        loading={loading}
        />
    </div>
  );
};

export default Products;