import type {
	DrivePickerElement,
	OAuthErrorEvent,
	OAuthResponseEvent,
	PickerCanceledEvent,
	PickerPickedEvent,
} from "@googleworkspace/drive-picker-element";
import { useEffect } from "react";

export interface DrivePickerEventHandlers {
	/**
	 * A callback function that is called when the user picks one or more items.
	 * @param e The event object. See [`ResponseObject`](https://developers.google.com/drive/picker/reference/picker.responseobject).
	 */
	onPicked?: (e: PickerPickedEvent) => void;
	/**
	 * A callback function that is called when the user cancels the picker dialog.
	 * @param e The event object. See [`ResponseObject`](https://developers.google.com/drive/picker/reference/picker.responseobject).
	 */
	onCanceled?: (e: PickerCanceledEvent) => void;
	/**
	 * A callback function that is called when an error occurs in the OAuth flow.
	 * @param e The event object. See the [error guide](https://developers.google.com/identity/oauth2/web/guides/error).
	 */
	onOauthError?: (e: OAuthErrorEvent) => void;
	/**
	 * A callback function that is called when an OAuth flow completes.
	 * @param e The event object. See the [token model guide](https://developers.google.com/identity/oauth2/web/guides/use-token-model).
	 */
	onOauthResponse?: (e: OAuthResponseEvent) => void;
}

/**
 * A custom hook that manages event listeners for a `DrivePickerElement`.
 *
 * @param ref A React ref to the `DrivePickerElement`.
 * @param handlers An object containing event handlers for the `DrivePickerElement`.
 *
 * @example
 * ```tsx
 * const ref = useRef<DrivePickerElement>(null);
 * useDrivePickerEvents(ref, { onPicked: (e) => console.log(e.detail) });
 * ```
 */
export function useDrivePickerEvents(
	ref: React.RefObject<DrivePickerElement>,
	handlers: DrivePickerEventHandlers,
) {
	const { onPicked, onCanceled, onOauthError, onOauthResponse } = handlers;

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const eventMap = {
			"picker-picked": onPicked,
			"picker-canceled": onCanceled,
			"picker-oauth-error": onOauthError,
			"picker-oauth-response": onOauthResponse,
		};

		const listeners: { [key: string]: EventListener } = {};

		Object.entries(eventMap).forEach(([eventName, handler]) => {
			if (handler) {
				const listener = (e: Event) => (handler as (e: Event) => void)(e);
				listeners[eventName] = listener;
				element.addEventListener(eventName, listener);
			}
		});

		return () => {
			Object.entries(listeners).forEach(([eventName, listener]) => {
				element.removeEventListener(eventName, listener);
			});
		};
	}, [ref, onPicked, onCanceled, onOauthError, onOauthResponse]);
}
