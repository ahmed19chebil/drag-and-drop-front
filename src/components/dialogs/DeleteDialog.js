import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withI18n } from "react-i18next";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { useSelector } from "react-redux";

/**
 * Component global DeleteDialog
 *
 * @component
 *
 * @example
 * return (
 *   <DeleteDialog/>
 * )
 */
function DeleteDialog({
	open = false,
	handleClose,
	t,
	dialogTitle,
	dialogContent,
	handleClickDelete,
}) {
	const ui = useSelector((state) => state.ui);
	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>
					{t(dialogTitle)}
					<IconButton
						style={{
							position: "sticky",
							left: "98%",
						}}
						onClick={handleClose}
					>
						<CancelIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>{t(dialogContent)}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClickDelete}
						disabled={ui.disabledDialog}
						color="primary"
					>
						{t("common.confirm")}
					</Button>
					<Button onClick={handleClose} autoFocus>
						{t("common.cancel")}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
const connectedDeleteDialog = withI18n()(DeleteDialog); //Higher-Order Component
export { connectedDeleteDialog as DeleteDialog };
