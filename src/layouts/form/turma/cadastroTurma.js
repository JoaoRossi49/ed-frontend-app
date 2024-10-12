import React, { useState } from "react";
import { Grid, Card, Box, TextField, Button } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import Switch from "@mui/material/Switch";

import api from "services/api.js";

function CadastroTurma() {
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
    id: 1,
    nome: "",
    descricao: "",
    data_inclusao: null,
    data_inicio: null,
    data_fim: null,
    dias_da_semana_empresa: [],
    dias_da_semana_curso: [],
    hora_inicio_encontro: null,
    hora_fim_encontro: null,
  });
  //#endregion

  //#region verificação de state
  const location = useLocation();
  const item = location.state;

  React.useEffect(() => {
    if (item) {
      //Por enquanto, excluir uma turma não será possível
      //setExcluirIsVisible(true);
      setFormData({
        id: item.id,
        nome: item.nome ?? null,
        descricao: item.descricao ?? null,
        data_inclusao: item.data_inclusao ?? null,
        data_inicio: item.data_inicio ?? null,
        data_fim: item.data_fim ?? null,
        dias_da_semana_empresa: item.dias_da_semana_empresa ?? [],
        dias_da_semana_curso: item.dias_da_semana_curso ?? [],
        hora_inicio_encontro: item.hora_inicio_encontro ?? null,
        hora_fim_encontro: item.hora_fim_encontro ?? null,
      });
    }
  }, [item]);

  //#endregion
  const [diasSemanaSelecionados, setDiasSemanaSelecionados] = useState({
    dias_da_semana_empresa: item?.dias_da_semana_empresa ?? [],
    dias_da_semana_curso: item?.dias_da_semana_curso ?? [],
  });
  const handleRadioChange = (event) => {
    const selecionado = parseInt(event.target.value, 10);
    setDiasSemanaSelecionados((prevState) => {
      const novosDiasCurso = prevState.dias_da_semana_curso.includes(selecionado)
        ? prevState.dias_da_semana_curso.filter((dia) => dia !== selecionado)
        : [...prevState.dias_da_semana_curso, selecionado];

      const novosDiasEmpresa = [1, 2, 3, 4, 5].filter((dia) => !novosDiasCurso.includes(dia));

      setFormData((prevFormData) => ({
        ...prevFormData,
        dias_da_semana_curso: novosDiasCurso,
        dias_da_semana_empresa: novosDiasEmpresa,
      }));

      return {
        dias_da_semana_empresa: novosDiasEmpresa,
        dias_da_semana_curso: novosDiasCurso,
      };
    });
  };

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
        const responsePut = await api.put(`/api/estudante/turmas/${item.id}/`, formData);
        openSuccessSB();
        navigate("/turmas");
      } else {
        const response = await api.post("/api/estudante/turmas/", formData);
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
      await api.delete(`estudante/turmas/${deleteItemId}/`);
      navigate("/turmas");
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
                <div style={{ display: "flex", gap: "10px" }}>
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
                      Rotina de aprendizagem
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <div style={{ display: "flex", gap: "10px" }}>
                  <InputMask
                    mask="99:99"
                    value={formData.hora_inicio_encontro}
                    onChange={handleChange}
                  >
                    {() => (
                      <TextField
                        style={{ margin: "10px", width: "18vw" }}
                        required
                        id="hora_inicio_encontro"
                        name="hora_inicio_encontro"
                        label="Horário de início do encontro"
                        value={formData.hora_inicio_encontro}
                        onChange={handleChange}
                      />
                    )}
                  </InputMask>
                  <InputMask
                    mask="99:99"
                    value={formData.hora_fim_encontro}
                    onChange={handleChange}
                  >
                    {() => (
                      <TextField
                        style={{ margin: "10px", width: "18vw" }}
                        required
                        id="hora_fim_encontro"
                        name="hora_fim_encontro"
                        label="Horário do fim do encontro"
                        value={formData.hora_fim_encontro}
                        onChange={handleChange}
                      />
                    )}
                  </InputMask>
                </div>
                <span style={{ fontSize: 14, opacity: 0.6, marginLeft: 20 }}>
                  Selecione os dias da semana em que ocorrerão os encontros da turma
                </span>
                <form style={{ marginLeft: 20, fontSize: 16}}>
                  {[1, 2, 3, 4, 5].map((dia) => (
                    <div key={dia}>
                      <Switch
                        name="dias_da_semana"
                        value={dia}
                        checked={diasSemanaSelecionados.dias_da_semana_curso.includes(dia)}
                        onChange={handleRadioChange}
                      />
                      <label>{["Segunda", "Terça", "Quarta", "Quinta", "Sexta"][dia - 1]}</label>
                    </div>
                  ))}
                </form>
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
