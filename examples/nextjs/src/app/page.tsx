"use client";

import type {
	OAuthErrorEvent,
	OAuthResponseEvent,
	PickerCanceledEvent,
	PickerErrorEvent,
	PickerPickedEvent,
} from "@googleworkspace/drive-picker-react";
import {
	DrivePicker,
	DrivePickerDocsView,
} from "@googleworkspace/drive-picker-react";
import React, { useState } from "react";

export default function Home() {
	const appId = process.env.NEXT_PUBLIC_APP_ID;
	const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
	const developerKey = process.env.NEXT_PUBLIC_DEVELOPER_KEY;

	const [events, setEvents] = useState<unknown[]>([]);
	const [origin, setOrigin] = useState<string>("");

	React.useEffect(() => {
		setOrigin(window.location.origin);
	}, []);

	const handlePicked = (e: PickerPickedEvent) => {
		console.log("Picked:", e.detail);
		setEvents((prev) => [
			...prev,
			{ event: "picker-picked", detail: e.detail },
		]);
	};

	const handleCanceled = (e: PickerCanceledEvent) => {
		console.log("Canceled:", e.detail);
		setEvents((prev) => [
			...prev,
			{ event: "picker-canceled", detail: e.detail },
		]);
	};

	const handlePickerError = (e: PickerErrorEvent) => {
		console.error("Picker Error:", e.detail);
		setEvents((prev) => [...prev, { event: "picker-error", detail: e.detail }]);
	};

	const handleOauthError = (e: OAuthErrorEvent) => {
		console.error("OAuth Error:", e.detail);
		setEvents((prev) => [
			...prev,
			{ event: "picker-oauth-error", detail: e.detail },
		]);
	};

	const handleOauthResponse = (e: OAuthResponseEvent) => {
		console.log("OAuth Response:", e.detail);
		setEvents((prev) => [
			...prev,
			{ event: "picker-oauth-response", detail: e.detail },
		]);
	};

	return (
		<main>
			<h1>Google Drive Picker - Next.js Example</h1>
			<DrivePicker
				app-id={appId}
				client-id={clientId}
				developer-key={developerKey}
				origin={origin || undefined}
				multiselect
				prompt="consent"
				onPicked={handlePicked}
				onCanceled={handleCanceled}
				onPickerError={handlePickerError}
				onOauthError={handleOauthError}
				onOauthResponse={handleOauthResponse}
			>
				<DrivePickerDocsView
					view-id="DOCS"
					enable-drives="true"
					include-folders="true"
					select-folder-enabled="true"
				/>
			</DrivePicker>

			<section style={{ marginTop: "2rem" }}>
				<h2>Events Log</h2>
				{events.length === 0 ? (
					<p style={{ color: "#666" }}>No events yet.</p>
				) : (
					events.map((ev, i) => (
						<pre
							key={i}
							style={{
								background: "#f4f4f4",
								padding: "1rem",
								borderRadius: "4px",
								overflowX: "auto",
							}}
						>
							{JSON.stringify(ev, null, 2)}
						</pre>
					))
				)}
			</section>
		</main>
	);
}
