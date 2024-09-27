<script lang="ts">
import { PUBLIC_APP_ID, PUBLIC_CLIENT_ID } from "$env/static/public";
import "../../../../dist/index.js";

import type { DrivePickerElement, DrivePickerEvent } from "../../../../dist";

let event: unknown;
let ref: DrivePickerElement;
let visible = true;

function onEvent(e: DrivePickerEvent) {
	event = e;
	visible = ref.visible;
	console.log(event);
}
</script>

<drive-picker
  bind:this={ref}
  on:picked={onEvent}
  on:canceled={onEvent}
  client-id={PUBLIC_CLIENT_ID}
  app-id={PUBLIC_APP_ID}
>
</drive-picker>

{#if !visible}
  <button on:click={() => (visible = !visible)}> Show picker </button>
  {#if event}<pre><code>{JSON.stringify(event, null, 2)}</code></pre>{/if}
{/if}
