import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useImagePreview } from "@/hooks/managementHooks/useImagePreview";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import React, { useState, useEffect } from "react";
import { validateDiscount } from "@/utils/validateDiscount";
import "./index.css";
import { InputNumber } from "primereact/inputnumber";

const PromotionForm = React.memo(function PromotionForm({
  promotionFormProperties,
  setPromotionFormProperties,
  handleCreatePromotion,
  handleUpdatePromotion,
  loading,
}) {
  const [activeStatusChecked, setActiveStatusChecked] = useState(false);
  const [specialStatusChecked, setSpecialStatusChecked] = useState(false);
  const [discount, setDiscount] = useState(promotionFormProperties.initialValues.discount_in_percent)

  const { imagesPreview, handleSetImagePreview } = useImagePreview({
    formProperties: promotionFormProperties,
    ispromotionForm: false,
  });

  function createpromotion(e) {
    e.preventDefault();
    const name = e.target["name"].value;
    const description = e.target["description"].value;
    const img = e.target["image"].files;
    const is_special = specialStatusChecked;
    const active = activeStatusChecked;
    const promotion = {
      name: name,
      img: img[0],
      description: description,
      discount_in_percent: discount,
      is_special: is_special,
      active: active,
    };
    validateDiscount({
      promotionDiscount: discount,
      onOk: () =>
        handleCreatePromotion(promotion),
    });
  }

  function updatepromotion(e) {
    e.preventDefault();
    const name = e.target["name"].value;
    const description = e.target["description"].value;
    const img = e.target["image"].files;
    const is_special = specialStatusChecked;
    const active = activeStatusChecked;
    const promotion = {
      name: name,
      img: img[0],
      description: description,
      discount_in_percent: discount,
      is_special: is_special,
      active: active,
    };
    validateDiscount({
      promotionDiscount: discount,
      onOk: () =>
        handleUpdatePromotion({
          id: promotionFormProperties.initialValues.id,
          promotion: promotion,
        }),
    });
  }

  //update promotion active and special status
  useEffect(() => {
    if (promotionFormProperties.creatingMode == false) {
      setActiveStatusChecked(promotionFormProperties.initialValues.active);
      setSpecialStatusChecked(promotionFormProperties.initialValues.is_special);
    } else {
      setActiveStatusChecked(true);
      setSpecialStatusChecked(false);
    }
  }, [promotionFormProperties]);

  return (
    <Dialog
      visible={promotionFormProperties.show}
      onHide={() => {
        !loading
          ? setPromotionFormProperties((prev) => ({
              ...prev,
              show: false,
              disabled: false,
              initialValues: {},
            }))
          : null;
      }}
      position="center"
      draggable={false}
      resizable={false}
      className="promotions-form-dialog"
      header={
        promotionFormProperties.creatingMode
          ? "Crear Promoción"
          : "Editar Promoción"
      }
    >
      <form
        className="promotions-form"
        onSubmit={(e) => {
          promotionFormProperties.creatingMode == true
            ? createpromotion(e)
            : updatepromotion(e);
        }}
        encType="multipart/form-data"
      >
        {/*Name*/}
        <div className="promotion-form-field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            required
            aria-describedby="name-help"
            className=".p-inputtext-sm"
            disabled={promotionFormProperties.disabled}
            defaultValue={
              promotionFormProperties.creatingMode
                ? ""
                : promotionFormProperties.initialValues
                ? promotionFormProperties.initialValues.name
                : ""
            }
          />
        </div>

        {/*Discount*/}
        <div className="promotion-form-field">
          <label htmlFor="discount">Descuento (%) </label>
          <InputNumber
            id="discount"
            aria-describedby="discount-help"
            className=".p-inputtext-sm"
            min={0}
            max={100}
            disabled={promotionFormProperties.disabled}
            required
            value={discount}
            onChange={e => setDiscount(e.value)}
          />
        </div>

        {/*description*/}
        <div className="promotion-description-field">
          <label htmlFor="description">Descripción</label>
          <InputTextarea
            id="description"
            aria-describedby="description-help"
            disabled={promotionFormProperties.disabled}
            defaultValue={
              promotionFormProperties.creatingMode
                ? ""
                : promotionFormProperties.initialValues.description
            }
          />
        </div>

        {/*active*/}
        <div className="promotion-form-checkbox">
          <label htmlFor="active">Activa:</label>
          <Checkbox
            id="active"
            aria-describedby="active-help"
            disabled={promotionFormProperties.disabled}
            checked={activeStatusChecked}
            onChange={(e) => setActiveStatusChecked(e.checked)}
          />
        </div>

        {/*special*/}
        <div className="promotion-form-checkbox">
          <label htmlFor="special">Especial:</label>
          <Checkbox
            id="special"
            aria-describedby="special-help"
            disabled={promotionFormProperties.disabled}
            checked={specialStatusChecked}
            onChange={(e) => setSpecialStatusChecked(e.checked)}
          />
        </div>

        {/*Image*/}
        <div className="promotion-form-field promotion-image-field">
          <div className="promotion-form-field">
            <label htmlFor="image">Imagen</label>
            <InputText
              id="image"
              required={promotionFormProperties.creatingMode ? true : false}
              aria-describedby="image-help"
              className=".p-inputtext-sm"
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/svg, image/webp"
              disabled={promotionFormProperties.disabled}
              onChange={(e) => handleSetImagePreview({ e: e, imgIndex: 0 })}
            />
          </div>
          {imagesPreview[0] ? <img src={imagesPreview[0]} /> : null}
        </div>
        {promotionFormProperties.disabled == false ? (
          <Button
            disabled={loading ? true : false}
            label={loading ? "Enviando ..." : "Enviar"}
            className="btn-general-styles"
          />
        ) : null}
      </form>
    </Dialog>
  );
});

export default PromotionForm;
