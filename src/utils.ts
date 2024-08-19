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

const GAPI_URL = "https://apis.google.com/js/api.js";
const GSI_URL = "https://accounts.google.com/gsi/client";

export async function loadApi(api = "client:picker") {
	if (!window.gapi) {
		await injectScript(GAPI_URL);
	}

	await new Promise<void>((r) => {
		window.gapi.load(api, r);
	});
}

export async function retrieveAccessToken(
	clientId: string,
	scope: string,
): Promise<string> {
	if (!window.google?.accounts?.oauth2) {
		await injectScript(GSI_URL);
	}

	return new Promise((resolve) => {
		const client = google.accounts.oauth2.initTokenClient({
			client_id: clientId,
			scope,

			callback: ({ access_token }) => {
				resolve(access_token);
			},
			error_callback: (error) => {
				throw error;
			},
		});

		client.requestAccessToken();
	});
}

export async function injectScript(src: string): Promise<void> {
	return new Promise((resolve, reject) => {
		if (!document.querySelector(`script[src="${src}"]`)) {
			document.head.appendChild(
				Object.assign(document.createElement("script"), {
					src,
					onload: resolve,
					onerror: () => {
						reject(`error loading ${src}`);
					},
				}),
			);
		} else {
			resolve();
		}
	});
}
