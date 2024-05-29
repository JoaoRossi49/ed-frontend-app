import React, { useState } from "react";
import axios from "axios";
import { Grid, Card, Box, TextField, Button } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Matricula() {

  const CurrentDateWithTimezone = () => {
    const currentDate = new Date();

    const padZero = (num) => (num < 10 ? `0${num}` : num);

    const timezoneOffset = -currentDate.getTimezoneOffset();
    const offsetSign = timezoneOffset >= 0 ? '+' : '-';
    const offsetHours = padZero(Math.floor(Math.abs(timezoneOffset) / 60));
    const offsetMinutes = padZero(Math.abs(timezoneOffset) % 60);

    const formattedDate = currentDate.toISOString().split('.')[0];
    const formattedDateWithTimezone = `${formattedDate}${offsetSign}${offsetHours}:${offsetMinutes}`;

    return formattedDateWithTimezone;
  };

  const [formData, setFormData] = useState({
    id: 1,
    endereco: {
      id: 1,
      logradouro: null,
      numero: null,
      data_inclusao: CurrentDateWithTimezone(),
      complemento: null,
      cidade: null,
      estado: null,
      pais: null,
      cep: null,
    },
    contato: [
      {
        id: 1,
        tipo_contato: "CELULAR",
        descricao: "",
        data_inclusao: CurrentDateWithTimezone(),
        data_alteracao: null,
      },
      {
        id: 1,
        tipo_contato: "TELEFONE",
        descricao: "",
        data_inclusao: CurrentDateWithTimezone(),
        data_alteracao: null,
      },
    ],
    documento: [
      {
        id: 1,
        nro_documento: "",
        data_inclusao: CurrentDateWithTimezone(),
        tipo_documento: "CPF"
      },
      {
        id: 1,
        nro_documento: "",
        data_inclusao: CurrentDateWithTimezone(),
        tipo_documento: "RG"
      },
    ],
    nome: "",
    nome_social: null,
    data_nascimento: "",
    data_inclusao: CurrentDateWithTimezone(),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const [section, index, key] = name.split('.');
  
    setFormData((prevFormData) => {
      if (section === "contato" || section === "documento") {
        const newArray = [...prevFormData[section]];
        newArray[parseInt(index, 10)][key] = value;
        return {
          ...prevFormData,
          [section]: newArray,
        };
      } else if (section === "endereco") {
        return {
          ...prevFormData,
          endereco: {
            ...prevFormData.endereco,
            [key]: value,
          },
        };
      } else {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/pessoa/", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao enviar os dados!", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box pt={6} pb={3}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={1}
                  mt={-2}
                  py={1}
                  px={1}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  style={{ margin: "10px" }}
                >
                  <MDBox display="flex" justifyContent="space-between" alignItems="center">
                    <MDTypography variant="h6" color="white">
                      Informações básicas
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <div>
                  <TextField
                    style={{ margin: "10px", width: "27vw" }}
                    required
                    id="nome"
                    name="nome"
                    label="Nome do aluno"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ margin: "10px", width: "26vw" }}
                    id="nome_social"
                    name="nome_social"
                    label="Nome social"
                    value={formData.nome_social}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ margin: "10px" }}
                    required
                    id="data_nascimento"
                    name="data_nascimento"
                    label="Data de nascimento"
                    value={formData.data_nascimento}
                    onChange={handleChange}
                  />
                </div>
                <MDBox
                  mx={1}
                  mt={-2}
                  py={1}
                  px={1}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  style={{ margin: "10px" }}
                >
                  <MDBox display="flex" justifyContent="space-between" alignItems="center">
                    <MDTypography variant="h6" color="white">
                      Endereço
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <div>
                  <TextField
                    style={{ margin: "10px", width: "41vw" }}
                    required
                    id="logradouro"
                    name="endereco.logradouro"
                    label="Logradouro"
                    value={formData.endereco.logradouro}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ margin: "10px" }}
                    required
                    id="numero"
                    name="endereco.numero"
                    label="Número"
                    value={formData.endereco.numero}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ margin: "10px" }}
                    id="cep"
                    name="endereco.cep"
                    label="Cep"
                    value={formData.endereco.cep}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <TextField
                    style={{ margin: "10px", width: "41vw" }}
                    required
                    id="cidade"
                    name="endereco.cidade"
                    label="Cidade"
                    value={formData.endereco.cidade}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ margin: "10px" }}
                    required
                    id="estado"
                    name="endereco.estado"
                    label="Estado"
                    value={formData.endereco.estado}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ margin: "10px" }}
                    required
                    id="pais"
                    name="endereco.pais"
                    label="País"
                    value={formData.endereco.pais}
                    onChange={handleChange}
                  />
                </div>
                <TextField
                  style={{ margin: "10px", width: "67.5vw" }}
                  id="complemento"
                  name="endereco.complemento"
                  label="Complemento"
                  value={formData.endereco.complemento}
                  onChange={handleChange}
                />
                <MDBox
                  mx={1}
                  mt={-2}
                  py={1}
                  px={1}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  style={{ margin: "10px" }}
                >
                  <MDBox display="flex" justifyContent="space-between" alignItems="center">
                    <MDTypography variant="h6" color="white">
                      Documentos
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <TextField
                  style={{ margin: "10px", width: "33.25vw" }}
                  required
                  id="nro_documento"
                  name="documento.0.nro_documento"
                  label="CPF"
                  value={formData.documento[0].nro_documento}
                  onChange={handleChange}
                />
                <TextField
                  style={{ margin: "10px", width: "33.25vw" }}
                  required
                  id="nro_documento"
                  name="documento.1.nro_documento"
                  label="RG"
                  value={formData.documento[1].nro_documento}
                  onChange={handleChange}
                />
                <MDBox
                  mx={1}
                  mt={-2}
                  py={1}
                  px={1}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  style={{ margin: "10px" }}
                >
                  <MDBox display="flex" justifyContent="space-between" alignItems="center">
                    <MDTypography variant="h6" color="white">
                      Contato
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <div>
                  <TextField
                    style={{ margin: "10px", width: "33.25vw" }}
                    required
                    id="descricao"
                    name="contato.0.descricao"
                    label="Celular"
                    value={formData.contato[0].descricao}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ margin: "10px", width: "33.25vw" }}
                    required
                    id="descricao"
                    name="contato.1.descricao"
                    label="Telefone fixo"
                    value={formData.contato[1].descricao}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ margin: "10px", width: "35vw", color: "#FFF" }}
                  >
                    Enviar
                  </Button>
                </div>
              </Card>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Matricula;
