import React, { useState } from "react";
import axios from "axios";
import { Grid, Card, Box, TextField, Button } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import InputMask from "react-input-mask";
import { useLocation, useNavigate, NavLink } from "react-router-dom";

import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import api from "services/api.js";

function CadastroTurma() {
  const navigate = useNavigate();

  const CurrentDateWithTimezone = () => {
    const currentDate = new Date();

    const padZero = (num) => (num < 10 ? `0${num}` : num);

    const timezoneOffset = -currentDate.getTimezoneOffset();
    const offsetSign = timezoneOffset >= 0 ? "+" : "-";
    const offsetHours = padZero(Math.floor(Math.abs(timezoneOffset) / 60));
    const offsetMinutes = padZero(Math.abs(timezoneOffset) % 60);

    const formattedDate = currentDate.toISOString().split(".")[0];
    const formattedDateWithTimezone = `${formattedDate}${offsetSign}${offsetHours}:${offsetMinutes}`;

    return formattedDateWithTimezone;
  };
  //#region notificações
  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon=<ReportGmailerrorredIcon fontSize="small"></ReportGmailerrorredIcon>
      title="Erro!"
      content="Não foi possível salvar os dados preenchidos"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const [successSB, setSuccessSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon=<CheckCircleOutlineIcon fontSize="small"></CheckCircleOutlineIcon>
      title="Sucesso"
      content="Dados salvos com sucesso!"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );
  //#endregion

  //#region definição de formdata
  const [formData, setFormData] = useState({
    id: 1,
		nome: "",
		descricao: "",
		data_inclusao: null,
		data_inicio: null,
		data_fim: null
  });
  //#endregion

  //#region verificação de state
  const location = useLocation();
  const item = location.state;

  React.useEffect(() => {
    if (item) {
      setExcluirIsVisible(true);
      setFormData({
        id: item.id,
        nome: item.nome ?? null,
        descricao: item.descricao ?? null,
        data_inclusao: item.data_inclusao ?? null,
        data_inicio: item.data_inicio ?? null,
        data_fim: item.data_fim ?? null
    });
    }
  }, [item]);

  //#endregion

  const handleChange = (event) => {
    const { name, value } = event.target;
    const keys = name.split(".");

    setFormData((prevFormData) => {
      let newFormData = { ...prevFormData };
      let currentLevel = newFormData;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          currentLevel[key] = value;
        } else {
          currentLevel = currentLevel[key];
        }
      });

      return newFormData;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (item) {
        const responsePut = await api.put(`/api/estudante/turmas/${item.id}/`,
          formData
        );
        console.log(responsePut.data.status);
        openSuccessSB();
        navigate("/turmas");
      } else {
        const response = await api.post("/api/estudante/turmas/", formData);
        console.log(response.data.status);
        openSuccessSB();
        navigate("/turmas");
      }
    } catch (error) {
      openErrorSB();
    }
  };

  const [excluirIsVisible, setExcluirIsVisible] = useState(false);
  const handleExcluir = async (deleteItemId) => {
    try {
      await api.delete(`/api/pessoa/${deleteItemId}/`);
      navigate("/aluno");
    } catch (error) {
      console.error("Error deleting data:", error);
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
                    label="Nome da turma"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ margin: "10px", width: "26vw" }}
                    id="descricao"
                    name="descricao"
                    label="Descrição da turma"
                    value={formData.descricao}
                    onChange={handleChange}
                  />
                  <InputMask
                    mask="99/99/9999"
                    value={formData.data_inicio}
                    onChange={handleChange}
                  >
                    {() => (
                      <TextField
                        style={{ margin: "10px" }}
                        required
                        id="data_inicio"
                        name="data_inicio"
                        label="Data de início"
                        value={formData.data_inicio}
                        onChange={handleChange}
                      />
                    )}
                  </InputMask>
                </div>
                <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ margin: "10px", width: "35vw", color: "#FFF" }}
                  >
                    Salvar
                  </Button>
                  {excluirIsVisible && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleExcluir(item.id)}
                      style={{ margin: "10px", width: "35vw", color: "#FFF" }}
                    >
                      Excluir
                    </Button>
                  )}
                </div>
              </Card>
              {renderErrorSB}
            </Grid>
          </Grid>
        </form>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default CadastroTurma;
