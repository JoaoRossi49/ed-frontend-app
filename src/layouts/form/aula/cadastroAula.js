import React, { useState } from "react";
import axios from "axios";
import { Grid, Card, Box, TextField, Button, Autocomplete } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import InputMask from "react-input-mask";
import { useLocation, useNavigate, NavLink, Form } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";

import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import api from "services/api.js";

import aprendizesTableData from "../../../layouts/aprendizes/data/aprendizesTableData";
import { useCallback } from "react";

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function CadastroAula() {
  const navigate = useNavigate();

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
    tema: null,
    conteudo: null,
    ocorrencias: null,
    data_aula: null,
    turma: null,
    turma_nome: "",
    educador: null,
    educador_nome: "",
    modulo: null,
    modulo_nome: "",
  });
  //#endregion

  //#region verificação de state
  const location = useLocation();
  const item = location.state;

  React.useEffect(() => {
    if (item) {
      setExcluirIsVisible(true);
      setListaPresencaIsVisible(true);
      setFormData({
        tema: item.tema ?? null,
        conteudo: item.conteudo ?? null,
        ocorrencias: item.ocorrencias ?? null,
        data_aula: item.data_aula ?? null,
        turma: item.turma ?? null,
        turma_nome: item.turma_nome ?? "Selecione a turma",
        educador: item.educador ?? null,
        educador_nome: item.educador_nome ?? "Selecione o educador",
        modulo: item.modulo ?? null,
        modulo_nome: item.modulo_nome ?? "Selecione o módulo aplicado",
      });
    }
  }, [item]);

  //#endregion

  //#region selects
  const [turmasOptions, setturmasOptions] = useState([]);

  React.useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await api.get("/api/estudante/turmas/");
        const formattedOptions = response.data.map((turma) => ({
          label: turma.nome,
          value: turma.id,
        }));
        setturmasOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar as turmas:", error);
      }
    };

    fetchTurmas();
  }, []);

  const [modulosOptions, setmodulosOptions] = useState([]);

  React.useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await api.get("/api/estudante/modulos/");
        const formattedOptions = response.data.map((modulo) => ({
          label: modulo.nome,
          value: modulo.id,
        }));
        setmodulosOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar os módulos:", error);
      }
    };

    fetchModulos();
  }, []);
  //#endregion

  const handleChangeSelectAula = (fieldPrefix) => async (event, value) => {
    if (value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [`${fieldPrefix}_nome`]: value.label,
        [fieldPrefix]: value.value,
      }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name) {
      const keys = name.split(".");
      if (Array.isArray(keys) && keys.length > 0) {
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
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (item) {
        const responsePut = await api.put(`/api/estudante/aulas/${item.id}/`, formData);
        openSuccessSB();
        navigate("/aulas");
      } else {
        const response = await api.post("/api/estudante/aulas/", formData);
        openSuccessSB();
        navigate("/aulas");
      }
    } catch (error) {
      openErrorSB();
    }
  };

  const [excluirIsVisible, setExcluirIsVisible] = useState(false);
  const handleExcluir = async (deleteItemId) => {
    try {
      await api.delete(`estudante/aulas/${deleteItemId}/`);
      navigate("/aulas");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //#endregion lista de presença
  const ListaPresenca = () => {
    return (
      <div>
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
              Registro de presença
            </MDTypography>
          </MDBox>
        </MDBox>
          <DataTable
            table={{ columns, filteredRows }}
            isSorted={true}
            entriesPerPage={false}
            showTotalEntries={true}
            noEndBorder
          />
      </div>
    );
  };
  //#endregion

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
                    style={{ margin: "10px", width: "38vw" }}
                    required
                    id="tema"
                    name="tema"
                    label="Tema discutido"
                    value={formData.tema}
                    onChange={handleChange}
                  />
                  <InputMask mask="99/99/9999" value={formData.data_aula} onChange={handleChange}>
                    {() => (
                      <TextField
                        style={{ margin: "10px" }}
                        required
                        id="data_aula"
                        name="data_aula"
                        label="Data da aula"
                        value={formData.data_aula}
                        onChange={handleChange}
                      />
                    )}
                  </InputMask>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Autocomplete
                    style={{ margin: "10px", width: "20vw" }}
                    options={turmasOptions}
                    required
                    getOptionLabel={(option) => option.label}
                    onChange={handleChangeSelectAula("turma")}
                    renderInput={(params) => <TextField {...params} label="Turma" />}
                    value={formData ? { label: formData.turma_nome, value: formData.turma } : null}
                  />
                  <Autocomplete
                    style={{ margin: "10px", width: "20vw" }}
                    options={modulosOptions}
                    required
                    getOptionLabel={(option) => option.label}
                    onChange={handleChangeSelectAula("modulo")}
                    renderInput={(params) => <TextField {...params} label="Módulo" />}
                    value={
                      formData ? { label: formData.modulo_nome, value: formData.modulo } : null
                    }
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
                      Conteúdo da aula
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <textarea
                  id="conteudo"
                  value={formData.conteudo}
                  onChange={handleChange}
                  rows="8"
                  cols="30"
                  placeholder="Descreva o conteúdo aplicado na aula..."
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    margin: "10px",
                    borderRadius: "5px",
                    border: "0.5px solid #ccc",
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "Arial",
                  }}
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
                      Ocorrências
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <textarea
                  id="ocorrencias"
                  value={formData.ocorrencias}
                  onChange={handleChange}
                  rows="4"
                  cols="30"
                  placeholder="Descreva ocorrências ..."
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    margin: "10px",
                    borderRadius: "5px",
                    border: "0.5px solid #ccc",
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "Arial",
                  }}
                />
                    <Button variant="contained" color="primary" onClick={handleOpenDialog} style={{ margin: "10px", width: "35vw", color: "#FFF" }}>
                    Ver lista de presença
                  </Button>
                  <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Registro de presença</DialogTitle>
                    <DialogContent>
                      <div>Olá!</div>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog}>Fechar</Button>
                    </DialogActions>
                  </Dialog>
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

export default CadastroAula;
