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
import class_default from "assets/images/sala.png";

import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import api from "services/api";

const Aula = ({ image, name, email }) => (
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
        const response = await api.get("estudante/aulas/");
        const data = response.data;

        if (Array.isArray(data)) {
          const mappedRows = data.map((item) => ({
            nome: (
              <NavLink key={"cadastrar_aula"} to={"/aulas/add"} state={item}>
                <Aula image={class_default} name={item.tema} />
              </NavLink>
            ),
            turma: <Job title={item.turma_nome} />,
            data_aula: <Job title={item.data_aula} />,
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
      { Header: "Tema da aula", accessor: "nome", width: "30%", align: "left" },
      { Header: "Nome da turma", accessor: "turma", align: "center" },
      { Header: "Data da aula", accessor: "data_aula", align: "center" },
    ],

    rows,
  };
}
