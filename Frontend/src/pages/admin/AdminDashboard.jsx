import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

function StatEntry({ title, value, icon, divStyle }) {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        gap: "1rem",
        alignItems: "center",
        borderRadius: "0.375rem",
        width: "100%",
        height: 180,
        ...divStyle,
      }}
    >
      <div
        style={{
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          borderBottomWidth: "2px",
          borderColor: "#ffffff",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            fontWeight: "600",
            textTransform: "uppercase",
            color: "#ffffff",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: "2rem",
            fontWeight: "bolder",
            lineHeight: "1.75rem",
            color: "#ffffff",
          }}
        >
          {value}
        </p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <path
          fill="rgba(255,255,255,0.3)"
          fillOpacity="1"
          d="M0,192L30,208C60,224,120,256,180,245.3C240,235,300,181,360,144C420,107,480,85,540,96C600,107,660,149,720,154.7C780,160,840,128,900,117.3C960,107,1020,117,1080,112C1140,107,1200,85,1260,74.7C1320,64,1380,64,1410,64L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}

function StatCard({ title, children, style }) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8EAF0",
        borderRadius: 5,
      }}
    >
      <div style={{ borderBottom: "1px solid #E8EAF0", padding: 16 }}>
        <p style={{ color: "black" }}>{title}</p>
      </div>
      <div style={{ padding: 20, ...style }}>{children}</div>
    </div>
  );
}

const AdminDashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 20,
            flexGrow: 1,
          }}
        >
          <StatEntry
            title="Total Products"
            value={100}
            icon={null}
            divStyle={{
              backgroundColor: "#875fc0",
              backgroundImage:
                "linear-gradient(315deg, #875fc0 0%, #5346ba 74%)",
            }}
          />
          <StatEntry
            title="Total Sellers"
            value={8}
            icon={null}
            divStyle={{
              backgroundColor: "#47c5f4",
              backgroundImage:
                "linear-gradient(315deg, #47c5f4 0%, #6791d9 74%)",
            }}
          />
          <StatEntry
            title="Total Buyers"
            value={24}
            icon={null}
            divStyle={{
              backgroundColor: "#eb4786",
              backgroundImage:
                "linear-gradient(315deg, #eb4786 0%, #b854a6 74%)",
            }}
          />
          <StatEntry
            title="Total Categories"
            value={6}
            icon={null}
            divStyle={{
              backgroundColor: "#ffb72c",
              backgroundImage:
                "linear-gradient(315deg, #ffb72c 0%, #f57f59 74%)",
            }}
          />
        </div>
        <StatCard title="Sellers and Products">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "Products" },
                  { id: 1, value: 15, label: "Sellers" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </StatCard>
      </div>
      <StatCard
        title={"Number of products in each categories"}
        style={{ height: 500, width: "100%" }}
      >
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: [
                "Bagpacks",
                "Trekking Poles",
                "Water Bottles & Filters",
                "Watches",
                "Camp Kitchen",
                "Headwear",
                "Climbing Equipment",
              ],
              tickLabelStyle: {
                fontSize: "10px",
                width: "50px",
                wordWrap: "break-word",
              },
            },
          ]}
          series={[{ data: [4, 3, 5, 5, 2, 3, 5] }]}
        />
      </StatCard>
      <StatCard title={"Top 4 products"}>
        <div
          style={{ display: "flex", gap: 20, justifyContent: "space-between" }}
        >
          <div
            style={{
              padding: 20,
              borderRadius: 6,
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              border: "1px solid #dee2e6",
            }}
          >
            <img
              src={
                "https://res.cloudinary.com/du65q3gjv/image/upload/v1710858941/lgaaxbgovr9yvvexou27.webp"
              }
              height={200}
              width={"100%"}
              style={{ objectFit: "contain" }}
            />
            <p style={{ color: "#3D4B64", fontWeight: "bold" }}>Rs. 10,000</p>
            <p style={{ marginTop: 5 }}>Vermont Classic</p>
          </div>
          <div
            style={{
              padding: 20,
              borderRadius: 6,
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              border: "1px solid #dee2e6",
            }}
          >
            <img
              src={
                "https://res.cloudinary.com/du65q3gjv/image/upload/v1710858941/lgaaxbgovr9yvvexou27.webp"
              }
              height={200}
              width={"100%"}
              style={{ objectFit: "contain" }}
            />
            <p style={{ color: "#3D4B64", fontWeight: "bold" }}>Rs. 10,000</p>
            <p style={{ marginTop: 5 }}>Vermont Classic</p>
          </div>
          <div
            style={{
              padding: 20,
              borderRadius: 6,
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              border: "1px solid #dee2e6",
            }}
          >
            <img
              src={
                "https://res.cloudinary.com/du65q3gjv/image/upload/v1710858941/lgaaxbgovr9yvvexou27.webp"
              }
              height={200}
              width={"100%"}
              style={{ objectFit: "contain" }}
            />
            <p style={{ color: "#3D4B64", fontWeight: "bold" }}>Rs. 10,000</p>
            <p style={{ marginTop: 5 }}>Vermont Classic</p>
          </div>
          <div
            style={{
              padding: 20,
              borderRadius: 6,
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              border: "1px solid #dee2e6",
            }}
          >
            <img
              src={
                "https://res.cloudinary.com/du65q3gjv/image/upload/v1710858941/lgaaxbgovr9yvvexou27.webp"
              }
              height={200}
              width={"100%"}
              style={{ objectFit: "contain" }}
            />
            <p style={{ color: "#3D4B64", fontWeight: "bold" }}>Rs. 10,000</p>
            <p style={{ marginTop: 5 }}>Vermont Classic</p>
          </div>
        </div>
      </StatCard>
    </div>
  );
};

export default AdminDashboard;
