import CategorieSideBar from "../components/CategorieSideBar";
import ProductsGrid from "../components/ProductsGrid";
import Search from "../components/Search";
import OrderingProducts from "../components/OrderingProducts";
import "./pagesStyles/Store.css";
import React, { useState, useEffect, Suspense } from "react";
import { useGetCategories } from "../hooks/useGetCategories";
import { useGetPromotions } from "../hooks/useGetPromotionsFromProducts";
import ActiveFilters from "../components/ActiveFilters";
import Loader from "@/components/Loader";

function Store() {
  const [activeProductDetails, setActiveProductDetails] = useState(false);
  const [detail, setDetail] = useState({});
  const { categories, loading } = useGetCategories();
  const { promotions, loadingPromotions } = useGetPromotions();
  const ProductDetails2 = React.lazy(() => import("../components/ProductDetails/ProductDetail2"))

  useEffect(() => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = activeProductDetails ? "hidden" : "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [activeProductDetails]);

  const handleOnactivateProductdetails = (product) => {
    setDetail(product);
    setActiveProductDetails(true);
  };
  return (
    <section className={"store-page"}>
      <aside>
        <CategorieSideBar
          loading={loading}
          loadingPromotions={loadingPromotions}
          categories={categories}
          promotions={promotions}
        />
      </aside>
      <search>
        <section className="search-product">
          <h3>Productos</h3>
          <section className="search-order-container">
            <Search />
            <OrderingProducts />
          </section>
        </section>
      </search>
      <main>
        <div className = "store-page-active-filters-component-container">
          <ActiveFilters/>
        </div>
        <ProductsGrid activateProductdetails={handleOnactivateProductdetails} />
      </main>

      <Suspense fallback = {<Loader/>}>
        <ProductDetails2
          active={activeProductDetails}
          onHide={() => setActiveProductDetails(false)}
          data={detail}
        />
      </Suspense>
      
    </section>
  );
}

export default Store;
