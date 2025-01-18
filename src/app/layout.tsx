import "@/styles/globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { env } from "@/env";
import { NuqsAdapter } from "nuqs/adapters/next";
import Script from "next/script";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "OMEGA Scripts",
	description: "Best scripts for BO6 & Warzone",
	icons: [{ rel: "icon", url: "/photo_2024-12-03_19-35-25.jpg" }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${inter.className}`}>
			<body className="h-full m-0 bg-gray-800">
				<Script src="/677d25027022cd5a840592a4.js" />
				<NuqsAdapter>{children}</NuqsAdapter>
			</body>
		</html>
	);
}
