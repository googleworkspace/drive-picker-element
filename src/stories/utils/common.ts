export const META_PARAMETERS = {
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	docs: {
		canvas: {
			withToolbar: false,
			sourceState: "shown",
		},
		source: {
			format: "html",
			language: "html",
			dark: true,
			// extract the template part of the source code
			transform: (src: string) =>
				(src.match(/<template>(.*?)<\/template>/) ?? [])[1],
		},
	},
};

export const APP_ID = "675807958095";
export const CLIENT_ID =
	"675807958095-nsptdcn5qdb6pl44cge1c6ghact9t5q0.apps.googleusercontent.com";
