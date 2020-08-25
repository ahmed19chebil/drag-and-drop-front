import React from "react";
import { TaskTypeItem } from "../forms/TaskTypeItem";
import { useStyles } from "./styles";
import { withI18n } from "react-i18next";
import { Typography } from "@material-ui/core";
import { sideBarItems } from "../../helpers";

function ToolsSideBar({ t }) {
  const classes = useStyles();

  return (
    <div className={classes.toolWrapper}>
      <Typography variant="h5" className={classes.title}>
        {t("common.tools")}
      </Typography>
      {sideBarItems.map(item => (
        <TaskTypeItem
          title={item.title}
          form={item.form}
          color={item.color}
          key={item.title}
          icon={item.icon}
          left={item.left}
          top={item.top}
        />
      ))}
    </div>
  );
}

const connectedToolsSideBar = withI18n()(ToolsSideBar); //Higher-Order Component
export { connectedToolsSideBar as ToolsSideBar };
