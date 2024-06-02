/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import user_default from "assets/images/user_default.jpg";

// axios
import axios from "axios";
import { useEffect, useState } from "react";

import { useLocation, NavLink } from "react-router-dom";

import {Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Author = ({ image, name, email }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={name} size="sm" />
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>
  </MDBox>
);

const Job = ({ title, description }) => (
  <MDBox lineHeight={1} textAlign="left">
    <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
      {title}
    </MDTypography>
    <MDTypography variant="caption">{description}</MDTypography>
  </MDBox>
);

export default function Data() {
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/pessoa/");
        const data = response.data;

        if (Array.isArray(data)) {
          const mappedRows = data.map((item) => ({
            nome: <Author image={user_default} name={item.nome} email={item.nome_social} />,
            turma: <Job title={item.data_nascimento} />,
            status: (
              <MDBox ml={-1}>
                <MDBadge badgeContent={item.status} color="success" variant="gradient" size="sm" />
              </MDBox>
            ),
            data_inclusao: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {item.data_inclusao}
              </MDTypography>
            ),
            action: (
                <NavLink key={"matricular"} to={"/aluno/add"} state={item}>
                  <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                  >
                    Edit
                  </MDTypography>
                </NavLink>
            ),
          }));
          setRows(mappedRows);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return {
    columns: [
      { Header: "Aluno", accessor: "nome", width: "45%", align: "left" },
      { Header: "Turma", accessor: "turma", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Data da matrícula", accessor: "data_inclusao", align: "center" },
      { Header: "Ações", accessor: "action", align: "center" },
    ],

    rows,
  };
}
