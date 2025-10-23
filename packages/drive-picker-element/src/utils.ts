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
export const GSI_URL = "https://accounts.google.com/gsi/client";

export async function loadApi(api = "client:picker"): Promise<typeof google> {
	if (!window.gapi) {
		await injectScript(GAPI_URL);
	}

	await new Promise<void>((r) => {
		window.gapi.load(api, r);
	});

	return window.google;
}

export class ClientConfigError extends Error {
	constructor(
		public readonly configError: google.accounts.oauth2.ClientConfigError,
	) {
		super(configError.message);
	}
}

export async function requestAccessToken(
	tokenClientConfig: Omit<
		google.accounts.oauth2.TokenClientConfig,
		"callback" | "error_callback"
	>,
): Promise<google.accounts.oauth2.TokenResponse> {
	if (!window.google?.accounts?.oauth2) {
		await injectScript(GSI_URL);
	}
	return new Promise((resolve, reject) => {
		const client = window.google.accounts.oauth2.initTokenClient({
			...tokenClientConfig,
			callback: resolve,
			error_callback: reject,
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
					onerror: reject,
				}),
			);
		} else {
			resolve();
		}
	});
}

export function getNumberAttribute(
	element: Element,
	name: string,
): number | null {
	const value = element.getAttribute(name);
	return value ? Number(value) : null;
}

export enum BoolAttrWithDefault {
	FALSE = 0,
	TRUE = 1,
	DEFAULT = 2,
}

export function getBoolAttr(element: Element, name: string): boolean {
	return element.hasAttribute(name);
}

export function getBoolAttrWithDefault(
	element: Element,
	name: string,
): BoolAttrWithDefault {
	const attributeValue = element.getAttribute(name)?.toUpperCase();

	if (!attributeValue) {
		return BoolAttrWithDefault.DEFAULT;
	}

	const value =
		BoolAttrWithDefault[attributeValue as keyof typeof BoolAttrWithDefault];

	if (value !== undefined) {
		return value;
	}

	throw new Error(
		`Invalid value, "${attributeValue}", for attribute ${name}. Must be one of ${Object.keys(BoolAttrWithDefault).filter(Number.isNaN).join(", ")}`,
	);
}

export function setBoolAttrWithDefault<T>(
	name: string,
	element: Element,
	setter: (value: boolean) => T,
	instance: T,
): T {
	const attr = getBoolAttrWithDefault(element, name);

	if (attr === BoolAttrWithDefault.DEFAULT) {
		return instance;
	}

	return setter.call(instance, attr === BoolAttrWithDefault.TRUE);
}
