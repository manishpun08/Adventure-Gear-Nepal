import Yup from "yup";

export const addItemToCartValidationSchema = Yup.object({
  productId: Yup.string().required("Product Id is required.").trim(),
  orderQuantity: Yup.number()
    .required("Order quantity is required")
    .min(1, "Order quantity must be at least 1."),
});
