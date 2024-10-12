/* eslint-disable react/prop-types */
import React from "react";
import { NavLink } from "react-router-dom";
import { List, ListItem, ListItemText } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

import ListIcon from "@mui/icons-material/List";

const SidenavSubmenu = ({ title, routes }) => {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const collapseName = location.pathname.replace("/", "");

  return (
    <List>
      <ListItem onClick={handleToggle}>
          <SidenavCollapse name={title} icon={open ? <ExpandLess /> : <ExpandMore />} />
      </ListItem>
      {open && (
        <div style={{ marginLeft: "30px" }}>
          <List>
            {routes.map((route) => (
              <ListItem key={0} component={NavLink} to={route.path}>
                <NavLink key={route.key} to={route.route}>
                  <SidenavCollapse
                    name={route.name}
                    icon={route.icon}
                    active={route.key === collapseName}
                  />
                </NavLink>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </List>
  );
};

export default SidenavSubmenu;
