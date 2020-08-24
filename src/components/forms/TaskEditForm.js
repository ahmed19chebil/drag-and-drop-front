import React, { useEffect, useState, Fragment } from "react";
import { withI18n } from "react-i18next";
import { useSelector } from "react-redux";
import { ChromePicker } from "react-color";
import {
	Button,
	InputLabel,
	Grid,
	TextField,
	Select,
	MenuItem,
	FormControl,
	FormHelperText,
	ListItemIcon,
	Typography,
	Divider,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useStyles } from "./styles";
import { iconsList, shapesList, RGBAToHex } from "../../helpers";

function TaskEditForm({ t, handleClose, textButton, task, handelUpdateTask }) {
	const classes = useStyles();
	const ui = useSelector((state) => state.ui);
	const tasks = useSelector((state) => state.tasks);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [title, setTitle] = useState("");
	const [titleError, setTitleError] = useState("");
	const [color, setColor] = useState("");
	const [colorError, setColorError] = useState("");
	const [form, setForm] = useState("");
	const [formError, setFormError] = useState("");
	const [icon, setIcon] = useState("");
	const [iconError, setIconError] = useState("");
	const [relations, setRelations] = useState([]);
	const [relation, setRelation] = useState({});

	useEffect(() => {
		if (task) {
			setTitle(task.title);
			setColor(task.color);
			setForm(task.form);
			setIcon(task.icon);
			setRelations(task.linkedTasks);

			const list = [...tasks.data];
			const index = list.findIndex((item) => item._id === task._id);
			if (index > -1) {
				list.splice(index, 1);
			}

			setFilteredTasks(list);
		}
	}, [task]);

	const changeColor = (e) => {
		if (e.source == "rgb") {
			const colorHex = RGBAToHex(e.rgb.r, e.rgb.g, e.rgb.b, e.rgb.a);
			setColor(colorHex);
		} else {
			setColor(e.hex);
		}
	};
	const changeTitle = (e) => {
		setTitleError("");
		setTitle(e.target.value);
	};
	const changeForm = (e) => {
		setFormError("");
		setForm(e.target.value);
	};
	const changeIcon = (e) => {
		setIconError("");
		setIcon(e.target.value);
	};
	const changesRelations = (e) => {
		setRelations(e);
	};
	const selectRelation = (e) => {
		setRelation(e.target.value);
	};

	const changeRelationText = (e) => {
		const index = relations.findIndex((item) => item._id === relation._id);
		let linkedTasksCopy = [...relations];
		linkedTasksCopy[index].relation = e.target.value;
		setRelations(linkedTasksCopy);
	};

	const handleSubmit = () => {
		if (!title) {
			setTitleError("tasks.title.required");
		} else if (!form) {
			setTitleError("tasks.form.required");
		} else if (!icon) {
			setTitleError("tasks.icon.required");
		} else if (!color) {
			setTitleError("tasks.color.required");
		} else {
			handelUpdateTask(title, form, icon, color, relations);
		}
	};

	return (
		<div>
			<Grid container spacing={5}>
				<Grid item xs={12} sm={12}>
					<TextField
						fullWidth
						onChange={changeTitle}
						value={title}
						variant="outlined"
						label={t("tasks.title") + " *"}
						helperText={t(titleError)}
						error={titleError ? true : false}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					<FormControl
						variant="outlined"
						className={classes.formControl}
						error={formError ? true : false}
					>
						<Fragment>
							<InputLabel>{t("tasks.form") + " *"}</InputLabel>
							<Select
								value={form}
								onChange={changeForm}
								label={t("tasks.form") + " *"}
							>
								{shapesList.map((shape, index) => {
									return (
										<MenuItem value={shape.value} key={index}>
											{shape.name}
										</MenuItem>
									);
								})}
							</Select>
						</Fragment>
						<FormHelperText>{t(formError)}</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={12}>
					<FormControl
						variant="outlined"
						className={classes.formControl}
						error={iconError ? true : false}
					>
						<Fragment>
							<InputLabel>{t("tasks.icon") + " *"}</InputLabel>
							<Select
								value={icon}
								onChange={changeIcon}
								label={t("tasks.icon") + " *"}
							>
								{iconsList.map((icon, index) => {
									return (
										<MenuItem value={icon.value} key={index}>
											<ListItemIcon>{icon.icon}</ListItemIcon>
											<Typography variant="inherit">{icon.name}</Typography>
										</MenuItem>
									);
								})}
							</Select>
						</Fragment>
						<FormHelperText>{t(iconError)}</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={12}>
					<Autocomplete
						getOptionSelected={(option, value) => option._id === value._id}
						value={relations}
						multiple
						onChange={(event, newValue) => {
							changesRelations(newValue);
						}}
						limitTags={5}
						id="multiple-limit-tags"
						options={filteredTasks}
						getOptionLabel={(option) => option.title}
						renderInput={(params) => (
							<TextField
								{...params}
								variant="outlined"
								label={t("tasks.linked.list")}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={5}>
							<FormControl variant="outlined" className={classes.formControl}>
								<Fragment>
									<InputLabel>{t("tasks.linked")}</InputLabel>
									<Select
										value={relation}
										onChange={selectRelation}
										label={t("tasks.linked")}
										disabled={relations.length > 0 ? false : true}
									>
										{relations.map((item, index) => {
											return (
												<MenuItem value={item} key={index}>
													{item.title}
												</MenuItem>
											);
										})}
									</Select>
								</Fragment>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={7}>
							<TextField
								fullWidth
								onChange={changeRelationText}
								value={relation.relation || ""}
								variant="outlined"
								label={t("tasks.linked.text")}
								InputLabelProps={{
									shrink: true,
								}}
								disabled={relation._id ? false : true}
								helperText={t("tasks.linked.helper")}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={12}>
					<FormControl
						className={classes.formControl}
						error={colorError ? true : false}
					>
						<Fragment>
							<InputLabel>{t("tasks.color") + " *"}</InputLabel>
							<ChromePicker color={color} onChangeComplete={changeColor} />
						</Fragment>
						<FormHelperText>{t(colorError)}</FormHelperText>
					</FormControl>
				</Grid>
			</Grid>

			<Button
				className={classes.btnStyle}
				onClick={handleSubmit}
				variant="contained"
				color="primary"
				disabled={ui.disabledDialog}
			>
				{t(textButton)}
			</Button>
		</div>
	);
}

const connectedTaskEditForm = withI18n()(TaskEditForm); //Higher-Order Component
export { connectedTaskEditForm as TaskEditForm };
