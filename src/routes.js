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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "./layouts/dashboard";
import Alunos from "./layouts/alunos";
import SignInSide from "components/Signin/SignIn";
import Matricula from "layouts/form/aluno/matricula";

// @mui icons
import Icon from "@mui/material/Icon";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import Turmas from "layouts/turmas";
import CadastroTurma from "layouts/form/turma/cadastroTurma";



const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <DashboardIcon fontSize="small"></DashboardIcon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "divider",
    key: "dashboard",
  },
  {
    type: "title",
    title: "Alunos e matrículas",
  },
  {
    type: "collapse",
    name: "Alunos",
    key: "alunos",
    icon: <SchoolIcon fontSize="small"></SchoolIcon>,
    route: "/aluno",
    component: <Alunos />,
  },
  {
    type: "collapse",
    name: "Matricular",
    key: "matricular",
    icon: <SchoolIcon fontSize="small"></SchoolIcon>,
    route: "/aluno/add",
    component: <Matricula />,
  },
  {
    type: "divider",
    key: "alunos",
  },
  {
    type: "title",
    title: "Gerência de turmas",
  },
  {
    type: "collapse",
    name: "Turmas",
    key: "turmas",
    icon: <SchoolIcon fontSize="small"></SchoolIcon>,
    route: "/turmas",
    component: <Turmas />,
  },
  {
    type: "collapse",
    name: "Cadastrar turmas",
    key: "cadastrar_turma",
    icon: <SchoolIcon fontSize="small"></SchoolIcon>,
    route: "/turma/add",
    component: <CadastroTurma />,
  },
/*  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small"></Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small"></Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small"></Icon>,
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small"></Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small"></Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small"></Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small"></Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },*/
];

export default routes;
