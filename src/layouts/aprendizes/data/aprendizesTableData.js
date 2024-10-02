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
    <MDAvatar src={image} name={name} size="lg" />
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
        const responsePessoa = await api.get("/pessoa/");
        const dataPessoas = responsePessoa.data;

        const responseMatricula = await api.get("/api/estudante/matricula");
        const dataMatriculas = responseMatricula.data;

        const calculateAge = (birthDateStr) => {
          const [day, month, year] = birthDateStr.split('/');
          const birthDate = new Date(year, month - 1, day);
          const today = new Date();
          const birthDateObj = new Date(birthDate);
          let age = today.getFullYear() - birthDateObj.getFullYear();
          const monthDifference = today.getMonth() - birthDateObj.getMonth();
          
          if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
          }
          
          return age;
        };

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
                    data_inclusao: matricula.data_inclusao,
                    ativo: matricula.ativo,
                    data_inativacao: matricula.data_inativacao,
                    turma: matricula.turma,
                    turma_nome: matricula.turma_nome,
                    escolaridade: matricula.escolaridade,
                    escolaridade_nome: matricula.escolaridade_nome,
                    curso: matricula.curso,
                    curso_nome: matricula.curso_nome,
                    empresa: matricula.empresa,
                    empresa_nome: matricula.empresa_nome,
                    cbo: matricula.cbo,
                    cbo_nome: matricula.cbo_nome,
                    salario: matricula.salario,
                    data_inicio_contrato: matricula.data_inicio_contrato,
                    data_terminio_contrato: matricula.data_terminio_contrato,
                    data_inicio_empresa: matricula.data_inicio_empresa,
                    quantidade_meses_contrato: matricula.quantidade_meses_contrato,
                    data_terminio_empresa: matricula.data_terminio_empresa,
                    hora_inicio_expediente: matricula.hora_inicio_expediente,
                    hora_fim_expediente: matricula.hora_fim_expediente,
                    dias_da_semana_empresa: matricula.dias_da_semana_empresa,
                    dias_da_semana_curso: matricula.dias_da_semana_curso,
                    atividades_praticas: matricula.atividades_praticas,
                  },
                };
              } else {
                return null;
              }
            })
            .filter((item) => item !== null && item.matricula.ativo == true)
            .sort((a, b) => {
              if (a.pessoa.nome < b.pessoa.nome) return -1;
              if (a.pessoa.nome > b.pessoa.nome) return 1;
              return 0;
            });
        };

        const mergedData = await mergeData(dataPessoas, dataMatriculas);

        if (Array.isArray(mergedData)) {
          const mappedRows = mergedData.map((item) => ({
            nome: (
              <NavLink key={"matricular"} to={"/aprendizes/add"} state={item}>
                <Author
                  image={item.pessoa.foto_perfil ?? user_default}
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
            turma: <Job title={item.matricula.turma_nome ? item.matricula.turma_nome : "Não matriculado"} />,
            data_matricula: (
              <MDTypography
                component="a"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {item.matricula.empresa_nome}
              </MDTypography>
            ),
            action: (
              <NavLink key={"matricular"} to={"/aprendizes/add"} state={item}>
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
      { Header: "Aprendiz", accessor: "nome", width: "45%", align: "left" },
      { Header: "Idade", accessor: "idade", align: "center" },
      { Header: "Turma", accessor: "turma", align: "left" },
      { Header: "Empresa", accessor: "data_matricula", align: "center" },
      { Header: "Ações", accessor: "dropDownMenu", align: "center" },
    ],

    rows,
  };
}
