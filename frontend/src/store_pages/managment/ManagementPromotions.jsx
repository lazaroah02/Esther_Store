import { RemovePageLoader } from "@/components/RemovePageLoader";
import "../pagesStyles/ManagementPromotions.css";
import { ManagementProductsPageHeader } from "@/components/ManagmentComponents/ProductsManagementComponents/ManagmentProductsPageHeader";
import PromotionsGrid from "@/components/ManagmentComponents/PromotionsManagementComponents/PromotionsGrid";
import ButtonsAddAndDelete from "@/components/ManagmentComponents/CategoriesManagement/ButtonsAddAndDelete";
import { useState, useRef } from "react";
import PerformMultipleButton from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/PerformMultipleButton";
import { useManagePromotions } from "@/hooks/managementHooks/useManagePromotions";
import { Toast } from "primereact/toast";
import { usePromotionFormProperties } from "@/hooks/managementHooks/usePromotionFormProperties";
import PromotionForm from "@/components/ManagmentComponents/PromotionsManagementComponents/PromotionForm";

export default function ManagementPromotions() {
  const toast = useRef(null);
  const [selectedPromotions, setSelectedPromotions] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const { confirmMultiple, performMultipleButton } = PerformMultipleButton();

  //promotion form properties
  const {
    promotionFormProperties,
    setPromotionFormProperties,
    processUpdatePromotion,
    processDetailPromotion,
  } = usePromotionFormProperties();

  const { promotions, loadingPromotions, handleDeletePromotions, handleCreatePromotion, handleUpdatePromotion } =
    useManagePromotions({
      toastRef: toast,
      setPromotionFormProperties: setPromotionFormProperties,
      setSelectedPromotions: setSelectedPromotions,
    });
  return (
    <article>
      <meta name="robots" content="noindex"></meta>
      <Toast ref={toast} position="bottom-center" />
      <PromotionForm
        promotionFormProperties={promotionFormProperties}
        setPromotionFormProperties={setPromotionFormProperties}
        handleCreatePromotion={handleCreatePromotion}
        handleUpdatePromotion={handleUpdatePromotion}
        loading={loadingPromotions}
      />
      <RemovePageLoader />
      <ManagementProductsPageHeader title="Administrar Promociones" />
      <ButtonsAddAndDelete setCategoryFormProperties={setPromotionFormProperties}>
      {performMultipleButton({ onPress: () => setShowCheckboxes(true) })}
            {confirmMultiple({
              showConfirmButtons: showCheckboxes,
              onCancel: () => {
                setShowCheckboxes(false);
                setSelectedPromotions([]);
              },
              onConfirm:() => {handleDeletePromotions(selectedPromotions)}
            })}
      </ButtonsAddAndDelete>
      <PromotionsGrid
        promotions={promotions}
        setSelectedPromotions={setSelectedPromotions}
        processUpdatePromotion = {processUpdatePromotion}
        processDetailPromotion = {processDetailPromotion}
        showCheckboxes={showCheckboxes}
        selectedPromotions={selectedPromotions}
        handleDeletePromotions={handleDeletePromotions}
      />
    </article>
  );
}
