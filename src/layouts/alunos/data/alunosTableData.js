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
import DropdownMenu from "components/DropDownMenu";

// Images
import user_default from "assets/images/user_default.jpg";

import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import api from "services/api";

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

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function Data() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePessoa = await api.get("/api/pessoa/");
        const dataPessoas = responsePessoa.data;

        const responseMatricula = await api.get("/api/estudante/matricula");
        const dataMatriculas = responseMatricula.data;

        const calculateAge = (birthDate) => {
          const today = new Date();
          const birthDateObj = new Date(birthDate);
          let age = today.getFullYear() - birthDateObj.getFullYear();
          const monthDifference = today.getMonth() - birthDateObj.getMonth();
          
          if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
          }
          
          return age;
        };

        const getBadgColor = (ativo) =>{
          if(ativo == true){
            return "success";
          }else{
            return "error";
          }
        }

        const mergeData = (dataPessoas, dataMatriculas) => {
          return dataPessoas
            .map((pessoa) => {
              const matricula = dataMatriculas.find((m) => m.pessoa === pessoa.id);
              if (matricula) {
                return {
                  pessoa: { ...pessoa },
                  matricula: {
                    id: matricula.id,
                    numero_matricula: matricula.numero_matricula,
                    data_inclusao: formatDate(matricula.data_inclusao),
                    ativo: matricula.ativo,
                    data_inativacao: matricula.data_inativacao,
                    turma: matricula.turma_nome,
                  },
                };
              } else {
                return null;
              }
            })
            .filter((item) => item !== null);
        };

        const mergedData = await mergeData(dataPessoas, dataMatriculas);

        if (Array.isArray(mergedData)) {
          const mappedRows = mergedData.map((item) => ({
            nome: (
              <NavLink key={"matricular"} to={"/aluno/add"} state={item}>
                <Author
                  image={user_default}
                  name={item.pessoa.nome}
                  email={"Nº Matrícula: " + item.matricula.numero_matricula}
                />
              </NavLink>
            ),
            idade: (
              <MDTypography
                component="a"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {calculateAge(item.pessoa.data_nascimento)}
              </MDTypography>
            ),
            turma: <Job title={item.matricula.turma ? item.matricula.turma : "Não matriculado"} />,
            data_matricula: (
              <MDTypography
                component="a"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {item.matricula.data_inclusao}
              </MDTypography>
            ),
            status: (
              <MDBox ml={-1}>
                <MDBadge badgeContent={item.matricula.ativo} color={getBadgColor(item.matricula.ativo)} variant="gradient" size="sm" />
              </MDBox>
            ),
            action: (
              <NavLink key={"matricular"} to={"/aluno/add"} state={item}>
                <MDTypography
                  component="a"
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  Edit
                </MDTypography>
              </NavLink>
            ),
            dropDownMenu: (<DropdownMenu item={item}/>),
          }));
          setRows(mappedRows);
        } else {
          console.error("Data is not an array:", mergedData);
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
      { Header: "Idade", accessor: "idade", align: "center" },
      { Header: "Turma", accessor: "turma", align: "left" },
      { Header: "Data da matrícula", accessor: "data_matricula", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Ações", accessor: "dropDownMenu", align: "center" },
    ],

    rows,
  };
}
