import { Add, Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";

const Categories = () => {
  const categoriesList = [
    "Bagpacks",
    "Trekking Poles",
    "Water Bottles & Filters",
    "Watches",
    "Camp Kitchen",
    "Headwear",
    "Climbing Equipment",
  ];

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8EAF0",
        borderRadius: 5,
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #E8EAF0",
          padding: 16,
          display: "flex",
          gap: 16,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ color: "black", fontSize: "1.5rem" }}>
          All Categories{" "}
          <span style={{ fontSize: "1rem", color: "#666666" }}>
            (8 results)
          </span>
        </p>
        <Button startIcon={<Add />} variant="contained">
          Add
        </Button>
      </div>

      <div
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          fontSize: 18,
          alignItems: "start",
        }}
      >
        {categoriesList.map((c) => (
          <div
            key={c}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <p style={{ flexGrow: 1 }}>{c}</p>
            <div style={{ display: "flex", gap: 18 }}>
              <Button startIcon={<Edit />} size="small">
                Edit
              </Button>
              <Button startIcon={<Delete />} size="small" color="error">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
