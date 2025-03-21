import "./index.css";
import Loader from "../../../Loaders/Loader";
import ProductManagementCard from "./ProductManagementCard";
import React from "react";

const ProductsGrid = React.memo(function ProductsGrid({
  products,
  loading,
  selectedProducts,
  showCheckboxes,
  setSelectedProducts,
  handleDeleteProduct,
  processUpdateProduct,
  processDetailProduct,
}) {
  function handleCheckProduct({ checked, product }) {
    // Si el checkbox está marcado, agregar el producto al array de seleccionados
    if (checked) {
      setSelectedProducts((prev) => [...prev, product]);
    } else {
      // Si el checkbox no está marcado, quitar el producto del array de seleccionados
      setSelectedProducts((prev) =>
        prev.filter((item) => item.id !== product.id)
      );
    }
  }
  return (
    <section className="products-management-grid">
      {loading ? (
        <section className="products-management-grid-loader-container">
            <Loader />
        </section>
      ) : null}
      {products.map((product) => (
        <ProductManagementCard
          key={product.id}
          product={product}
          handleDeleteProduct={handleDeleteProduct}
          processUpdateProduct={processUpdateProduct}
          processDetailProduct={processDetailProduct}
          selectedProducts = {selectedProducts}
          showCheckboxes = {showCheckboxes}
          handleCheckProduct={handleCheckProduct}
        />
      ))}
    </section>
  );
})

export default ProductsGrid;
