import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";
import { withI18n } from "react-i18next";
import { withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { CLOSE_SNACKBAR } from "../../store/types";

/**
 * Component global snackbar
 *
 * @component
 *
 * @example
 * return (
 *   <SnackBar/>
 * )
 */
class SnackBar extends Component {
	handleClose = (prop) => (event) => {
		const { dispatch } = this.props;
		dispatch({ type: CLOSE_SNACKBAR });
	};
	render() {
		const { t, snackbar, message, severity, varaible = "" } = this.props;
		return (
			<Snackbar
				style={{
					whiteSpace: "pre-line",
				}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				open={snackbar}
				onClose={this.handleClose()}
				message={varaible ? t(message, varaible) : t(message)}
				autoHideDuration={3000}
				className={severity}
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						onClick={this.handleClose()}
					>
						<CloseIcon />
					</IconButton>
				}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	const { snackbar, message, severity, varaible } = state.ui;
	return {
		snackbar,
		message,
		severity,
		varaible,
	};
};

const connectedSnackBarPage = withRouter(
	connect(mapStateToProps, null, null, {
		pure: false,
	})(withI18n()(SnackBar))
);

export { connectedSnackBarPage as SnackBar };
