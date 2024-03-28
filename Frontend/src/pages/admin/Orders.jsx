import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Orders = () => {
  const rows = [
    {
      image:
        "https://res.cloudinary.com/du65q3gjv/image/upload/v1710858941/lgaaxbgovr9yvvexou27.webp",
      productName: "Vermont Classic",
      orderQuantity: 10,
      unitPrice: 100,
      buyerName: "Foo Bar",
      buyerEmail: "foo@bar.com",
      paymentStatus: "Completed",
      sellerName: "Bar Buzz",
      sellerEmail: "bar@buzz.com",
    },
    {
      image:
        "https://res.cloudinary.com/du65q3gjv/image/upload/v1710858941/lgaaxbgovr9yvvexou27.webp",
      productName: "Vermont Classic",
      orderQuantity: 10,
      unitPrice: 100,
      buyerName: "Foo Bar",
      buyerEmail: "foo@bar.com",
      paymentStatus: "Completed",
      sellerName: "Bar Buzz",
      sellerEmail: "bar@buzz.com",
    },
    {
      image:
        "https://res.cloudinary.com/du65q3gjv/image/upload/v1710858941/lgaaxbgovr9yvvexou27.webp",
      productName: "Vermont Classic",
      orderQuantity: 10,
      unitPrice: 100,
      buyerName: "Foo Bar",
      buyerEmail: "foo@bar.com",
      paymentStatus: "Completed",
      sellerName: "Bar Buzz",
      sellerEmail: "bar@buzz.com",
    },
    {
      image:
        "https://res.cloudinary.com/du65q3gjv/image/upload/v1710858941/lgaaxbgovr9yvvexou27.webp",
      productName: "Vermont Classic",
      orderQuantity: 10,
      unitPrice: 100,
      buyerName: "Foo Bar",
      buyerEmail: "foo@bar.com",
      paymentStatus: "Completed",
      sellerName: "Bar Buzz",
      sellerEmail: "bar@buzz.com",
    },
    {
      image:
        "https://res.cloudinary.com/du65q3gjv/image/upload/v1710858941/lgaaxbgovr9yvvexou27.webp",
      productName: "Vermont Classic",
      orderQuantity: 10,
      unitPrice: 100,
      buyerName: "Foo Bar",
      buyerEmail: "foo@bar.com",
      paymentStatus: "Completed",
      sellerName: "Bar Buzz",
      sellerEmail: "bar@buzz.com",
    },
    {
      image:
        "https://res.cloudinary.com/du65q3gjv/image/upload/v1710858941/lgaaxbgovr9yvvexou27.webp",
      productName: "Vermont Classic",
      orderQuantity: 10,
      unitPrice: 100,
      buyerName: "Foo Bar",
      buyerEmail: "foo@bar.com",
      paymentStatus: "Completed",
      sellerName: "Bar Buzz",
      sellerEmail: "bar@buzz.com",
    },
    {
      image:
        "https://res.cloudinary.com/du65q3gjv/image/upload/v1710858941/lgaaxbgovr9yvvexou27.webp",
      productName: "Vermont Classic",
      orderQuantity: 10,
      unitPrice: 100,
      buyerName: "Foo Bar",
      buyerEmail: "foo@bar.com",
      paymentStatus: "Completed",
      sellerName: "Bar Buzz",
      sellerEmail: "bar@buzz.com",
    },
    {
      image:
        "https://res.cloudinary.com/du65q3gjv/image/upload/v1710858941/lgaaxbgovr9yvvexou27.webp",
      productName: "Vermont Classic",
      orderQuantity: 10,
      unitPrice: 100,
      buyerName: "Foo Bar",
      buyerEmail: "foo@bar.com",
      paymentStatus: "Completed",
      sellerName: "Bar Buzz",
      sellerEmail: "bar@buzz.com",
    },
  ];

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
            (28 results)
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
