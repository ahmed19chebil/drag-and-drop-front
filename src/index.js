import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { history } from "./helpers/history";
import { Router } from "react-router-dom";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

const initialState = window.initialReduxState;
const store = configureStore(history, initialState);
const rootElement = document.getElementById("root");

ReactDOM.render(
	<I18nextProvider i18n={i18n}>
		<Provider store={store}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>
	</I18nextProvider>,
	rootElement
);
