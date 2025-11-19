/**
 * Copyright 2025 Google LLC
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

import {
	DrivePicker,
	DrivePickerDocsView,
} from "@googleworkspace/drive-picker-react";
import React from "react";

function App() {
	const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
	const APP_ID = import.meta.env.VITE_APP_ID;

	const [events, setEvents] = React.useState<unknown[]>([]);

	return (
		<>
			<DrivePicker
				client-id={CLIENT_ID}
				app-id={APP_ID}
				onOauthResponse={(e) => setEvents([...events, e.detail])}
				onPicked={(e) => setEvents([...events, e.detail])}
				onCanceled={(e) => setEvents([...events, e.detail])}
			>
				<DrivePickerDocsView owned-by-me="true" />
			</DrivePicker>
			{events.map((event, index) => (
				<pre className="event" key={index}>
					{JSON.stringify(event, null, 2)}
				</pre>
			))}
		</>
	);
}

export default App;
