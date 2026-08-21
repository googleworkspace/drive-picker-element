import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
	title: "Drive Picker Next.js Example",
	description: "Google Drive Picker Next.js example",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				style={{
					fontFamily: "system-ui, -apple-system, sans-serif",
					margin: 0,
					padding: "2rem",
				}}
			>
				{children}
			</body>
		</html>
	);
}
