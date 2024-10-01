/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

import { useNavigate } from "react-router-dom";

//api
import api from "../../services/api";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 90,
    color: theme.palette.mode === "light" ? "rgb(26, 115, 232)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "1px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 14,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

export default function DropDownMenu({ item }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const reativar = async () => {
    try {
      const formData = new FormData();
      formData.append("ativo", true);
      await api.patch(`estudante/matricula/${item.matricula.id}/`, formData);
      navigate("/aprendizes");
    } catch (error) {
      console.error("Erro ao reativar aprendiz:", error);
    }
  }

  const gerarContrato = async () => {
    try {
      const response = await api.get(
        `estudante/contrato/${item.matricula.numero_matricula}/`,
        {
          responseType: "blob", // Configura o tipo de resposta para blob
        }
      );
      // Define nome do contrato
      const nomeArquivo = `contrato_${item.pessoa.nome}.docx`;

      // Cria um URL para o Blob recebido
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", nomeArquivo); // Nome do arquivo a ser baixado

      // Adiciona o link ao DOM e clica nele para iniciar o download
      document.body.appendChild(link);
      link.click();

      // Remove o link do DOM após o download
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao obter o contrato", error);
    }
  };

  const gerarCalendario = async () => {
    try {
      const response = await api.get(
        `estudante/calendario/${item.matricula.numero_matricula}/`
      );
      const calendarioHtml = await response.data;

      // Abre uma nova guia e renderiza o HTML
      const newTab = window.open();
      newTab.document.write(calendarioHtml);
      newTab.document.close();
    } catch (error) {
      console.error("Erro ao obter o calendario", error);
    }
  };

  if (item.matricula.ativo){
  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon color="white" />}
      >
        <MenuIcon color="white" />
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple>
          <Button onClick={gerarContrato}>
            <div>
              <FileCopyIcon />
              <span>Contrato</span>
            </div>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button onClick={gerarCalendario}>
            <div>
              <CalendarMonthIcon />
              <span>Calendário</span>
            </div>
          </Button>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}else{
  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon color="white" />}
      >
        <MenuIcon color="white" />
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple>
          <Button onClick={reativar}>
              <ReplayCircleFilledIcon />
              <span>Reativar</span>
          </Button>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
}
