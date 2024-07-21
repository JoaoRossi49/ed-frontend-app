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
    sexo: "",
    data_inclusao: CurrentDateWithTimezone(),
  });

  const [matriculaFormData, setMatriculaFormData] = useState({
    id: null,
    data_inclusao: CurrentDateWithTimezone(),
    pessoa: null,
    turma: null,
    turma_nome: "Selecione uma turma",
    cbo: null,
    cbo_nome: "Selecione um CBO",
    curso: null,
    curso_nome: "Selecione um curso",
    empresa: null,
    empresa_nome: "Selecione uma empresa",
  });
  //#endregion

  //#region verificação de state
  const location = useLocation();
  const item = location.state;

  React.useEffect(() => {
    if (item) {
      setExcluirIsVisible(true);
      setFormData({
        id: item.pessoa.id,
        endereco: {
          id: item.pessoa.endereco.id,
          logradouro: item.pessoa.endereco?.logradouro ?? null,
          numero: item.pessoa.endereco?.numero ?? null,
          data_inclusao: item.pessoa.endereco.data_inclusao ?? null,
          complemento: item.pessoa.endereco?.complemento ?? null,
          cidade: item.pessoa.endereco?.cidade ?? null,
          estado: item.pessoa.endereco?.estado ?? null,
          pais: item.pessoa.endereco?.pais ?? null,
          cep: item.pessoa.endereco?.cep ?? null,
        },
        contato: [
          {
            id: item.pessoa.contato[0]?.id ?? null,
            tipo_contato: item.pessoa.contato[0]?.tipo_contato ?? null,
            descricao: item.pessoa.contato[0]?.descricao ?? null,
            data_inclusao: item.pessoa.contato[0]?.data_inclusao ?? null,
            data_alteracao: CurrentDateWithTimezone(),
          },
          {
            id: item.pessoa.contato[1]?.id ?? null,
            tipo_contato: item.pessoa.contato[1]?.tipo_contato ?? null,
            descricao: item.pessoa.contato[1]?.descricao ?? null,
            data_inclusao: item.pessoa.contato[1]?.data_inclusao ?? null,
            data_alteracao: CurrentDateWithTimezone(),
          },
        ],
        documento: [
          {
            id: item.pessoa.documento[0]?.id ?? null,
            nro_documento: item.pessoa.documento[0]?.nro_documento ?? null,
            data_inclusao: item.pessoa.documento[0]?.data_inclusao ?? null,
            tipo_documento: item.pessoa.documento[0]?.tipo_documento ?? null,
          },
          {
            id: item.pessoa.documento[1]?.id ?? null,
            nro_documento: item.pessoa.documento[1]?.nro_documento ?? null,
            data_inclusao: item.pessoa.documento[1]?.data_inclusao ?? null,
            tipo_documento: item.pessoa.documento[1]?.tipo_documento ?? null,
          },
        ],
        nome: item.pessoa.nome ?? null,
        nome_social: item.pessoa.nome_social ?? null,
        sexo: item.pessoa.sexo ?? null,
        data_nascimento: item.pessoa.data_nascimento ?? null,
        data_inclusao: item.pessoa.data_inclusao ?? null,
      });
      setMatriculaFormData({
        id: item.matricula.id ?? null,
        data_inclusao: item.matricula.data_inclusao ?? null,
        pessoa: item.pessoa.id,
        turma: item.matricula.turma ?? null,
        turma_nome: item.matricula.turma_nome ?? "Selecione uma turma",
        cbo: item.matricula.cbo ?? null,
        cbo_nome: item.matricula.cbo ?? "Selecione um CBO",
        curso: item.matricula.curso ?? null,
        curso_nome: item.matricula.curso_nome ?? "Selecione um curso",
        empresa: item.matricula.empresa ?? null,
        empresa_nome: item.matricula.empresa_nome ?? "Selecione um empresa",
        escolaridade: item.matricula.escolaridade ?? null,
        escolaridade_nome: item.matricula.escolaridade_nome ?? "Selecione um grau de escolaridade",
      });
    }
  }, [item]);

  //#endregion

  //#region carregar listas dropDown
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

  const [cboOptions, setcboOptions] = useState([]);

  React.useEffect(() => {
    const fetchCbo = async () => {
      try {
        const response = await api.get("/api/estudante/cbos/");
        const formattedOptions = response.data.map((cbo) => ({
          label: cbo.descricao,
          value: cbo.id,
        }));
        setcboOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar os cbos:", error);
      }
    };

    fetchCbo();
  }, []);

  const [cursoOptions, setcursoOptions] = useState([]);

  React.useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await api.get("/api/estudante/cursos/");
        const formattedOptions = response.data.map((curso) => ({
          label: curso.descricao,
          value: curso.id,
        }));
        setcursoOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar os cursos:", error);
      }
    };

    fetchCursos();
  }, []);

  const [empresaOptions, setempresaOptions] = useState([]);

  React.useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await api.get("/api/estudante/empresas/");
        const formattedOptions = response.data.map((empresa) => ({
          label: empresa.descricao,
          value: empresa.id,
        }));
        setempresaOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar as empresas:", error);
      }
    };

    fetchEmpresas();
  }, []);

  const [escolaridadeOptions, setescolaridadeOptions] = useState([]);

  React.useEffect(() => {
    const fetchEscolaridades = async () => {
      try {
        const response = await api.get("/api/estudante/escolaridades/");
        const formattedOptions = response.data.map((curso) => ({
          label: curso.descricao,
          value: curso.id,
        }));
        setescolaridadeOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar escolaridades:", error);
      }
    };

    fetchEscolaridades();
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
      return newFormData;
    });
  };

  const handleChangeMatricula = (event, value) => {
    if (value) {
      setMatriculaFormData({ ...value, turma_nome: value.label, turma: value.value });
    } else {
      setMatriculaFormData(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (item) {
        //Alteração de pessoa existente
        const responsePessoaPut = await api.put(`/api/pessoa/${item.pessoa.id}/`, formData);
        const responsematriculaPut = await api.put(
          `/api/estudante/matricula/${item.matricula.id}/`,
          matriculaFormData
        );
        openSuccessSB();
        navigate("/aluno");
      } else {
        //Criação de nova pessoa
        const responsePessoa = await api.post("/api/pessoa/", formData);
        const responseMatricula = await api.post("/api/estudante/matricula/", matriculaFormData);
        const formAlterarMatricula = {
          pessoa: responsePessoa.data.id,
        };
        const responsematriculaPut = await api.put(
          `/api/estudante/matricula/${responseMatricula.data.id}/`,
          formAlterarMatricula
        );
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

  const handleBuscarCep = async () => {
    const cleanedCep = formData.endereco.cep.replace(/[^0-9]/g, "");
    console.log(cleanedCep);

    if (cleanedCep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cleanedCep}/json/`);
        if (response.data.erro) {
          openErrorSB();
        } else {
          setFormData((prevState) => ({
            ...prevState,
            endereco: {
              id: 1,
              logradouro: response.data.logradouro,
              data_inclusao: CurrentDateWithTimezone(),
              cidade: response.data.localidade,
              estado: response.data.uf,
              cep: formData.endereco.cep,
              pais: "Brasil",
            },
          }));
        }
      } catch (error) {
        openErrorSB();
      }
    } else {
      openErrorSB();
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
                    label="Nome do aprendiz"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ margin: "10px", width: "27vw" }}
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
                <div>
                  <TextField
                    style={{ margin: "10px", width: "27vw" }}
                    id="sexo"
                    name="sexo"
                    label="Sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ margin: "10px", width: "27vw" }}
                    id="escolaridade"
                    name="escolaridade"
                    label="Escolaridade"
                    value={formData.escolaridade}
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
                  <InputMask
                    mask="99999-999"
                    value={formData.endereco.cep}
                    onChange={handleChange}
                    onBlur={handleBuscarCep}
                  >
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
                  <TextField
                    style={{ margin: "10px", width: "30vw" }}
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
                </div>
                <div>
                  <TextField
                    style={{ margin: "10px", width: "30vw" }}
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
                <div>
                  <InputMask
                    mask="999.999.999.99"
                    value={formData.documento[0].nro_documento}
                    onChange={handleChange}
                  >
                    {() => (
                      <TextField
                        style={{ margin: "10px", width: "20vw" }}
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
                        style={{ margin: "10px", width: "20vw" }}
                        required
                        id="nro_documento"
                        name="documento.1.nro_documento"
                        label="RG"
                        value={formData.documento[1].nro_documento}
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
                      Informações contratuais
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <Autocomplete
                  style={{ margin: "10px" }}
                  options={turmasOptions}
                  getOptionLabel={(option) => option.label}
                  onChange={handleChangeMatricula}
                  renderInput={(params) => <TextField {...params} label="Turma" />}
                  defaultValue={{ label: "", value: null }}
                  value={
                    matriculaFormData
                      ? { label: matriculaFormData.turma_nome, value: matriculaFormData.turma }
                      : null
                  }
                />
                <Autocomplete
                  style={{ margin: "10px" }}
                  options={options}
                  getOptionLabel={(option) => option.label}
                  onChange={handleChangeMatricula}
                  renderInput={(params) => <TextField {...params} label="Turma" />}
                  defaultValue={{ label: "", value: null }}
                  value={
                    matriculaFormData
                      ? { label: matriculaFormData.turma_nome, value: matriculaFormData.turma }
                      : null
                  }
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
                      onClick={() => handleExcluir(item.pessoa.id)}
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
