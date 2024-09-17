/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { NavLink } from "react-router-dom";

// Data
import aulasTableData from "layouts/aulas/data/aulasTableData";

// Icon
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Aulas() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { columns, rows } = aulasTableData();
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return Object.values(row).some((value) => {
      try {
        return value.props.state.tema
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      } catch {}
    });
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h6" color="white">
                  Diário de aula
                </MDTypography>
              </MDBox>
              </MDBox>
              <MDBox pt={3}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <MDInput
                    style={{ marginLeft: "2vw" }}
                    label="Pesquisar"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <div style={{marginRight: "2vw"}}>
                  <NavLink key={"cadastrar_aula"} to={"/aulas/add"}>
                  <div>
                  <MDButton>{<AddCircleIcon />}{"Nova aula"}</MDButton>
                  </div>                    
                  </NavLink>
                  </div>
                </div>
                <DataTable
                  table={{ columns, rows: filteredRows }}
                  isSorted={true}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Aulas;
