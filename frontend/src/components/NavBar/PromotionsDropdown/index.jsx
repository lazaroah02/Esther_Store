import "./index.css";
import { Dropdown } from "primereact/dropdown";
import React, { useContext, useState, useEffect } from "react";
import QueryFiltersContext from "@/context/filtersContext";
import { useGetCategoriesToManage } from "@/hooks/useGetCategoriesToManage";

function PromotionsDropdown({onPromotionSelect = () => {}}) {
  const { searchParams, setFilter, getActiveFilter, removeFilter } = useContext(QueryFiltersContext);
  const [category, setCategory] = useState();
  const {categories} = useGetCategoriesToManage()
  const categoriesValues = [{name:"Categoría: Todas", code:""}].concat(categories.map(category => ({name:category.nombre, code: category.id})))
  
  //update the category filter value
  function handleSetCategory(value) {
    value.code == ""?removeFilter("categoria"):setFilter({ name: "categoria", value: value.code });
  }

  //get the currrent category filter value from the searchParams context
  useEffect(() => {
    setCategory(categoriesValues.find((value) => value.code == getActiveFilter("categoria")))
  },[searchParams, categories])

  return (
    <Dropdown
      value={category}
      onChange={(e) => {
        handleSetCategory(e.value)
        onPromotionSelect()
      }}
      options={categoriesValues}
      optionLabel="name"
      placeholder="Categoría"
      className="w-full md:w-14rem products-management-categories-filter-button"
    />
  );
}

export default PromotionsDropdown;
