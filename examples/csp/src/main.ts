import "@googleworkspace/drive-picker-element";
import type {
	DrivePickerElement,
	PickerPickedEvent,
} from "@googleworkspace/drive-picker-element";

const picker = document.getElementById("picker") as DrivePickerElement;
const openButton = document.getElementById("open-picker") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;

// Optional: Set credentials via JS if not in HTML
// picker.setAttribute('client-id', 'YOUR_CLIENT_ID');
// picker.setAttribute('app-id', 'YOUR_APP_ID');

openButton.addEventListener("click", () => {
	picker.visible = true;
});

picker.addEventListener("picker-picked", (e: Event) => {
	const event = e as PickerPickedEvent;
	console.log("Picked:", event.detail);
	resultDiv.innerHTML = '';
	const pre = document.createElement('pre');
	pre.textContent = JSON.stringify(event.detail, null, 2);
	resultDiv.appendChild(pre);
});

picker.addEventListener("picker-canceled", () => {
	console.log("Canceled");
	resultDiv.textContent = "Picker canceled";
});

picker.addEventListener("picker-oauth-error", (e) => {
	console.error("OAuth Error", e);
	resultDiv.textContent = "OAuth Error: " + JSON.stringify(e);
});
