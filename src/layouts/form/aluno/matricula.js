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
import ImageUpload from "components/ImageUpload";

function Matricula() {
  const navigate = useNavigate();

  //#region Funções
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

  const validarCPF = (cpf) => {
    // Remove caracteres não numéricos (pontos e traços)
    cpf = cpf.replace(/[^\d]/g, '');
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }
    // Verifica se todos os dígitos são iguais (caso inválido)
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }
    // Valida o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digitoVerificador1 = (soma * 10) % 11;
    if (digitoVerificador1 === 10 || digitoVerificador1 === 11) {
        digitoVerificador1 = 0;
    }
    // Valida o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let digitoVerificador2 = (soma * 10) % 11;
    if (digitoVerificador2 === 10 || digitoVerificador2 === 11) {
        digitoVerificador2 = 0;
    }
    // Verifica se os dígitos verificadores estão corretos
    return digitoVerificador1 === parseInt(cpf.charAt(9)) && 
           digitoVerificador2 === parseInt(cpf.charAt(10));
}

  //#endregion

  //#region notificações
  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const [contentErrorSB, setContentErrorSB] = useState("Erro!");
  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon=<ReportGmailerrorredIcon fontSize="small"></ReportGmailerrorredIcon>
      title="Erro!"
      content={contentErrorSB}
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
        descricao: "Não informado",
        data_inclusao: CurrentDateWithTimezone(),
        data_alteracao: null,
      },
      {
        id: 1,
        tipo_contato: "EMAIL",
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
    foto_perfil: null,
    data_nascimento: "",
    sexo: "",
    data_inclusao: CurrentDateWithTimezone(),
  });

  const [matriculaFormData, setMatriculaFormData] = useState({
    id: null,
    escolaridade_nome: "",
    turma_nome: "",
    curso_nome: "",
    empresa_nome: "",
    cbo_nome: "",
    data_inclusao: CurrentDateWithTimezone(),
    salario: null,
    data_inicio_contrato: null,
    data_terminio_contrato: null,
    data_inicio_empresa: null,
    quantidade_meses_contrato: null,
    data_terminio_empresa: null,
    hora_inicio_expediente: null,
    hora_fim_expediente: null,
    pessoa: null,
    escolaridade: null,
    turma: null,
    curso: null,
    empresa: null,
    cbo: null,
    dias_da_semana_empresa: [],
    dias_da_semana_curso: [],
    atividades_praticas: null,
  });
  //#endregion

  //#region verificação de state
  const location = useLocation();
  const item = location.state;

  React.useEffect(() => {
    if (item) {
      setInativarIsVisible(true);
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
            descricao: item.pessoa.contato[1]?.descricao ?? "Não informado",
            data_inclusao: item.pessoa.contato[1]?.data_inclusao ?? null,
            data_alteracao: CurrentDateWithTimezone(),
          },
          {
            id: item.pessoa.contato[2]?.id ?? null,
            tipo_contato: item.pessoa.contato[2]?.tipo_contato ?? null,
            descricao: item.pessoa.contato[2]?.descricao ?? null,
            data_inclusao: item.pessoa.contato[2]?.data_inclusao ?? null,
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
        foto_perfil: item.pessoa.foto_perfil ?? null,
        sexo: item.pessoa.sexo ?? "",
        data_nascimento: item.pessoa.data_nascimento ?? null,
        data_inclusao: item.pessoa.data_inclusao ?? null,
      });
      setMatriculaFormData({
        id: item.matricula.id ?? null,
        data_inclusao: item.matricula.data_inclusao ?? null,
        salario: item.matricula.salario ?? null,
        data_inicio_contrato: item.matricula.data_inicio_contrato ?? null,
        data_terminio_contrato: item.matricula.data_terminio_contrato ?? null,
        data_inicio_empresa: item.matricula.data_inicio_empresa ?? null,
        data_terminio_empresa: item.matricula.data_terminio_empresa ?? null,
        quantidade_meses_contrato: item.matricula.quantidade_meses_contrato ?? null,
        hora_inicio_expediente: item.matricula.hora_inicio_expediente ?? null,
        hora_fim_expediente: item.matricula.hora_fim_expediente ?? null,
        pessoa: item.pessoa.id ?? null,
        escolaridade: item.matricula.escolaridade ?? null,
        escolaridade_nome: item.matricula.escolaridade_nome ?? "Selecione um grau de escolaridade",
        turma: item.matricula.turma ?? null,
        turma_nome: item.matricula.turma_nome ?? "Selecione uma turma",
        curso: item.matricula.curso ?? null,
        curso_nome: item.matricula.curso_nome ?? "Selecione um curso",
        empresa: item.matricula.empresa ?? null,
        empresa_nome: item.matricula.empresa_nome ?? "Selecione um empresa",
        cbo: item.matricula.cbo ?? null,
        cbo_nome: item.matricula.cbo_nome ?? "Selecione um CBO",
        dias_da_semana_empresa: item.matricula.dias_da_semana_empresa ?? [],
        dias_da_semana_curso: item.matricula.dias_da_semana_curso ?? [],
        atividades_praticas: item.matricula.atividades_praticas ?? [],
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
          label: turma.nome + ' (' + turma.num_matriculas + ')',
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
          label: curso.codigo + ' ' + curso.nome,
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
          label: empresa.nome_fantasia,
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
        const formattedOptions = response.data.map((escolaridade) => ({
          label: escolaridade.descricao,
          value: escolaridade.id,
        }));
        setescolaridadeOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar escolaridades:", error);
      }
    };

    fetchEscolaridades();
  }, []);

  const sexoOptions = [
    {
      label: "Masculino",
      value: "M",
    },
    {
      label: "Feminino",
      value: "F",
    },
  ];

  const tipoContrato = [
    {
      label: "15",
      value: "15",
    },
    {
      label: "23",
      value: "23",
    },
  ];
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

  const handleChangeMatricula = (event) => {
    const { name, value } = event.target;
    const keys = name.split(".");

    setMatriculaFormData((prevFormData) => {
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

  const handleChangeFotoPerfil = (file) => {
    setFormData({ ...formData, foto_perfil: file });
  };

  const handleChangeSelectMatricula = (fieldPrefix) => async (event, value) => {
    if (value) {
      if (fieldPrefix == "sexo") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [fieldPrefix]: value.value,
        }));
      }
      if (fieldPrefix == "quantidade_meses_contrato") {
        await handleChangeQtdMesesCont(event);
        setMatriculaFormData((prevFormData) => ({
          ...prevFormData,
          [fieldPrefix]: value.value,
        }));
      } else {
        setMatriculaFormData((prevFormData) => ({
          ...prevFormData,
          [`${fieldPrefix}_nome`]: value.label,
          [fieldPrefix]: value.value,
        }));
      }
    }
  };

  const updatePessoaImage = async (id, imageFile) => {
    const formData = new FormData();
    formData.append("foto_perfil", imageFile);
    try {
      const response = await api.patch(`/pessoa/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!validarCPF(formData.documento[0].nro_documento)){
      setContentErrorSB("CPF inválido!");
      openErrorSB()
      return
    }
    try {
      if (item) {
        let foto_perfil = formData.foto_perfil;
        delete formData.foto_perfil;

        const responsePessoaPut = await api.patch(`/pessoa/${item.pessoa.id}/`, formData);
        updatePessoaImage(item.pessoa.id, foto_perfil);

        const responsematriculaPut = await api.put(
          `/api/estudante/matricula/${item.matricula.id}/`,
          matriculaFormData
        );
        navigate("/aprendizes");
      } else {
        //Armazena foto de perfil em variável, a ser enviada posteriormente
        let foto_perfil = formData.foto_perfil;
        formData.foto_perfil = null;

        //Cria registro de pessoa
        let pessoa_id = null;
        await api.post("/pessoa/", formData).then((responsePessoa) => {
          pessoa_id = responsePessoa.data.id;
          matriculaFormData.pessoa = pessoa_id;
          //Cria matrícula
          api.post("/api/estudante/matricula/", matriculaFormData);
        });
        //Atualiza foto de perfil
        updatePessoaImage(pessoa_id, foto_perfil);
        navigate("/aprendizes");
      }
    } catch (error) {
      setContentErrorSB("Erro ao salvar dados: " + "\n" + error);
      openErrorSB();
    }
  };

  const [inativarIsVisible, setInativarIsVisible] = useState(false);
  const handleInativar = async (matriculaId) => {
    try {
      const formData = new FormData();
      formData.append("ativo", false);
      await api.patch(`/api/estudante/matricula/${matriculaId}/`, formData);
      navigate("/aprendizes-inativos");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleBuscarCep = async () => {
    const cleanedCep = formData.endereco.cep.replace(/[^0-9]/g, "");

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

  function parseDate(dataInicio, qtdMeses) {
    let dataDigitadaSplit = dataInicio.split("/");

    let dia = dataDigitadaSplit[0];
    let mes = dataDigitadaSplit[1];
    let ano = dataDigitadaSplit[2];

    if (ano.length < 4 && parseInt(ano) < 50) {
      ano = "20" + ano;
    } else if (ano.length < 4 && parseInt(ano) >= 50) {
      ano = "19" + ano;
    }
    ano = parseInt(ano);

    mes = parseInt(mes) + parseInt(qtdMeses);

    //Virada de ano
    while (mes > 12) {
      ano += 1;
      mes -= 12;
    }

    //Adiciona 0 antes do mês
    if (mes < 10) {
      mes = "0" + mes;
    }

    return `${dia}/${mes}/${ano}`;
  }

  const handleChangeQtdMesesCont = async (event) => {
    let qtdMeses = event.target.innerText;
    let dataInicio = matriculaFormData.data_inicio_contrato;

    if (qtdMeses && dataInicio) {
      let dataTermino = parseDate(dataInicio, qtdMeses);
      setMatriculaFormData((prevState) => ({
        ...prevState,
        quantidade_meses_contrato: qtdMeses,
        data_terminio_contrato: dataTermino,
      }));
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
                <div style={{ display: "flex", gap: "10px" }}>
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
                  <ImageUpload value={formData.foto_perfil} onChange={handleChangeFotoPerfil} />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
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
                  <Autocomplete
                    style={{ margin: "10px", width: "12vw" }}
                    options={sexoOptions}
                    required
                    getOptionLabel={(option) => option.label}
                    onChange={handleChangeSelectMatricula("sexo")}
                    renderInput={(params) => <TextField {...params} label="sexo" />}
                    value={
                      formData
                        ? {
                            label:
                              sexoOptions.find((option) => option.value === formData.sexo)?.label ??
                              "",
                            value: formData.sexo ?? "",
                          }
                        : null
                    }
                  />
                  <Autocomplete
                    style={{ margin: "10px", width: "20vw" }}
                    options={escolaridadeOptions}
                    required
                    getOptionLabel={(option) => option.label}
                    onChange={handleChangeSelectMatricula("escolaridade")}
                    renderInput={(params) => <TextField {...params} label="Escolaridade" />}
                    value={
                      formData
                        ? {
                            label: matriculaFormData.escolaridade_nome,
                            value: matriculaFormData.escolaridade,
                          }
                        : null
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
                        id="descricao"
                        name="contato.1.descricao"
                        label="Telefone fixo"
                        value={formData.contato[1].descricao}
                        onChange={handleChange}
                      />
                    )}
                  </InputMask>
                </div>
                <TextField
                  style={{ margin: "10px", width: "33.25vw" }}
                  required
                  id="email"
                  name="contato.2.descricao"
                  label="E-mail"
                  type="email"
                  value={formData.contato[2].descricao}
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
                      Treinamento teórico
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Autocomplete
                    style={{ margin: "10px", width: "20vw" }}
                    options={turmasOptions}
                    required
                    getOptionLabel={(option) => option.label}
                    onChange={handleChangeSelectMatricula("turma")}
                    renderInput={(params) => <TextField {...params} label="Turma" />}
                    value={
                      matriculaFormData
                        ? { label: matriculaFormData.turma_nome, value: matriculaFormData.turma }
                        : null
                    }
                  />
                  <Autocomplete
                    style={{ margin: "10px", width: "20vw" }}
                    options={cursoOptions}
                    required
                    getOptionLabel={(option) => option.label}
                    onChange={handleChangeSelectMatricula("curso")}
                    renderInput={(params) => <TextField {...params} label="Curso" />}
                    value={
                      matriculaFormData
                        ? { label: matriculaFormData.curso_nome, value: matriculaFormData.curso }
                        : null
                    }
                  />
                      <div style={{ display: "flex", height: "10vh" }}>
    </div>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <InputMask
                    mask="99/99/9999"
                    value={matriculaFormData.data_inicio_contrato}
                    onChange={handleChangeMatricula}
                  >
                    {() => (
                      <TextField
                        style={{ margin: "10px", width: "20vw" }}
                        required
                        id="data_inicio_contrato"
                        name="data_inicio_contrato"
                        label="Início do contrato"
                        value={matriculaFormData.data_inicio_contrato}
                        onChange={handleChangeMatricula}
                      />
                    )}
                  </InputMask>
                  <Autocomplete
                    style={{ margin: "10px", width: "20vw" }}
                    options={tipoContrato}
                    required
                    getOptionLabel={(option) => option.label}
                    onChange={handleChangeSelectMatricula("quantidade_meses_contrato")}
                    renderInput={(params) => <TextField {...params} label="Quantidade de meses" />}
                    value={
                      matriculaFormData
                        ? {
                            label:
                              tipoContrato.find(
                                (option) =>
                                  option.value === matriculaFormData.quantidade_meses_contrato + ''
                              )?.label ?? "",
                            value: matriculaFormData.quantidade_meses_contrato + '' ?? "",
                          }
                        : null
                    }
                  />
                      <TextField
                        style={{ margin: "10px", width: "20vw" }}
                        disabled
                        id="data_terminio_contrato"
                        name="data_terminio_contrato"
                        label="Final do contrato"
                        defaultValue="--/--/----"
                        value={matriculaFormData.data_terminio_contrato}
                        onChange={handleChangeMatricula}
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
                      Treinamento prático
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Autocomplete
                    style={{ margin: "10px", width: "20vw" }}
                    options={empresaOptions}
                    required
                    getOptionLabel={(option) => option.label}
                    onChange={handleChangeSelectMatricula("empresa")}
                    renderInput={(params) => <TextField {...params} label="Empresa" />}
                    value={
                      matriculaFormData
                        ? {
                            label: matriculaFormData.empresa_nome,
                            value: matriculaFormData.empresa,
                          }
                        : null
                    }
                  />
                  <Autocomplete
                    style={{ margin: "10px", width: "20vw" }}
                    options={cboOptions}
                    required
                    getOptionLabel={(option) => option.label}
                    onChange={handleChangeSelectMatricula("cbo")}
                    renderInput={(params) => <TextField {...params} label="CBO" />}
                    value={
                      matriculaFormData
                        ? { label: matriculaFormData.cbo_nome, value: matriculaFormData.cbo }
                        : null
                    }
                  />
                  <InputMask
                    mask="R$ 9999.99"
                    value={matriculaFormData.salario}
                    onChange={handleChangeMatricula}
                  >
                    {() => (
                      <TextField
                        style={{ margin: "10px", width: "10vw" }}
                        required
                        id="salario"
                        name="salario"
                        label="Salário (R$)"
                        value={matriculaFormData.salario}
                        onChange={handleChangeMatricula}
                      />
                    )}
                  </InputMask>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <InputMask
                    mask="99/99/9999"
                    value={matriculaFormData.data_inicio_empresa}
                    onChange={handleChangeMatricula}
                  >
                    {() => (
                      <TextField
                        style={{ margin: "10px", width: "20vw" }}
                        required
                        id="data_inicio_empresa"
                        name="data_inicio_empresa"
                        label="Primeiro dia na empresa"
                        value={matriculaFormData.data_inicio_empresa}
                        onChange={handleChangeMatricula}
                      />
                    )}
                  </InputMask>
                  <InputMask
                    mask="99/99/9999"
                    value={matriculaFormData.data_terminio_empresa}
                    onChange={handleChangeMatricula}
                  >
                    {() => (
                      <TextField
                        style={{ margin: "10px", width: "20vw" }}
                        required
                        id="data_terminio_empresa"
                        name="data_terminio_empresa"
                        label="Último dia na empresa"
                        value={matriculaFormData.data_terminio_empresa}
                        onChange={handleChangeMatricula}
                      />
                    )}
                  </InputMask>
                  <InputMask
                    mask="99:99"
                    value={matriculaFormData.hora_inicio_expediente}
                    onChange={handleChangeMatricula}
                  >
                    {() => (
                      <TextField
                        style={{ margin: "10px", width: "10vw" }}
                        required
                        id="hora_inicio_expediente"
                        name="hora_inicio_expediente"
                        label="Horário de início do expediente"
                        value={matriculaFormData.hora_inicio_expediente}
                        onChange={handleChangeMatricula}
                      />
                    )}
                  </InputMask>
                  <InputMask
                    mask="99:99"
                    value={matriculaFormData.hora_fim_expediente}
                    onChange={handleChangeMatricula}
                  >
                    {() => (
                      <TextField
                        style={{ margin: "10px", width: "10vw" }}
                        required
                        id="hora_fim_expediente"
                        name="hora_fim_expediente"
                        label="Horário de encerramento do expediente"
                        value={matriculaFormData.hora_fim_expediente}
                        onChange={handleChangeMatricula}
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
                      Funções e responsabilidades
                    </MDTypography>
                  </MDBox>
                </MDBox>
                  <textarea
                  id="atividades_praticas"
                  required
                  defaultValue={matriculaFormData.atividades_praticas}
                  onBlur={(event) => {
                    setMatriculaFormData((prevState) => ({
                      ...prevState,
                      atividades_praticas: event.target.value,
                    }));
                  }}
                  rows="8"
                  cols="30"
                  placeholder="Descreva as atividades práticas na empresa.."
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
                <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ margin: "10px", width: "35vw", color: "#FFF" }}
                  >
                    Salvar
                  </Button>
                  {inativarIsVisible && (
                    <Button
                      variant="contained"
                      onClick={() => handleInativar(item.matricula.id)}
                      style={{
                        margin: "10px",
                        width: "35vw",
                        color: "#FFF",
                        backgroundColor: "#80001A",
                      }}
                    >
                      Inativar
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
