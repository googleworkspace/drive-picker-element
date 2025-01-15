/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
			transform: (src: string) => {
				const element = document.createElement("div");
				element.innerHTML = src;
				const html = element
					.querySelector("template")
					?.innerHTML.replace(APP_ID, "YOUR_APP_ID")
					.replace(CLIENT_ID, "YOUR_CLIENT_ID");
				return html || src;
			},
		},
	},
};

export const APP_ID = "675807958095";
export const CLIENT_ID =
	"675807958095-nsptdcn5qdb6pl44cge1c6ghact9t5q0.apps.googleusercontent.com";
