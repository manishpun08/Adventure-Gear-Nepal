import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import $axios from "../lib/axios.instance";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { Chip } from "@mui/material";

const tableHeader = [
  "S.N",
  "Product",
  "Order Quantity",
  "Unit Price",
  "Sub Total",
  "Buyer Name",
  "Buyer Email",
  "Payment Status",
];
const Order = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-order-detail"],
    queryFn: async () => {
      return await $axios.get("/order/list");
    },
    onError: (error) => {
      dispatch(error?.response?.data?.message);
    },
  });
  const orderList = data?.data?.orderList;
  console.log(orderList);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeader.map((item, index) => {
              return (
                <TableCell align="left" key={index} sx={{ fontWeight: "700" }}>
                  {item}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((item, index) => (
            <TableRow
              key={item._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="left">{item.productData.name}</TableCell>
              <TableCell align="center">{item.orderQuantity}</TableCell>
              <TableCell align="center">${item.unitPrice}</TableCell>
              <TableCell align="center">{item.subTotal}</TableCell>
              <TableCell align="left">{`${item.buyerData.firstName} ${item.buyerData.lastName}`}</TableCell>
              <TableCell align="left">{item.buyerData.email}</TableCell>
              <TableCell align="center">
                <Chip label={item.paymentStatus} color="success" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Order;
