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
