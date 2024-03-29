import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "react-query";
import $axios from "../../lib/axios.instance";
import LoadingIndicator from "./LoadingIndicator";

const Orders = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["admin-all-orders"],
    queryFn: async () => {
      return await $axios.get("/admin/orders");
    },
  });
  const allOrders = data?.data?.allOrders;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const rows = allOrders.map((o) => ({
    image: o.product.at(0)?.image,
    productName: o.product.at(0)?.name,
    orderQuantity: o.orderQuantity,
    unitPrice: o.unitPrice,
    buyerName: `${o.buyer.at(0)?.firstName} ${o.buyer.at(0)?.lastName}`,
    buyerEmail: o.buyer.at(0)?.email,
    paymentStatus: o.paymentStatus,
    sellerName: `${o.seller.at(0)?.firstName} ${o.seller.at(0)?.lastName}`,
    sellerEmail: o.seller.at(0)?.email,
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
          All Orders{" "}
          <span style={{ fontSize: "1rem", color: "#666666" }}>
            ({rows.length} results)
          </span>
        </p>
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "#EFF2F7" }}>
          <TableRow>
            <TableCell width={150}>Image</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Order Quantity</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Sub Total</TableCell>
            <TableCell>Buyer Details</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell>Seller Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.productName}
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
              <TableCell>{row.productName}</TableCell>
              <TableCell>{row.orderQuantity}</TableCell>
              <TableCell>Rs. {row.unitPrice}</TableCell>
              <TableCell>Rs. {row.orderQuantity * row.unitPrice}</TableCell>
              <TableCell>
                <p>
                  {row.buyerName}
                  <br />
                  {row.buyerEmail}
                </p>
              </TableCell>
              <TableCell>
                <p
                  style={{
                    padding: 10,
                    background: "#277132",
                    color: "white",
                    borderRadius: 99999,
                    textAlign: "center",
                    width: "max-content",
                  }}
                >
                  {row.paymentStatus}
                </p>
              </TableCell>
              <TableCell>
                <p>
                  {row.sellerName}
                  <br />
                  {row.sellerEmail}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Orders;
