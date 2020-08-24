import React from "react";
import { withI18n } from "react-i18next";

import { DialogTitle, IconButton } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CancelIcon from "@material-ui/icons/Cancel";

import { useStyles } from "./styles";

/**
 * Component global CustomDialog
 *
 * @component
 *
 * @example
 * return (
 *   <CustomDialog/>
 * )
 */
function CustomDialog({
	t,
	openDialog,
	handleCloseDialog = false,
	title,
	children,
	height,
}) {
	const classes = useStyles();

	return (
		<div>
			<Dialog maxWidth="lg" open={openDialog} onClose={handleCloseDialog}>
				<DialogTitle>
					<span className={classes.dialogTitle}>{t(title)}</span>
					<IconButton
						className={classes.iconButtonStyle}
						onClick={handleCloseDialog}
					>
						<CancelIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent className={classes.dialogContentStyle}>
					{children}
				</DialogContent>
			</Dialog>
		</div>
	);
}
const connectedCustomDialog = withI18n()(CustomDialog); //Higher-Order Component
export { connectedCustomDialog as CustomDialog };
