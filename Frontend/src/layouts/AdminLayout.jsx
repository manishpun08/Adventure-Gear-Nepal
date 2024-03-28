import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import { GridViewRounded } from "@mui/icons-material";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import { getAdminFullName } from "../utils/general.function";
import { Menu, MenuItem, Typography } from "@mui/material";

function Header() {
  const adminFullname = getAdminFullName();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        color: "#404A58",
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        filter: "drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.1))",
        position: "sticky",
        top: 0,
        zIndex: 9999999,
      }}
    >
      <p style={{ fontSize: 20 }}>Adventure Gear Nepal Dashboard</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
        }}
        onClick={(event) => {
          setAnchorElUser(event.currentTarget);
        }}
      >
        <img
          src="https://hivedinn.s3.amazonaws.com/upload/photos/d-avatar.jpg?cache=0"
          height={40}
          width={40}
          style={{ borderRadius: 99999 }}
        />
        <p style={{ fontSize: 14 }}>{adminFullname}</p>
      </div>
      <Menu
        sx={{ mt: "55px", zIndex: 99999999 }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={() => {
          setAnchorElUser(null);
        }}
      >
        <MenuItem
          onClick={() => {
            localStorage.removeItem("admin-token");
            localStorage.removeItem("admin-firstName");
            localStorage.removeItem("admin-lastName");
            navigate("/admin/login");
          }}
        >
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

function SidebarItem({ activeIcon, inactiveIcon, title, href }) {
  const { pathname } = useLocation();
  const isActive = pathname === `/admin${href}`;

  return (
    <Link
      to={`/admin${href}`}
      style={{
        backgroundColor: isActive ? "#303C54" : "transparent",
        color: "#dddddd",
        fontWeight: isActive ? "bold" : undefined,
        borderRadius: 4,
      }}
    >
      <div
        style={{
          padding: 13,
          paddingTop: 12,
          paddingBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 13,
        }}
      >
        {isActive ? activeIcon : inactiveIcon}
        <p>{title}</p>
      </div>
    </Link>
  );
}

function Sidebar() {
  return (
    <div
      style={{
        width: "300px",
        backgroundColor: "#3D4B64",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch",
        position: "sticky",
        top: 0,
        height: "100dvh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <img
          style={{ width: "90px" }}
          className="logo"
          src="/img/TreakLogo.png"
          alt="logo"
        />
      </div>

      <SidebarItem
        activeIcon={<GridViewRounded />}
        inactiveIcon={<GridViewIcon />}
        title={"Dashboard"}
        href={""}
      />
      <SidebarItem
        activeIcon={<ProductionQuantityLimitsOutlinedIcon />}
        inactiveIcon={<ProductionQuantityLimitsOutlinedIcon />}
        title={"Products"}
        href={"/products"}
      />
      <SidebarItem
        activeIcon={<SubscriptionsRoundedIcon />}
        inactiveIcon={<SubscriptionsOutlinedIcon />}
        title={"Orders"}
        href={"/orders"}
      />
      <SidebarItem
        activeIcon={<CategoryRoundedIcon />}
        inactiveIcon={<CategoryOutlinedIcon />}
        title={"Categories"}
        href={"/categories"}
      />
    </div>
  );
}

const AdminLayout = () => {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        color: "#dddddd",
      }}
    >
      <div style={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />
        <div
          style={{ flexGrow: 1, backgroundColor: "#F8F8FA", color: "#404A58" }}
        >
          <Header />
          <div style={{ padding: 20 }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
