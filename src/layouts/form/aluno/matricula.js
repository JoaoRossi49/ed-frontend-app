import React, { useState } from "react";
import axios from "axios";
import { Grid, Card, Box, TextField, Button } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Matricula() {
  const [formData, setFormData] = useState({
    id: 1,
    endereco: {
      id: 1,
      logradouro: "",
      numero: "",
      data_inclusao: "2024-02-26T21:44:04.832837-03:00",  // Esta data é apenas um exemplo
      complemento: "",
      cidade: "",
      estado: "",
      pais: "",
      cep: null,
    },
    contato: [
      {
        id: 1,
        tipo_contato: "T",  // Você pode ajustar conforme necessário
        descricao: "123",
        data_inclusao: "2024-02-26T21:44:04.733564-03:00",  // Esta data é apenas um exemplo
        data_alteracao: null,
      },
    ],
    nome: "",
    nome_social: null,
    data_nascimento: "",
    data_inclusao: "2024-02-08T21:00:00-03:00",  // Esta data é apenas um exemplo
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const [section, key] = name.split('.');

    if (section === "endereco" || section === "contato") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [section]: {
          ...prevFormData[section],
          [key]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
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
                <TextField
                  style={{ margin: "10px" }}
                  required
                  id="nome"
                  name="nome"
                  label="Nome do aluno"
                  value={formData.nome}
                  onChange={handleChange}
                />
                <TextField
                  style={{ margin: "10px" }}
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
                    style={{ margin: "10px", width: "35vw" }}
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
                    style={{ margin: "10px", width: "35vw" }}
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
                      Contato
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <TextField
                  style={{ margin: "10px", width: "67.5vw" }}
                  required
                  id="descricao"
                  name="contato.0.descricao"
                  label="Celular"
                  value={formData.contato[0].descricao}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ margin: "10px" }}
                >
                  Enviar
                </Button>
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
