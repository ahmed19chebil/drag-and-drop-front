import React from "react";
import DeleteForeverSharpIcon from "@material-ui/icons/DeleteForeverSharp";
import CreateSharpIcon from "@material-ui/icons/CreateSharp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withI18n } from "react-i18next";
import { useStyles } from "./styles";

function TaskActionForm({ t, deleteTask, updateTask }) {
	const classes = useStyles();
	return (
		<List>
			<ListItem button onClick={updateTask} className={classes.firstItem}>
				<ListItemText primary={t("tasks.update")} style={{ color: "green" }} />
				<CreateSharpIcon style={{ color: "green" }} />
			</ListItem>

			<ListItem button onClick={deleteTask}>
				<ListItemText primary={t("tasks.delete")} style={{ color: "red" }} />
				<DeleteForeverSharpIcon style={{ color: "red" }} />
			</ListItem>
		</List>
	);
}

const connectedTaskActionForm = withI18n()(TaskActionForm); //Higher-Order Component
export { connectedTaskActionForm as TaskActionForm };
