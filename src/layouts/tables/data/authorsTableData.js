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
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

// axios
import axios from "axios";
import { useEffect, useState } from "react";

import { useLocation, NavLink } from "react-router-dom";

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
        console.log(data);

        if (Array.isArray(data)) {
          const mappedRows = data.map((item) => ({
            author: <Author image={team2} name={item.nome} email={item.nome_social} />,
            function: <Job title={item.data_nascimento} description={item.data_inclusao} />,
            status: (
              <MDBox ml={-1}>
                <MDBadge badgeContent={item.status} color="success" variant="gradient" size="sm" />
              </MDBox>
            ),
            employed: (
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
              <NavLink key={"matricular"} to={"/aluno/add"} state={{item}}>
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
      { Header: "Aluno", accessor: "author", width: "45%", align: "left" },
      { Header: "Turma", accessor: "function", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Data da matrícula", accessor: "employed", align: "center" },
      { Header: "Ações", accessor: "action", align: "center" },
    ],

    rows,
  };
}
