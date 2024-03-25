import Yup from "yup";

export const paginationValidationSchema = Yup.object({
  page: Yup.number().default(1).min(1, "Page must be at least 1."),
  limit: Yup.number().default(6).min(1, "Limit must be at least 1."),
  searchText: Yup.string().nullable().trim().default(null),
  category: Yup.string()
    .default(null)
    .nullable()
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
});
