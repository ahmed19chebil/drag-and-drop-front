import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

import * as en from "./locales/en";
import * as fr from "./locales/fr";

// the translations
const resources = {
	en: {
		translation: en,
	},
	fr: {
		translation: fr,
	},
};

i18n
	.use(reactI18nextModule) // passes i18n down to react-i18next
	.init({
		resources,
		lng: "en",

		keySeparator: true, //  keys in form messages.welcome

		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
