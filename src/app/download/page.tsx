"use client";

import axios, { isAxiosError } from "axios";
import { LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

export default function Download() {
	const [isLoading, setLoading] = useState(true);
	const [isAllowed, setAllowed] = useState(false);
	const router = useRouter();
	const [orderID] = useQueryState("orderID");

	useEffect(() => {
		if (!orderID) {
			return router.push("/");
		}
	}, [orderID, router]);

	useEffect(() => {
		axios({
			url: "/api/capture",
			method: "POST",
			data: JSON.stringify({
				orderID,
			}),
		})
			.then((response) => {
				if (response.data.status === "COMPLETED") {
					setLoading(false);
					setAllowed(true);
				}
			})
			.catch((error) => {
				if (isAxiosError(error)) {
					if (error.status === 500) {
						return router.push("/");
					}
				}
			});
	}, [orderID, router]);

	if (isLoading) {
		return (
			<div className="w-full h-screen flex flex-row justify-center items-center gap-2">
				<LoaderCircleIcon className="animate-spin" size={20} color="white" />
				<span className="text-white font-bold text-xl">Loading</span>
			</div>
		);
	}

	const handleDownload = async () => {
		console.log("downloading");
	};

	if (!isLoading && isAllowed) {
		return (
			<div className="w-full h-screen flex flex-col justify-center items-center gap-2">
				<button
					type="button"
					onClick={handleDownload}
					className="bg-white p-2 w-[200px] rounded font-bold hover:brightness-90 transition-all duration-200 text-cyan-700"
				>
					Click to download
				</button>
				<span className="text-white">
					Incase you're on mobile, copy this link to download it later
				</span>
				<Link
					href={`https://${window.location.host}
					${window.location.pathname}
					${`?orderID=${orderID}`}`}
					className="text-blue-400 underline underline-offset-2 cursor-pointer"
				>
					https://{window.location.host}
					{window.location.pathname}
					{`?orderID=${orderID}`}
				</Link>
			</div>
		);
	}
}
