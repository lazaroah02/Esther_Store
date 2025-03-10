import {FilterIcon} from "@/icons/FilterIcon";
import { Dialog } from "primereact/dialog";
import React, { useState, useContext, useEffect, Suspense } from "react";
import {Checkbox} from 'primereact/checkbox'
import QueryFiltersContext from "@/context/filtersContext";
import "./index.css";
import { Skeleton } from "primereact/skeleton";
const OrderingProducts = React.lazy(() => import("@/components/StorePageComponents/OrderingProducts")) 
const CategoriesFilter = React.lazy(() => import("./CategoriesFilter")) 
const PromotionsFilter = React.lazy(() => import("./PromotionsFilter"))

function FiltersModal() {
  const [showModal, setShowModal] = useState(false);
  const [recommendedFilterCheck, setRecommendedFilterCheck] = useState(false)
  const [inactiveFilterCheck, setInactiveFilterCheck] = useState(false)
  const {searchParams, setFilter, removeFilter, getActiveFilter} = useContext(QueryFiltersContext)

  function updateRecommendedFilter(value){
    value == true? setFilter({name:"recommended", value:value}): removeFilter("recommended")
    setRecommendedFilterCheck(value)
  }

  function updateInactiveFilter(value){
    value == true? setFilter({name:"is_active", value:!value}): removeFilter("is_active")
    setInactiveFilterCheck(value)
  }

  //update the recommende and inactive filter by the searchParams 
  useEffect(() => {
    getActiveFilter("recommended") == ""?setRecommendedFilterCheck(false):setRecommendedFilterCheck(true)
    getActiveFilter("is_active") == ""?setInactiveFilterCheck(false):setInactiveFilterCheck(true)
  },[searchParams])

  return (
    <section>
      <button
        className="products-management-filters-bar-button btn-general-styles"
        onClick={() => setShowModal(true)}
      >
        <FilterIcon/>
        <span>Filtros</span>
      </button>
      <Dialog
        contentClassName="categories-mobile-modal-content products-management-filters-modal"
        visible={showModal}
        position="top"
        showHeader={false}
        draggable={false}
        resizable={false}
      >
        <button
          className="close-modal-button btn-general-styles"
          onClick={() => setShowModal(false)}
        >
          X
        </button>
        <Suspense fallback = {<Skeleton width="150px" height = "50px"/>}>
          <OrderingProducts onOrdering = {() => setShowModal(false)}/>
        </Suspense>
        <div style = {{height:"10px"}}/>
        <Suspense fallback = {<Skeleton width="150px" height = "50px"/>}>
          <CategoriesFilter onCategorySelect={() => setShowModal(false)}/>
        </Suspense>
        <div style = {{height:"10px"}}/>
        <Suspense fallback = {<Skeleton width="150px" height = "50px"/>}>
          <PromotionsFilter onPromotionSelect={() => setShowModal(false)}/>
        </Suspense>
        {/*products recommended filter*/}
        <div className="recommended-products-checkbox">
          <Checkbox
            id="recommended"
            aria-describedby="recommended-help"
            checked={recommendedFilterCheck}
            onChange={(e) => updateRecommendedFilter(e.checked)}
          />
          <label htmlFor="active">Recommendados</label>
        </div>
        {/*inactive products filter*/}
        <div className="recommended-products-checkbox">
          <Checkbox
            id="inactive"
            aria-describedby="inactive-help"
            checked={inactiveFilterCheck}
            onChange={(e) => updateInactiveFilter(e.checked)}
          />
          <label htmlFor="active">No Visibles</label>
        </div>
      </Dialog>
    </section>
  );
}

export default FiltersModal;
