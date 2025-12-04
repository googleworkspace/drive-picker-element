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

/**
 * Injects a script into the document head.
 *
 * This function always creates and appends a new script element, even if a script with the same src
 * already exists. This is done to avoid race conditions where an existing script might have already
 * loaded (or failed) before we could attach event listeners, causing the promise to hang indefinitely.
 *
 * To ensure compatibility with Content Security Policy (CSP) and other requirements, this function
 * copies all attributes (including `nonce`, `integrity`, `crossorigin`, etc.) from any existing
 * script tag with the same src to the new script tag.
 *
 * Note: The script at the provided `src` must be idempotent, as it may be executed multiple times
 * if it is already present in the document.
 */
export async function injectScript(src: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const newScript = document.createElement("script");
		newScript.src = src;
		newScript.onload = () => resolve();
		newScript.onerror = (err) => reject(err);

		// Check for an existing script to copy attributes from.
		// This is important for CSP compliance (nonce, integrity) and other attributes.
		const existingScript = document.querySelector<HTMLScriptElement>(
			`script[src="${src}"]`,
		);
		if (existingScript) {
			console.log(
				`drive-picker: appending a copy of an existing script ${src}`,
			);
			// Copy all attributes except those that would conflict or are handled manually
			Array.from(existingScript.attributes).forEach((attr) => {
				if (["id", "src", "onload", "onerror"].includes(attr.name)) {
					return;
				}
				newScript.setAttribute(attr.name, attr.value);
			});

			// Nonce must be copied as a property because it's not always exposed in attributes.
			// The nonce attribute is hidden from getAttribute() and attributes for security reasons.
			// It is safe to reuse the same nonce for multiple scripts on the same page (same HTTP response).
			if (existingScript.nonce) {
				newScript.nonce = existingScript.nonce;
			}
		}

		document.head.appendChild(newScript);
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
