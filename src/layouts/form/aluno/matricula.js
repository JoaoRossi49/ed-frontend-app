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
import { useLocation, useNavigate, NavLink } from "react-router-dom";

import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import api from "services/api.js";

function Matricula() {
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
    endereco: {
      id: 1,
      logradouro: "",
      numero: "",
      data_inclusao: CurrentDateWithTimezone(),
      complemento: "",
      cidade: "",
      estado: "",
      pais: "",
      cep: "",
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
        tipo_documento: "CPF",
      },
      {
        id: 1,
        nro_documento: "",
        data_inclusao: CurrentDateWithTimezone(),
        tipo_documento: "RG",
      },
    ],
    nome: "",
    nome_social: "",
    data_nascimento: "",
    data_inclusao: CurrentDateWithTimezone(),
    turma: {
      id: 1,
      nome:"",
    },
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
        endereco: {
          id: item.endereco.id,
          logradouro: item.endereco?.logradouro ?? null,
          numero: item.endereco?.numero ?? null,
          data_inclusao: item.endereco.data_inclusao ?? null,
          complemento: item.endereco?.complemento ?? null,
          cidade: item.endereco?.cidade ?? null,
          estado: item.endereco?.estado ?? null,
          pais: item.endereco?.pais ?? null,
          cep: item.endereco?.cep ?? null,
        },
        contato: [
          {
            id: item.contato[0]?.id ?? null,
            tipo_contato: item.contato[0]?.tipo_contato ?? null,
            descricao: item.contato[0]?.descricao ?? null,
            data_inclusao: item.contato[0]?.data_inclusao ?? null,
            data_alteracao: CurrentDateWithTimezone(),
          },
          {
            id: item.contato[1]?.id ?? null,
            tipo_contato: item.contato[1]?.tipo_contato ?? null,
            descricao: item.contato[1]?.descricao ?? null,
            data_inclusao: item.contato[1]?.data_inclusao ?? null,
            data_alteracao: CurrentDateWithTimezone(),
          },
        ],
        documento: [
          {
            id: item.documento[0]?.id ?? null,
            nro_documento: item.documento[0]?.nro_documento ?? null,
            data_inclusao: item.documento[0]?.data_inclusao ?? null,
            tipo_documento: item.documento[0]?.tipo_documento ?? null,
          },
          {
            id: item.documento[1]?.id ?? null,
            nro_documento: item.documento[1]?.nro_documento ?? null,
            data_inclusao: item.documento[1]?.data_inclusao ?? null,
            tipo_documento: item.documento[1]?.tipo_documento ?? null,
          },
        ],
        nome: item.nome ?? null,
        nome_social: item.nome_social ?? null,
        data_nascimento: item.data_nascimento ?? null,
        data_inclusao: item.data_inclusao ?? null,
        turma: {
          id: item.turma.id ?? null,
          nome: item.turma.nome ?? null,
        },
      });
    }
  }, [item]);

  //#endregion

  //#region carregar turmas
  const [options, setOptions] = useState([]);

  React.useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await api.get("/api/estudante/turmas/");
        const formattedOptions = response.data.map((turma) => ({
          label: turma.nome,
          value: turma.id,
        }));
        setOptions(formattedOptions);
        console.log(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar as turmas:", error);
      }
    };

    fetchTurmas();
  }, []);
  //#endregion

  //#region handles
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

      console.log(newFormData);
      return newFormData;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (item) {
        const responsePut = await api.put(`/api/pessoa/${item.id}/`, formData);
        console.log(responsePut.data.status);
        openSuccessSB();
        navigate("/aluno");
      } else {
        const response = await api.post("/api/pessoa/", formData);
        console.log(response.data.status);
        openSuccessSB();
        navigate("/aluno");
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
                  <InputMask
                    mask="99/99/9999"
                    value={formData.data_nascimento}
                    onChange={handleChange}
                  >
                    {() => (
                      <TextField
                        style={{ margin: "10px" }}
                        required
                        id="data_nascimento"
                        name="data_nascimento"
                        label="Data de nascimento"
                        value={formData.data_nascimento}
                        onChange={handleChange}
                      />
                    )}
                  </InputMask>
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
                  <InputMask mask="99999-999" value={formData.endereco.cep} onChange={handleChange}>
                    {() => (
                      <TextField
                        style={{ margin: "10px" }}
                        id="cep"
                        name="endereco.cep"
                        label="Cep"
                        value={formData.endereco.cep}
                        onChange={handleChange}
                      />
                    )}
                  </InputMask>
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
                <InputMask
                  mask="999.999.999.99"
                  value={formData.documento[0].nro_documento}
                  onChange={handleChange}
                >
                  {() => (
                    <TextField
                      style={{ margin: "10px", width: "33.25vw" }}
                      required
                      id="nro_documento"
                      name="documento.0.nro_documento"
                      label="CPF"
                      value={formData.documento[0].nro_documento}
                      onChange={handleChange}
                    />
                  )}
                </InputMask>
                <InputMask
                  mask="99.999.999-9"
                  value={formData.documento[1].nro_documento}
                  onChange={handleChange}
                >
                  {() => (
                    <TextField
                      style={{ margin: "10px", width: "33.25vw" }}
                      required
                      id="nro_documento"
                      name="documento.1.nro_documento"
                      label="RG"
                      value={formData.documento[1].nro_documento}
                      onChange={handleChange}
                    />
                  )}
                </InputMask>
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
                  <InputMask
                    mask="(99) 99999-9999"
                    value={formData.contato[0].descricao}
                    onChange={handleChange}
                  >
                    {() => (
                      <TextField
                        style={{ margin: "10px", width: "33.25vw" }}
                        required
                        id="descricao"
                        name="contato.0.descricao"
                        label="Celular"
                        value={formData.contato[0].descricao}
                        onChange={handleChange}
                      />
                    )}
                  </InputMask>
                  <InputMask
                    mask="(99) 9999-9999"
                    value={formData.contato[1].descricao}
                    onChange={handleChange}
                  >
                    {() => (
                      <TextField
                        style={{ margin: "10px", width: "33.25vw" }}
                        required
                        id="descricao"
                        name="contato.1.descricao"
                        label="Telefone fixo"
                        value={formData.contato[1].descricao}
                        onChange={handleChange}
                      />
                    )}
                  </InputMask>
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
                      Turma
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <Autocomplete
                style={{ margin: "10px", width: "33.25vw" }}
                  disablePortal
                  id="turma-combo-box"
                  options={options}
                  value={formData.turma.nome}
                  onChange={(event, newValue) => {
                    handleChange({
                      target: {
                        name: 'turma',
                        value: {
                          id: newValue?.value?? null,
                          nome: newValue?.label?? '',
                        },
                      },
                    });
                  }}
                  renderInput={(params) => <TextField {...params} label="Turma" />}
                />
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

export default Matricula;
