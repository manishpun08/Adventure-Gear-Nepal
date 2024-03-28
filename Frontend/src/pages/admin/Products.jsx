import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "react-query";
import $axios from "../../lib/axios.instance";
import LoadingIndicator from "./LoadingIndicator";

const Products = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["admin-all-products"],
    queryFn: async () => {
      return await $axios.get("/admin/products");
    },
  });
  const allProducts = data?.data?.allProducts;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const rows = allProducts.map((p) => ({
    image: p.image,
    name: p.name,
    category: p.category,
    seller: `${p.seller.at(0)?.firstName} ${p.seller.at(0)?.lastName}`,
    price: p.price,
  }));

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8EAF0",
        borderRadius: 5,
      }}
    >
      <div style={{ borderBottom: "1px solid #E8EAF0", padding: 16 }}>
        <p style={{ color: "black", fontSize: "1.5rem" }}>
          All Products{" "}
          <span style={{ fontSize: "1rem", color: "#666666" }}>
            ({rows.length} results)
          </span>
        </p>
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "#EFF2F7" }}>
          <TableRow>
            <TableCell width={150}>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Seller</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <img
                  src={row.image}
                  width={100}
                  height={100}
                  style={{ objectFit: "contain" }}
                />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.seller}</TableCell>
              <TableCell>Rs. {row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Products;
