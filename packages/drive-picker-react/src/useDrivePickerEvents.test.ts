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

import type { DrivePickerElement } from "@googleworkspace/drive-picker-element";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useDrivePickerEvents } from "./useDrivePickerEvents";

describe("useDrivePickerEvents", () => {
	let mockElement: DrivePickerElement;
	let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
	let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;
	let mockRef: React.RefObject<DrivePickerElement>;

	beforeEach(() => {
		mockElement = {
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		} as unknown as DrivePickerElement;

		addEventListenerSpy = vi.spyOn(mockElement, "addEventListener");
		removeEventListenerSpy = vi.spyOn(mockElement, "removeEventListener");

		mockRef = { current: mockElement };
	});

	it("should add event listeners when the hook is mounted", () => {
		const handlers = {
			onPicked: vi.fn(),
			onCanceled: vi.fn(),
		};

		renderHook(() => useDrivePickerEvents(mockRef, handlers));

		expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
		expect(addEventListenerSpy).toHaveBeenCalledWith(
			"picker-picked",
			expect.any(Function),
		);
		expect(addEventListenerSpy).toHaveBeenCalledWith(
			"picker-canceled",
			expect.any(Function),
		);
	});

	it("should remove event listeners when the component unmounts", () => {
		const handlers = {
			onPicked: vi.fn(),
		};

		const { unmount } = renderHook(() =>
			useDrivePickerEvents(mockRef, handlers),
		);

		expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
		expect(addEventListenerSpy).toHaveBeenCalledWith(
			"picker-picked",
			expect.any(Function),
		);

		unmount();

		expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
		expect(removeEventListenerSpy).toHaveBeenCalledWith(
			"picker-picked",
			expect.any(Function),
		);
	});

	it("should call the correct handler when an event is dispatched", () => {
		const onPicked = vi.fn();
		const onCanceled = vi.fn();

		renderHook(() => useDrivePickerEvents(mockRef, { onPicked, onCanceled }));

		const pickedListener = addEventListenerSpy.mock.calls[0][1];
		const canceledListener = addEventListenerSpy.mock.calls[1][1];

		const mockPickedEvent = new CustomEvent("picker-picked", {
			detail: { docs: [{ id: "1", name: "file1" }] },
		});
		const mockCanceledEvent = new CustomEvent("picker-canceled", {
			detail: { action: "canceled" },
		});

		// Manually trigger the listeners
		pickedListener(mockPickedEvent);
		canceledListener(mockCanceledEvent);

		expect(onPicked).toHaveBeenCalledTimes(1);
		expect(onPicked).toHaveBeenCalledWith(mockPickedEvent);
		expect(onCanceled).toHaveBeenCalledTimes(1);
		expect(onCanceled).toHaveBeenCalledWith(mockCanceledEvent);
	});

	it("should not add listeners for undefined handlers", () => {
		const handlers = {
			onPicked: vi.fn(),
			onCanceled: undefined,
		};

		renderHook(() => useDrivePickerEvents(mockRef, handlers));

		expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
		expect(addEventListenerSpy).toHaveBeenCalledWith(
			"picker-picked",
			expect.any(Function),
		);
		expect(addEventListenerSpy).not.toHaveBeenCalledWith(
			"picker-canceled",
			expect.any(Function),
		);
	});
});
