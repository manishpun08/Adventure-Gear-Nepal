import Yup from "yup";

export let addProductValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .trim()
    .max(55, "Name must be at max of 55 characters."),
  brand: Yup.string()
    .required("Brand is required.")
    .trim()
    .max(55, "Brand must be at max of 55 characters."),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be at least 0."),

  quantity: Yup.number()
    .required("Quantity is required")
    .min(1, "Quantity must be at least 1."),
  category: Yup.string()
    .required("Category is required.")
    .trim()
    .oneOf([
      "Bagpacks",
      "Trekking Poles",
      "Water Bottles & Filters",
      "Watches",
      "Camp Kitchen",
      "Headwear",
      "Climbing Equipment",
      "Eyewear",
      "Footwear",
      "Gloves",
      "Knives & Multitool",
      "Clothes",
    ]),
  freeShipping: Yup.boolean().default(false),
  description: Yup.string()
    .required("Description is required.")
    .min(500, "Description is at least of 500 character.")
    .max(1000, "Description is at most of 1000.")
    .trim(),
  image: Yup.string().trim().nullable(),
});
