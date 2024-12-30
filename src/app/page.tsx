"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhiteStar from "@/components/WhiteStar";
import { ArrowBigRight, Redo } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { env } from "@/env";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ApproveProps {
	billingToken?: string | null;
	facilitatorAccessToken?: string;
	orderID: string;
	payerID?: string | null;
	paymentID?: string | null;
	subscriptionID?: string | null;
	authCode?: string | null;
}

export default function HomePage() {
	const initialOptions = {
		clientId: env.NEXT_PUBLIC_CLIENT_ID,
		currency: "USD",
		intent: "capture",
	};

	const router = useRouter();
	const [time, setTime] = useState<number>(28.8 * 60);
	const [timerText, setTimerText] = useState<string>("00:28:49");
	const [isVisible1, setIsVisible1] = useState(false);
	const [isVisible2, setIsVisible2] = useState(false);
	const divRef = useRef<HTMLDivElement | null>(null);
	const otherDivRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const updateTimer = () => {
			const hours: number = Math.floor(time / 3600);
			const minutes: number = Math.floor((time % 3600) / 60);
			const seconds: number = time % 60;

			const formattedHours =
				hours < 10 ? `0${Math.round(hours)}` : `${Math.round(hours)}`;
			const formattedMinutes =
				minutes < 10 ? `0${Math.round(minutes)}` : `${Math.round(minutes)}`;
			const formattedSeconds =
				seconds < 10 ? `0${Math.round(seconds)}` : `${Math.round(seconds)}`;

			setTimerText(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);

			if (time > 0) {
				setTime((prevTime) => prevTime - 1);
			}
		};

		const interval = setInterval(updateTimer, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [time]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.length > 0) {
					const entry = entries[0];
					if (entry?.isIntersecting) {
						setIsVisible1(true);
					}
				}
			},
			{
				threshold: 0.1,
			},
		);

		if (divRef.current) {
			observer.observe(divRef.current);
		}

		return () => {
			if (divRef.current) {
				observer.unobserve(divRef.current);
			}
		};
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.length > 0) {
					const entry = entries[0];
					if (entry?.isIntersecting) {
						setIsVisible2(true);
					}
				}
			},
			{
				threshold: 0.1,
			},
		);

		if (otherDivRef.current) {
			observer.observe(otherDivRef.current);
		}

		return () => {
			if (otherDivRef.current) {
				observer.unobserve(otherDivRef.current);
			}
		};
	}, []);

	const createOrder = async () => {
		const response = await axios.post("/api/order");

		if (!response.data.id) {
			return alert("Error during order creation.");
		}

		return response.data.id;
	};

	const onApprove = async (data: ApproveProps) => {
		if (data.orderID) {
			return router.push(`/download?orderID=${data.orderID}`);
		}
	};

	return (
		<>
			<PayPalScriptProvider options={initialOptions}>
				<Header />
				<motion.main
					className="flex flex-col justify-center items-center px-4 lg:px-[30px]"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 2 }}
				>
					<div className="flex flex-col lg:flex-row justify-start items-center">
						<div className="pr-20">
							<motion.img
								src="/pixelcut-export.png"
								alt="cheat"
								className="w-full lg:w-[545px]"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									delay: 0.2,
									duration: 0.5,
								}}
							/>
						</div>
						<div className="w-full lg:w-[575px] flex flex-col justify-start items-center pt-10">
							<div className="flex flex-col justify-start items-start w-full">
								<motion.span
									className="text-[23px] lg:text-[34px] font-bold text-white"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5 }}
								>
									OMEGA Lazer - BO6 Script
								</motion.span>
							</div>
							<div className="flex flex-row justify-start w-full">
								<div className="flex flex-col justify-start w-full pt-1 items-start">
									<a
										href="#reviews"
										className="flex flex-row items-center cursor-pointer"
									>
										<WhiteStar />
										<WhiteStar />
										<WhiteStar />
										<WhiteStar />
										<WhiteStar />
										<span className="px-2 text-[16px] text-white">
											12 reviews
										</span>
									</a>
									<div className="flex flex-row justify-start w-full items-center gap-3">
										<span className="text-[19px] text-[#43d9f0] font-normal	">
											$50.00
										</span>
										<span className="text-[19px] text-[#b4b4b4] font-normal	line-through">
											$75.00
										</span>
									</div>
								</div>
								<div className="flex flex-col items-end w-full">
									<span className="text-white">Sale ends in:</span>
									<div id="timer" className="text-2xl text-[#43d9f0] font-bold">
										{timerText}
									</div>
								</div>
							</div>
							<div className="w-full pt-4">
								<PayPalButtons
									createOrder={createOrder}
									onApprove={onApprove}
								/>
							</div>
							<div className="flex flex-col justify-center items-center pt-4 gap-1">
								<span className="text-[12px] text-white">
									Secure Checkout With
								</span>
								<div className="flex flex-row gap-2 items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="vtl-pl-main-widget__logo"
										width={48}
										height={30}
										viewBox="0 0 240 150"
										fill="none"
									>
										<title>star</title>
										<g clipPath="url(#paypal__a)">
											<path
												fill="#000"
												d="M221.053 0H18.947C8.211 0 0 8.125 0 18.75v112.5C0 141.875 8.842 150 18.947 150h202.106c10.736 0 18.947-8.125 18.947-18.75V18.75C240 8.125 231.158 0 221.053 0Z"
												opacity=".07"
											/>
											<path
												fill="#fff"
												d="M221.333 6C228.3 6 234 11.646 234 18.546v112.909c0 6.9-5.7 12.545-12.667 12.545H18.667C11.7 144 6 138.355 6 131.455V18.545C6 11.646 11.7 6 18.667 6h202.666Z"
											/>
											<g clipPath="url(#paypal__b)">
												<path
													fill="#003087"
													d="M81.554 60.799a.812.812 0 0 0-.808.674l-4.664 28.873a.721.721 0 0 0 .172.595.756.756 0 0 0 .576.259h5.531a.813.813 0 0 0 .808-.674l1.37-8.48a.812.812 0 0 1 .809-.674h5.029c5.876 0 10.864-4.184 11.775-9.855.919-5.719-3.658-10.706-10.145-10.718H81.553Zm5.377 6.445h4.024c3.313 0 4.391 1.908 4.05 4.018-.34 2.115-2.016 3.672-5.22 3.672h-4.096l1.242-7.69Zm26.471 1.963c-1.397.005-3.004.285-4.808 1.018-4.139 1.684-6.126 5.164-6.97 7.701 0 0-2.687 7.74 3.383 11.993 0 0 5.629 4.095 11.966-.252l-.11.68a.717.717 0 0 0 .173.594.77.77 0 0 0 .574.26h5.251a.812.812 0 0 0 .808-.675l3.195-19.773a.734.734 0 0 0-.431-.786.77.77 0 0 0-.316-.069h-5.251a.813.813 0 0 0-.809.675l-.171 1.064s-2.293-2.445-6.484-2.43Zm.172 6.245c.603 0 1.154.082 1.649.237 2.266.71 3.55 2.834 3.179 5.137-.459 2.836-2.841 4.924-5.897 4.924-.602 0-1.154-.08-1.649-.236-2.265-.71-3.558-2.835-3.186-5.138.458-2.835 2.848-4.924 5.904-4.924Z"
												/>
												<path
													fill="#0070E0"
													d="M157.172 60.799a.812.812 0 0 0-.808.674l-4.665 28.873a.734.734 0 0 0 .432.786.77.77 0 0 0 .317.068h5.531a.813.813 0 0 0 .808-.674l1.37-8.48a.813.813 0 0 1 .809-.674h5.029c5.876 0 10.863-4.184 11.774-9.855.919-5.719-3.658-10.706-10.145-10.718h-10.452Zm5.377 6.445h4.024c3.312 0 4.391 1.908 4.05 4.018-.341 2.115-2.016 3.672-5.221 3.672h-4.095l1.242-7.69Zm26.47 1.963c-1.396.005-3.004.285-4.808 1.018-4.139 1.684-6.126 5.164-6.97 7.701 0 0-2.686 7.74 3.384 11.993 0 0 5.628 4.095 11.965-.252l-.109.68a.719.719 0 0 0 .173.594.756.756 0 0 0 .575.259h5.251a.812.812 0 0 0 .808-.674l3.195-19.773a.72.72 0 0 0-.172-.596.773.773 0 0 0-.576-.26h-5.251a.812.812 0 0 0-.808.676l-.172 1.064s-2.294-2.445-6.485-2.43Zm.172 6.245a5.5 5.5 0 0 1 1.649.237c2.266.71 3.551 2.834 3.179 5.137-.459 2.836-2.841 4.924-5.896 4.924a5.51 5.51 0 0 1-1.65-.236c-2.265-.71-3.557-2.835-3.186-5.138.459-2.835 2.849-4.924 5.904-4.924Z"
												/>
												<path
													fill="#003087"
													d="M129.355 69.899a.603.603 0 0 0-.585.783l5.757 17.438-5.205 8.218c-.253.399.041.914.521.914h6.152a1.041 1.041 0 0 0 .875-.482l16.078-25.962c.247-.4-.048-.91-.525-.91h-6.152c-.178 0-.352.046-.507.132a1.01 1.01 0 0 0-.373.359l-6.329 10.43-3.212-10.353a.818.818 0 0 0-.784-.568l-5.711.001Z"
												/>
												<path
													fill="#0070E0"
													d="M208.449 60.799a.813.813 0 0 0-.808.674l-4.665 28.872a.726.726 0 0 0 .172.596.768.768 0 0 0 .576.26h5.531a.812.812 0 0 0 .808-.675l4.665-28.873a.717.717 0 0 0-.173-.595.757.757 0 0 0-.574-.26h-5.532Z"
												/>
												<path
													fill="#001C64"
													d="M35.44 60.799c-.357 0-.701.124-.972.35-.27.226-.45.54-.506.883l-2.455 15.2A1.485 1.485 0 0 1 32.984 76h7.195c7.241 0 13.385-5.156 14.508-12.143.084-.522.13-1.049.142-1.576-1.84-.942-4.002-1.481-6.37-1.481h-13.02Z"
												/>
												<path
													fill="#0070E0"
													d="M54.83 62.28a11.713 11.713 0 0 1-.142 1.575C53.565 70.843 47.42 76 40.18 76h-7.195c-.736 0-1.363.522-1.478 1.233L29.25 91.2l-1.414 8.762a1.159 1.159 0 0 0 .275.956 1.22 1.22 0 0 0 .924.416h7.81c.356-.001.7-.125.971-.351.271-.226.45-.539.506-.882l2.057-12.735a1.45 1.45 0 0 1 .507-.883 1.52 1.52 0 0 1 .972-.35h4.598c7.24 0 13.385-5.156 14.508-12.144.797-4.959-1.762-9.472-6.135-11.71Z"
												/>
												<path
													fill="#003087"
													d="M26.567 50.668c-.736 0-1.364.523-1.478 1.232l-6.128 37.93c-.116.72.454 1.372 1.2 1.372h9.088l2.257-13.968 2.455-15.2a1.45 1.45 0 0 1 .506-.883c.27-.226.615-.35.971-.35h13.019c2.37 0 4.53.54 6.37 1.48.126-6.361-5.251-11.613-12.645-11.613H26.567Z"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="paypal__a">
												<path fill="#fff" d="M0 0h240v150H0z" />
											</clipPath>
											<clipPath id="paypal__b">
												<path
													fill="#fff"
													d="M18.947 50.666h195.789v50.667H18.947z"
												/>
											</clipPath>
										</defs>
									</svg>
									<div className="w-[45.6px] h-[27.6px] bg-white border-2 border-neutral-100 rounded-sm flex justify-center items-center">
										<img
											src="/btc_ltc_eth.png"
											alt="bitcoin"
											className="h-[26.6px]"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.main>
				<div className="w-full py-10 flex justify-center items-center">
					<div className="text-center mx-0 p-10 lg:px-[30px] bg-gray-900 rounded-lg shadow-xl w-[1200px]">
						<h1 className="text-[34px] font-bold bg-gradient-to-tl from-white via-blue-50 to-blue-300 bg-clip-text text-transparent leading-8 pb-6 lg:pb-2">
							Take Your Gameplay To The Next Level With OMEGA Lazer!
						</h1>
						<div className="flex flex-col gap-1">
							<span className="text-white text-[16px]">
								Why waste 1000s of hours when you can <b>Improve Instantly</b>{" "}
								with OMEGA Lazer?
							</span>
							<span className="text-white text-[16px]">
								OMEGA Lazer is specifically <b>Designed for BO6</b>, created
								with the best possible features so you can{" "}
								<b>Dominate Lobbies with Ease</b>.
							</span>
							<span className="text-white text-[16px]">
								This Unbeatable Script is for those that want to take their
								<b>Gameplay to the Next Level &amp; Win More Games</b>.
							</span>
							<span className="text-white text-[16px]">
								Many hours have went into coding this script for our users to
								have every advantage possible! .
							</span>
							<span className="text-white text-[16px]">
								Remember. <b>Dominate</b> or be <b>Dominated you Decide</b>...
							</span>
						</div>
						<div className="pt-4 text-left flex flex-col gap-1 items-center justify-center">
							<div className="flex flex-row items-center gap-1 fill-yellow-300">
								<Redo size={20} color="#43d9f0" />
								<span className="text-white text-[16px]">
									For <b>Cronus Zen &amp; Cronusmax Devices</b>
								</span>
							</div>
							<div className="flex flex-row items-center gap-1 fill-yellow-300">
								<Redo size={20} color="#43d9f0" />
								<span className="text-white text-[16px]">
									Built For FPS Games - <b>Warzone</b> | <b>B06</b> |{" "}
									<b>Vanguard</b> | <b>Apex</b> and more..
								</span>
							</div>
							<div className="flex flex-row items-center gap-1 fill-yellow-300">
								<Redo size={20} color="#43d9f0" />
								<span className="text-white text-[16px]">
									<b>100% Undetected &amp; Safe</b> (As Our Scripts Do Not
									Change Any Game Files)
								</span>
							</div>
							<div className="flex flex-row items-center gap-1 fill-yellow-300">
								<Redo size={20} color="#43d9f0" />
								<span className="text-white text-[16px]">
									<b>All Platforms</b> - PS5, PS4, PC, XBOX
								</span>
							</div>
							<div className="flex flex-row items-center gap-1 fill-yellow-300">
								<Redo size={20} color="#43d9f0" />
								<span className="text-white text-[16px]">
									<b>Very Easy Setup</b>
								</span>
							</div>
							<div className="flex flex-row items-center gap-1 fill-yellow-300">
								<Redo size={20} color="#43d9f0" />
								<span className="text-white text-[16px]">
									<b>Instant Download</b>
								</span>
							</div>
						</div>
						<div className="flex flex-row gap-1 justify-center items-center w-full pt-4">
							<ArrowBigRight size={20} color="#43d9f0" />
							<span className="text-white text-[16px] font-bold">
								Features Within The ~OMEGA Lazer SCRIPT~
							</span>
						</div>
						<motion.div
							className="max-w-6xl mx-auto font-[sans-serif] pt-4"
							ref={divRef}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: isVisible1 ? 1 : 0, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12">
								<div className="text-center bg-white p-2 rounded-3xl stroke-[#43d9f0] h-[100px]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="#43d9f0"
										className="w-8 mb-6 inline-block"
										viewBox="0 0 32 32"
									>
										<title>1</title>
										<path
											d="M28.068 12h-.128a.934.934 0 0 1-.864-.6.924.924 0 0 1 .2-1.01l.091-.091a2.938 2.938 0 0 0 0-4.147l-1.511-1.51a2.935 2.935 0 0 0-4.146 0l-.091.091A.956.956 0 0 1 20 4.061v-.129A2.935 2.935 0 0 0 17.068 1h-2.136A2.935 2.935 0 0 0 12 3.932v.129a.956.956 0 0 1-1.614.668l-.086-.091a2.935 2.935 0 0 0-4.146 0l-1.516 1.51a2.938 2.938 0 0 0 0 4.147l.091.091a.935.935 0 0 1 .185 1.035.924.924 0 0 1-.854.579h-.128A2.935 2.935 0 0 0 1 14.932v2.136A2.935 2.935 0 0 0 3.932 20h.128a.934.934 0 0 1 .864.6.924.924 0 0 1-.2 1.01l-.091.091a2.938 2.938 0 0 0 0 4.147l1.51 1.509a2.934 2.934 0 0 0 4.147 0l.091-.091a.936.936 0 0 1 1.035-.185.922.922 0 0 1 .579.853v.129A2.935 2.935 0 0 0 14.932 31h2.136A2.935 2.935 0 0 0 20 28.068v-.129a.956.956 0 0 1 1.614-.668l.091.091a2.935 2.935 0 0 0 4.146 0l1.511-1.509a2.938 2.938 0 0 0 0-4.147l-.091-.091a.935.935 0 0 1-.185-1.035.924.924 0 0 1 .854-.58h.128A2.935 2.935 0 0 0 31 17.068v-2.136A2.935 2.935 0 0 0 28.068 12ZM29 17.068a.933.933 0 0 1-.932.932h-.128a2.956 2.956 0 0 0-2.083 5.028l.09.091a.934.934 0 0 1 0 1.319l-1.511 1.509a.932.932 0 0 1-1.318 0l-.09-.091A2.957 2.957 0 0 0 18 27.939v.129a.933.933 0 0 1-.932.932h-2.136a.933.933 0 0 1-.932-.932v-.129a2.951 2.951 0 0 0-5.028-2.082l-.091.091a.934.934 0 0 1-1.318 0l-1.51-1.509a.934.934 0 0 1 0-1.319l.091-.091A2.956 2.956 0 0 0 4.06 18h-.128A.933.933 0 0 1 3 17.068v-2.136A.933.933 0 0 1 3.932 14h.128a2.956 2.956 0 0 0 2.083-5.028l-.09-.091a.933.933 0 0 1 0-1.318l1.51-1.511a.932.932 0 0 1 1.318 0l.09.091A2.957 2.957 0 0 0 14 4.061v-.129A.933.933 0 0 1 14.932 3h2.136a.933.933 0 0 1 .932.932v.129a2.956 2.956 0 0 0 5.028 2.082l.091-.091a.932.932 0 0 1 1.318 0l1.51 1.511a.933.933 0 0 1 0 1.318l-.091.091A2.956 2.956 0 0 0 27.94 14h.128a.933.933 0 0 1 .932.932Z"
											data-original="#000000"
										/>
										<path
											d="M16 9a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z"
											data-original="#000000"
										/>
									</svg>
									<h3 className="text-gray-800 text-xl font-semibold mb-3">
										Tracking Function
									</h3>
								</div>
								<div className="text-center bg-white p-2 rounded-3xl h-[100px]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="#43d9f0"
										className="w-8 mb-6 inline-block"
										viewBox="0 0 682.667 682.667"
									>
										<title>2</title>
										<defs>
											<clipPath id="a" clipPathUnits="userSpaceOnUse">
												<path d="M0 512h512V0H0Z" data-original="#000000" />
											</clipPath>
										</defs>
										<g
											fill="none"
											stroke="#43d9f0"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeMiterlimit={10}
											strokeWidth={40}
											clipPath="url(#a)"
											transform="matrix(1.33 0 0 -1.33 0 682.667)"
										>
											<path
												d="M256 492 60 410.623v-98.925C60 183.674 137.469 68.38 256 20c118.53 48.38 196 163.674 196 291.698v98.925z"
												data-original="#000000"
											/>
											<path
												d="M178 271.894 233.894 216 334 316.105"
												data-original="#000000"
											/>
										</g>
									</svg>
									<h3 className="text-gray-800 text-xl font-semibold mb-3">
										Snappy Aim
									</h3>
								</div>
								<div className="text-center bg-white p-2 rounded-3xl h-[100px]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="#43d9f0"
										className="w-8 mb-6 inline-block"
										viewBox="0 0 512.001 512.001"
									>
										<title>3</title>
										<path
											d="M271.029 0c-33.091 0-61 27.909-61 61s27.909 61 61 61 60-27.909 60-61-26.909-61-60-61zm66.592 122c-16.485 18.279-40.096 30-66.592 30-26.496 0-51.107-11.721-67.592-30-14.392 15.959-23.408 36.866-23.408 60v15c0 8.291 6.709 15 15 15h151c8.291 0 15-6.709 15-15v-15c0-23.134-9.016-44.041-23.408-60zM144.946 460.404 68.505 307.149c-7.381-14.799-25.345-20.834-40.162-13.493l-19.979 9.897c-7.439 3.689-10.466 12.73-6.753 20.156l90 180c3.701 7.423 12.704 10.377 20.083 6.738l19.722-9.771c14.875-7.368 20.938-25.417 13.53-40.272zM499.73 247.7c-12.301-9-29.401-7.2-39.6 3.9l-82 100.8c-5.7 6-16.5 9.6-22.2 9.6h-69.901c-8.401 0-15-6.599-15-15s6.599-15 15-15h60c16.5 0 30-13.5 30-30s-13.5-30-30-30h-78.6c-7.476 0-11.204-4.741-17.1-9.901-23.209-20.885-57.949-30.947-93.119-22.795-19.528 4.526-32.697 12.415-46.053 22.993l-.445-.361-21.696 19.094L174.28 452h171.749c28.2 0 55.201-13.5 72.001-36l87.999-126c9.9-13.201 7.2-32.399-6.299-42.3z"
											data-original="#000000"
										/>
									</svg>
									<h3 className="text-gray-800 text-xl font-semibold mb-3">
										Sticky Aim
									</h3>
								</div>
								<div className="text-center bg-white p-2 rounded-3xl h-[100px]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="#43d9f0"
										className="w-8 mb-6 inline-block"
										viewBox="0 0 24 24"
									>
										<title>4</title>
										<g fillRule="evenodd" clipRule="evenodd">
											<path
												d="M17.03 8.97a.75.75 0 0 1 0 1.06l-4.2 4.2a.75.75 0 0 1-1.154-.114l-1.093-1.639L8.03 15.03a.75.75 0 0 1-1.06-1.06l3.2-3.2a.75.75 0 0 1 1.154.114l1.093 1.639L15.97 8.97a.75.75 0 0 1 1.06 0z"
												data-original="#000000"
											/>
											<path
												d="M13.75 9.5a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-1.25H14.5a.75.75 0 0 1-.75-.75z"
												data-original="#000000"
											/>
											<path
												d="M3.095 3.095C4.429 1.76 6.426 1.25 9 1.25h6c2.574 0 4.57.51 5.905 1.845C22.24 4.429 22.75 6.426 22.75 9v6c0 2.574-.51 4.57-1.845 5.905C19.571 22.24 17.574 22.75 15 22.75H9c-2.574 0-4.57-.51-5.905-1.845C1.76 19.571 1.25 17.574 1.25 15V9c0-2.574.51-4.57 1.845-5.905zm1.06 1.06C3.24 5.071 2.75 6.574 2.75 9v6c0 2.426.49 3.93 1.405 4.845.916.915 2.419 1.405 4.845 1.405h6c2.426 0 3.93-.49 4.845-1.405.915-.916 1.405-2.419 1.405-4.845V9c0-2.426-.49-3.93-1.405-4.845C18.929 3.24 17.426 2.75 15 2.75H9c-2.426 0-3.93.49-4.845 1.405z"
												data-original="#000000"
											/>
										</g>
									</svg>
									<h3 className="text-gray-800 text-xl font-semibold mb-3">
										Aim Assist
									</h3>
								</div>
								<div className="text-center bg-white p-2 rounded-3xl h-[100px]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="#43d9f0"
										className="w-8 mb-6 inline-block"
										viewBox="0 0 504.69 504.69"
									>
										<title>5</title>
										<path
											d="M252.343 262.673c-49.32 0-89.447-40.127-89.447-89.447s40.127-89.447 89.447-89.447 89.447 40.127 89.447 89.447-40.121 89.447-89.447 89.447zm0-158.235c-37.926 0-68.787 30.861-68.787 68.787s30.861 68.787 68.787 68.787 68.787-30.861 68.787-68.787-30.855-68.787-68.787-68.787z"
											data-original="#000000"
										/>
										<path
											d="M391.787 405.309c-5.645 0-10.253-4.54-10.325-10.201-.883-70.306-58.819-127.503-129.15-127.503-49.264 0-93.543 27.405-115.561 71.52-8.724 17.473-13.269 36.31-13.517 55.988-.072 5.702-4.757 10.273-10.459 10.201s-10.273-4.757-10.201-10.459c.289-22.814 5.568-44.667 15.691-64.955 25.541-51.164 76.907-82.95 134.047-82.95 81.581 0 148.788 66.349 149.81 147.905.072 5.702-4.494 10.392-10.201 10.459-.046-.005-.087-.005-.134-.005z"
											data-original="#000000"
										/>
										<path
											d="M252.343 463.751c-116.569 0-211.408-94.834-211.408-211.408 0-116.569 94.839-211.408 211.408-211.408 116.574 0 211.408 94.839 211.408 211.408 0 116.574-94.834 211.408-211.408 211.408zm0-402.156c-105.18 0-190.748 85.568-190.748 190.748s85.568 190.748 190.748 190.748 190.748-85.568 190.748-190.748S357.523 61.595 252.343 61.595zM71.827 90.07 14.356 32.599c-4.034-4.034-4.034-10.573 0-14.607 4.029-4.034 10.573-4.034 14.607 0l57.466 57.471c4.034 4.034 3.951 10.49 0 14.607-3.792 3.951-11.039 3.698-14.602 0z"
											data-original="#000000"
										/>
										<path
											d="M14.717 92.254a10.332 10.332 0 0 1-10.299-9.653L.023 15.751a10.317 10.317 0 0 1 2.929-7.908 10.2 10.2 0 0 1 7.851-3.089L77.56 7.796c5.697.258 10.108 5.093 9.85 10.79s-5.041 10.154-10.79 9.85l-55.224-2.521 3.641 55.327c.377 5.692-3.936 10.614-9.628 10.986a7.745 7.745 0 0 1-.692.026zm403.541-2.184c-4.256-3.796-4.034-10.573 0-14.607l58.116-58.116c4.034-4.034 10.573-4.034 14.607 0s4.034 10.573 0 14.607L432.864 90.07c-4.085 3.951-9.338 4.7-14.606 0z"
											data-original="#000000"
										/>
										<path
											d="M489.974 92.254a9.85 9.85 0 0 1-.687-.021c-5.697-.372-10.01-5.294-9.633-10.986l3.641-55.327-55.224 2.515c-5.511.238-10.526-4.147-10.79-9.85-.258-5.702 4.153-10.531 9.85-10.79l66.757-3.042c2.934-.134 5.79.992 7.851 3.089s3.12 4.974 2.929 7.908l-4.401 66.85c-.361 5.465-4.896 9.654-10.293 9.654zM11.711 489.339c-3.791-4.266-4.034-10.573 0-14.607l60.115-60.11c4.029-4.034 10.578-4.034 14.607 0 4.034 4.034 4.034 10.573 0 14.607l-60.115 60.11c-3.827 3.884-11.156 3.884-14.607 0z"
											data-original="#000000"
										/>
										<path
											d="M10.327 499.947a10.33 10.33 0 0 1-7.376-3.104 10.312 10.312 0 0 1-2.929-7.902l4.401-66.85c.372-5.697 5.191-10.036 10.986-9.633 5.692.377 10.005 5.294 9.628 10.986l-3.641 55.332 55.224-2.515c5.645-.191 10.531 4.153 10.79 9.85.258 5.697-4.153 10.526-9.85 10.79l-66.763 3.037c-.155.004-.31.009-.47.009zm465.639-13.01-57.708-57.708c-4.034-4.034-4.034-10.573 0-14.607s10.573-4.034 14.607 0l57.708 57.708c4.034 4.034 3.962 10.5 0 14.607-3.817 3.951-10.062 3.951-14.607 0z"
											data-original="#000000"
										/>
										<path
											d="M494.359 499.947c-.155 0-.315-.005-.47-.01l-66.757-3.042c-5.702-.263-10.108-5.088-9.85-10.79.263-5.702 5.113-9.984 10.79-9.85l55.219 2.515-3.641-55.332c-.372-5.692 3.941-10.609 9.633-10.986 5.625-.398 10.609 3.946 10.986 9.633l4.401 66.85a10.33 10.33 0 0 1-2.929 7.902 10.323 10.323 0 0 1-7.382 3.11z"
											data-original="#000000"
										/>
									</svg>
									<h3 className="text-gray-800 text-xl font-semibold mb-3">
										Zero Recoil
									</h3>
								</div>
								<div className="text-center bg-white p-2 rounded-3xl h-[100px]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="#43d9f0"
										className="w-8 mb-6 inline-block"
										viewBox="0 0 682.667 682.667"
									>
										<title>6</title>
										<defs>
											<clipPath id="a" clipPathUnits="userSpaceOnUse">
												<path d="M0 512h512V0H0Z" data-original="#000000" />
											</clipPath>
										</defs>
										<g
											fill="none"
											stroke="#43d9f0"
											strokeMiterlimit={10}
											strokeWidth={30}
											clipPath="url(#a)"
											transform="matrix(1.33 0 0 -1.33 0 682.667)"
										>
											<path
												d="M226 15v60c0 16.568-13.432 30-30 30H76c-16.568 0-30-13.432-30-30V15Zm-45 165c0-24.853-20.147-45-45-45s-45 20.147-45 45 20.147 45 45 45 45-20.147 45-45ZM466 15v60c0 16.568-13.432 30-30 30H316c-16.568 0-30-13.432-30-30V15Zm-45 165c0-24.853-20.147-45-45-45s-45 20.147-45 45 20.147 45 45 45 45-20.147 45-45Zm-75 167v-50.294L286 347h-60.002L166 296.706V347h-15c-41.421 0-75 33.579-75 75s33.579 75 75 75h210c41.421 0 75-33.579 75-75s-33.579-75-75-75Zm-105 75h30m-90 0h30m90 0h30"
												data-original="#000000"
											/>
										</g>
									</svg>
									<h3 className="text-gray-800 text-xl font-semibold mb-3">
										Hair Triggers
									</h3>
								</div>
								<div className="text-center bg-white p-2 rounded-3xl h-[100px]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="#43d9f0"
										className="w-8 mb-6 inline-block"
										viewBox="0 0 682.667 682.667"
									>
										<title>7</title>
										<defs>
											<clipPath id="a" clipPathUnits="userSpaceOnUse">
												<path d="M0 512h512V0H0Z" data-original="#000000" />
											</clipPath>
										</defs>
										<g
											fill="none"
											stroke="#43d9f0"
											strokeMiterlimit={10}
											strokeWidth={30}
											clipPath="url(#a)"
											transform="matrix(1.33 0 0 -1.33 0 682.667)"
										>
											<path
												d="M226 15v60c0 16.568-13.432 30-30 30H76c-16.568 0-30-13.432-30-30V15Zm-45 165c0-24.853-20.147-45-45-45s-45 20.147-45 45 20.147 45 45 45 45-20.147 45-45ZM466 15v60c0 16.568-13.432 30-30 30H316c-16.568 0-30-13.432-30-30V15Zm-45 165c0-24.853-20.147-45-45-45s-45 20.147-45 45 20.147 45 45 45 45-20.147 45-45Zm-75 167v-50.294L286 347h-60.002L166 296.706V347h-15c-41.421 0-75 33.579-75 75s33.579 75 75 75h210c41.421 0 75-33.579 75-75s-33.579-75-75-75Zm-105 75h30m-90 0h30m90 0h30"
												data-original="#000000"
											/>
										</g>
									</svg>
									<h3 className="text-gray-800 text-xl font-semibold mb-3">
										Kill Switch
									</h3>
								</div>
								<div className="text-center bg-white p-2 rounded-3xl h-[100px]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="#43d9f0"
										className="w-8 mb-6 inline-block"
										viewBox="0 0 682.667 682.667"
									>
										<title>8</title>
										<defs>
											<clipPath id="a" clipPathUnits="userSpaceOnUse">
												<path d="M0 512h512V0H0Z" data-original="#000000" />
											</clipPath>
										</defs>
										<g
											fill="none"
											stroke="#43d9f0"
											strokeMiterlimit={10}
											strokeWidth={30}
											clipPath="url(#a)"
											transform="matrix(1.33 0 0 -1.33 0 682.667)"
										>
											<path
												d="M226 15v60c0 16.568-13.432 30-30 30H76c-16.568 0-30-13.432-30-30V15Zm-45 165c0-24.853-20.147-45-45-45s-45 20.147-45 45 20.147 45 45 45 45-20.147 45-45ZM466 15v60c0 16.568-13.432 30-30 30H316c-16.568 0-30-13.432-30-30V15Zm-45 165c0-24.853-20.147-45-45-45s-45 20.147-45 45 20.147 45 45 45 45-20.147 45-45Zm-75 167v-50.294L286 347h-60.002L166 296.706V347h-15c-41.421 0-75 33.579-75 75s33.579 75 75 75h210c41.421 0 75-33.579 75-75s-33.579-75-75-75Zm-105 75h30m-90 0h30m90 0h30"
												data-original="#000000"
											/>
										</g>
									</svg>
									<h3 className="text-gray-800 text-xl font-semibold mb-3">
										Jumpshot
									</h3>
								</div>
								<div className="text-center bg-white p-2 rounded-3xl h-[100px]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="#43d9f0"
										className="w-8 mb-6 inline-block"
										viewBox="0 0 682.667 682.667"
									>
										<title>9</title>
										<defs>
											<clipPath id="a" clipPathUnits="userSpaceOnUse">
												<path d="M0 512h512V0H0Z" data-original="#000000" />
											</clipPath>
										</defs>
										<g
											fill="none"
											stroke="#43d9f0"
											strokeMiterlimit={10}
											strokeWidth={30}
											clipPath="url(#a)"
											transform="matrix(1.33 0 0 -1.33 0 682.667)"
										>
											<path
												d="M226 15v60c0 16.568-13.432 30-30 30H76c-16.568 0-30-13.432-30-30V15Zm-45 165c0-24.853-20.147-45-45-45s-45 20.147-45 45 20.147 45 45 45 45-20.147 45-45ZM466 15v60c0 16.568-13.432 30-30 30H316c-16.568 0-30-13.432-30-30V15Zm-45 165c0-24.853-20.147-45-45-45s-45 20.147-45 45 20.147 45 45 45 45-20.147 45-45Zm-75 167v-50.294L286 347h-60.002L166 296.706V347h-15c-41.421 0-75 33.579-75 75s33.579 75 75 75h210c41.421 0 75-33.579 75-75s-33.579-75-75-75Zm-105 75h30m-90 0h30m90 0h30"
												data-original="#000000"
											/>
										</g>
									</svg>
									<h3 className="text-gray-800 text-xl font-semibold mb-3">
										Rapid Fire
									</h3>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
				<div className="w-full flex justify-center items-center px-4">
					<div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:w-[1200px] h-full">
						<div className="flex flex-col justify-center items-center text-center gap-4 border border-gray-600 py-2 px-4 rounded-xl w-full h-[247px]">
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={52}
									height={52}
									fill="currentColor"
									className="bi bi-controller fill-[#43d9f0]"
									viewBox="0 0 16 16"
								>
									<title>10</title>
									<path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1z" />
									<path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729q.211.136.373.297c.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466s.34 1.78.364 2.606c.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527s-2.496.723-3.224 1.527c-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.3 2.3 0 0 1 .433-.335l-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a14 14 0 0 0-.748 2.295 12.4 12.4 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.4 12.4 0 0 0-.339-2.406 14 14 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27s-2.063.091-2.913.27" />
								</svg>
							</div>
							<span className="text-white text-[17px]">
								<b>Multiplatform</b>
							</span>
							<span className="text-white text-[16px] font-normal">
								Our products can be used across all platforms. They can also be
								used on any controller or keyboard and mouse.
							</span>
						</div>
						<div className="flex flex-col justify-center items-center text-center gap-4 border border-gray-600 py-2 px-4 rounded-xl w-full h-[247px]">
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={52}
									height={52}
									fill="currentColor"
									className="bi bi-cloud-arrow-down fill-[#43d9f0]"
									viewBox="0 0 16 16"
								>
									<title>12</title>
									<path
										fillRule="evenodd"
										d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708z"
									/>
									<path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
								</svg>
							</div>
							<span className="text-white text-[17px]">
								<b>Instant Access</b>
							</span>
							<span className="text-white text-[16px] font-normal">
								At OMEGA Scripts we have a fully automatic builds system. We
								provide everyone with safe &amp; instant downloads.
							</span>
						</div>
						<div className="flex flex-col justify-center items-center text-center gap-4 border border-gray-600 py-2 px-4 rounded-xl w-full h-[247px]">
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={52}
									height={52}
									fill="currentColor"
									className="bi bi-lock fill-[#43d9f0]"
									viewBox="0 0 16 16"
								>
									<title>13</title>
									<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
								</svg>
							</div>
							<span className="text-white text-[17px]">
								<b>Safe And Secure</b>
							</span>
							<span className="text-white text-[16px] font-normal">
								We guarantee our methods of payment are safe &amp; secure, these
								including; PayPal and Crypto.
							</span>
						</div>
						<div className="flex flex-col justify-center items-center text-center gap-4 border border-gray-600 py-2 px-4 rounded-xl w-full h-[247px]">
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={52}
									height={52}
									fill="currentColor"
									className="bi bi-clock-history fill-[#43d9f0]"
									viewBox="0 0 16 16"
								>
									<title>14</title>
									<path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
									<path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
									<path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
								</svg>
							</div>
							<span className="text-white text-[17px]">
								<b>Script Updates</b>
							</span>
							<span className="text-white text-[16px] font-normal">
								We have worked hard to make our Scripts easily updatable,
								Whenever a script is updated we will email you with the latest
								version.
							</span>
						</div>
					</div>
				</div>
				<div
					className="flex justify-center items-center"
					id="reviews"
					ref={otherDivRef}
				>
					<div className="w-full lg:max-w-[1200px] flex flex-col lg:flex-row justify-center items-start px-4 lg:px-0 py-10 gap-10">
						<div className="flex flex-col justify-start w-full lg:w-[300px]">
							<div className="w-full flex flex-col justify-start items-start">
								<span className="text-white text-[24px] font-bold">
									Customer reviews
								</span>
								<div className="flex flex-row justify-center items-center gap-2 pt-4">
									<div className="p-4 w-fit rounded-lg bg-gray-950">
										<span className="text-white font-bold text-[27px]">
											4.9
										</span>
									</div>
									<span className="text-neutral-200 text-[14px]">
										Based on{" "}
										<span className="text-white font-semibold">12 reviews</span>
									</span>
								</div>
							</div>
							<div>
								<div className="flex flex-row justify-start pt-3 w-full">
									<div className="w-full flex flex-row justify-center items-center gap-2 cursor-pointer hover:brightness-110 transition-all duration-200">
										<span className="text-white text-[14px]">5</span>
										<div className="w-[14px] fill-yellow-300">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 576 512"
											>
												<title>16</title>
												<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
											</svg>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
											<div
												className="bg-yellow-300 h-2.5 rounded-full"
												style={{ width: "80%" }}
											/>
										</div>
										<span className="text-neutral-400 text-[14px]">8</span>
									</div>
								</div>
								<div className="flex flex-row justify-start pt-1 w-full">
									<div className="w-full flex flex-row justify-center items-center gap-2 cursor-pointer hover:brightness-110 transition-all duration-200">
										<span className="text-white text-[14px]">4</span>
										<div className="w-[14px] fill-yellow-300">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 576 512"
											>
												<title>a</title>
												<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
											</svg>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
											<div
												className="bg-yellow-300 h-2.5 rounded-full"
												style={{ width: "30%" }}
											/>
										</div>
										<span className="text-neutral-400 text-[14px]">4</span>
									</div>
								</div>
								<div className="flex flex-row justify-start pt-1 w-full">
									<div className="w-full flex flex-row justify-center items-center gap-2 cursor-pointer hover:brightness-110 transition-all duration-200">
										<span className="text-white text-[14px]">3</span>
										<div className="w-[14px] fill-yellow-300">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 576 512"
											>
												<title>b</title>
												<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
											</svg>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
											<div
												className="bg-yellow-300 h-2.5 rounded-full"
												style={{ width: "0%" }}
											/>
										</div>
										<span className="text-neutral-400 text-[14px]">0</span>
									</div>
								</div>
								<div className="flex flex-row justify-start pt-1 w-full">
									<div className="w-full flex flex-row justify-center items-center gap-2 cursor-pointer hover:brightness-110 transition-all duration-200">
										<span className="text-white text-[14px]">2</span>
										<div className="w-[14px] fill-yellow-300">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 576 512"
											>
												<title>star</title>
												<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
											</svg>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
											<div
												className="bg-yellow-300 h-2.5 rounded-full"
												style={{ width: "0%" }}
											/>
										</div>
										<span className="text-neutral-400 text-[14px]">0</span>
									</div>
								</div>
								<div className="flex flex-row justify-start pt-1 w-full">
									<div className="w-full flex flex-row justify-center items-center gap-2 cursor-pointer hover:brightness-110 transition-all duration-200">
										<span className="text-white text-[14px]">1</span>
										<div className="w-[14px] fill-yellow-300">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 576 512"
											>
												<title>star</title>
												<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
											</svg>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
											<div
												className="bg-yellow-300 h-2.5 rounded-full"
												style={{ width: "0%" }}
											/>
										</div>
										<span className="text-neutral-400 text-[14px]">0</span>
									</div>
								</div>
								<div className="pt-10">
									<button
										type="button"
										className="w-full bg-gray-950 text-white h-[40px] rounded-lg hover:brightness-90 transition-all duration-200"
									>
										Write A Review
									</button>
								</div>
							</div>
						</div>
						<div className="w-full lg:min-w-[748px] flex flex-col gap-6">
							<motion.div
								className="w-full lg:min-w-[748px] min-w-full shadow-xl rounded-md bg-white"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: isVisible2 ? 1 : 0, y: 0 }}
								transition={{ duration: 0.2 }}
							>
								<div className="absolute bg-transparent shadow-xl rounded-3xl ml-4">
									<div className="flex flex-row justify-start items-center gap-1 fill-yellow-300 px-1 py-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
										</svg>
									</div>
								</div>
								<div className="pt-[30px] pb-[12px] px-[16px]">
									<div className="flex flex-row justify-start items-center gap-2">
										<img
											src="/default_avatar.jpg"
											alt="avatar"
											width="30px"
											height="30px"
											className="rounded-full"
										/>
										<div className="flex flex-col">
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-[12px] font-bold">
													Sonnie Fairbairn
												</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={10}
													height={10}
													fill="currentColor"
													className="bi bi-patch-check-fill"
													viewBox="0 0 16 16"
												>
													<title>star</title>
													<path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
												</svg>
											</div>
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-neutral-700 text-[10px] font-bold">
													Dec 05, 2024
												</span>
												<span className="fi fi-us w-[18px] h-[12px]" />
											</div>
										</div>
									</div>
									<div>
										<span className="text-[12px]">
											better then any other script i've tried
										</span>
									</div>
								</div>
							</motion.div>
							<motion.div
								className="w-full lg:min-w-[748px] min-w-full shadow-xl rounded-md bg-white"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: isVisible2 ? 1 : 0, y: 0 }}
								transition={{ duration: 0.3 }}
							>
								<div className="absolute bg-transparent shadow-xl rounded-3xl ml-4">
									<div className="flex flex-row justify-start items-center gap-1 fill-yellow-300 px-1 py-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
									</div>
								</div>
								<div className="pt-[30px] pb-[12px] px-[16px]">
									<div className="flex flex-row justify-start items-center gap-2">
										<img
											src="/default_avatar.jpg"
											alt="avatar"
											width="30px"
											height="30px"
											className="rounded-full"
										/>
										<div className="flex flex-col">
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-[12px] font-bold">
													Kyle Davenport
												</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={10}
													height={10}
													fill="currentColor"
													className="bi bi-patch-check-fill"
													viewBox="0 0 16 16"
												>
													<title>star</title>
													<path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
												</svg>
											</div>
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-neutral-700 text-[10px] font-bold">
													Dec 04, 2024
												</span>
												<span className="fi fi-ca w-[18px] h-[12px]" />
											</div>
										</div>
									</div>
									<div>
										<span className="text-[12px]">no recoil ty</span>
									</div>
								</div>
							</motion.div>
							<motion.div
								className="w-full lg:min-w-[748px] min-w-full shadow-xl rounded-md bg-white"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: isVisible2 ? 1 : 0, y: 0 }}
								transition={{ duration: 0.4 }}
							>
								<div className="absolute bg-transparent shadow-xl rounded-3xl ml-4">
									<div className="flex flex-row justify-start items-center gap-1 fill-yellow-300 px-1 py-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
									</div>
								</div>
								<div className="pt-[30px] pb-[12px] px-[16px]">
									<div className="flex flex-row justify-start items-center gap-2">
										<img
											src="/default_avatar.jpg"
											alt="avatar"
											width="30px"
											height="30px"
											className="rounded-full"
										/>
										<div className="flex flex-col">
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-[12px] font-bold">
													Will Rhodes
												</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={10}
													height={10}
													fill="currentColor"
													className="bi bi-patch-check-fill"
													viewBox="0 0 16 16"
												>
													<title>star</title>
													<path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
												</svg>
											</div>
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-neutral-700 text-[10px] font-bold">
													Dec 04, 2024
												</span>
												<span className="fi fi-us w-[18px] h-[12px]" />
											</div>
										</div>
									</div>
									<div>
										<span className="text-[12px]">thanks works well 👍</span>
									</div>
								</div>
							</motion.div>
							<motion.div
								className="w-full lg:min-w-[748px] min-w-full shadow-xl rounded-md bg-white"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: isVisible2 ? 1 : 0, y: 0 }}
								transition={{ duration: 0.5 }}
							>
								<div className="absolute bg-transparent shadow-xl rounded-3xl ml-4">
									<div className="flex flex-row justify-start items-center gap-1 fill-yellow-300 px-1 py-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
									</div>
								</div>
								<div className="pt-[30px] pb-[12px] px-[16px]">
									<div className="flex flex-row justify-start items-center gap-2">
										<img
											src="/default_avatar.jpg"
											alt="avatar"
											width="30px"
											height="30px"
											className="rounded-full"
										/>
										<div className="flex flex-col">
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-[12px] font-bold">
													Emmanuel Tirrell
												</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={10}
													height={10}
													fill="currentColor"
													className="bi bi-patch-check-fill"
													viewBox="0 0 16 16"
												>
													<title>star</title>
													<path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
												</svg>
											</div>
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-neutral-700 text-[10px] font-bold">
													Dec 03, 2024
												</span>
												<span className="fi fi-us w-[18px] h-[12px]" />
											</div>
										</div>
									</div>
									<div>
										<span className="text-[12px]">
											easy setup, everything is working tysm
										</span>
									</div>
								</div>
							</motion.div>
							<motion.div
								className="w-full lg:min-w-[748px] min-w-full shadow-xl rounded-md bg-white"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: isVisible2 ? 1 : 0, y: 0 }}
								transition={{ duration: 0.6 }}
							>
								<div className="absolute bg-transparent shadow-xl rounded-3xl ml-4">
									<div className="flex flex-row justify-start items-center gap-1 fill-yellow-300 px-1 py-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
										</svg>
									</div>
								</div>
								<div className="pt-[30px] pb-[12px] px-[16px]">
									<div className="flex flex-row justify-start items-center gap-2">
										<img
											src="/default_avatar.jpg"
											alt="avatar"
											width="30px"
											height="30px"
											className="rounded-full"
										/>
										<div className="flex flex-col">
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-[12px] font-bold">
													Jared Davies
												</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={10}
													height={10}
													fill="currentColor"
													className="bi bi-patch-check-fill"
													viewBox="0 0 16 16"
												>
													<title>star</title>
													<path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
												</svg>
											</div>
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-neutral-700 text-[10px] font-bold">
													Dec 02, 2024
												</span>
												<span className="fi fi-gb w-[18px] h-[12px]" />
											</div>
										</div>
									</div>
									<div>
										<span className="text-[12px]">good</span>
									</div>
								</div>
							</motion.div>
							<motion.div
								className="w-full lg:min-w-[748px] min-w-full shadow-xl rounded-md bg-white"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: isVisible2 ? 1 : 0, y: 0 }}
								transition={{ duration: 0.7 }}
							>
								<div className="absolute bg-transparent shadow-xl rounded-3xl ml-4">
									<div className="flex flex-row justify-start items-center gap-1 fill-yellow-300 px-1 py-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
									</div>
								</div>
								<div className="pt-[30px] pb-[12px] px-[16px]">
									<div className="flex flex-row justify-start items-center gap-2">
										<img
											src="/default_avatar.jpg"
											alt="avatar"
											width="30px"
											height="30px"
											className="rounded-full"
										/>
										<div className="flex flex-col">
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-[12px] font-bold">
													Marlyn Clarke
												</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={10}
													height={10}
													fill="currentColor"
													className="bi bi-patch-check-fill"
													viewBox="0 0 16 16"
												>
													<title>star</title>
													<path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
												</svg>
											</div>
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-neutral-700 text-[10px] font-bold">
													Nov 29, 2024
												</span>
												<span className="fi fi-us w-[18px] h-[12px]" />
											</div>
										</div>
									</div>
									<div>
										<span className="text-[12px]">
											rapid fire is overpowered lol
										</span>
									</div>
								</div>
							</motion.div>
							<motion.div
								className="w-full lg:min-w-[748px] min-w-full shadow-xl rounded-md bg-white"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: isVisible2 ? 1 : 0, y: 0 }}
								transition={{ duration: 0.8 }}
							>
								<div className="absolute bg-transparent shadow-xl rounded-3xl ml-4">
									<div className="flex flex-row justify-start items-center gap-1 fill-yellow-300 px-1 py-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
									</div>
								</div>
								<div className="pt-[30px] pb-[12px] px-[16px]">
									<div className="flex flex-row justify-start items-center gap-2">
										<img
											src="/default_avatar.jpg"
											alt="avatar"
											width="30px"
											height="30px"
											className="rounded-full"
										/>
										<div className="flex flex-col">
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-[12px] font-bold">
													Reuben Rickard
												</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={10}
													height={10}
													fill="currentColor"
													className="bi bi-patch-check-fill"
													viewBox="0 0 16 16"
												>
													<title>star</title>
													<path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
												</svg>
											</div>
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-neutral-700 text-[10px] font-bold">
													Nov 29, 2024
												</span>
												<span className="fi fi-us w-[18px] h-[12px]" />
											</div>
										</div>
									</div>
									<div>
										<span className="text-[12px]">
											can always trust omega thanks brotha
										</span>
									</div>
								</div>
							</motion.div>
							<motion.div
								className="w-full lg:min-w-[748px] min-w-full shadow-xl rounded-md bg-white"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: isVisible2 ? 1 : 0, y: 0 }}
								transition={{ duration: 0.9 }}
							>
								<div className="absolute bg-transparent shadow-xl rounded-3xl ml-4">
									<div className="flex flex-row justify-start items-center gap-1 fill-yellow-300 px-1 py-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
									</div>
								</div>
								<div className="pt-[30px] pb-[12px] px-[16px]">
									<div className="flex flex-row justify-start items-center gap-2">
										<img
											src="/default_avatar.jpg"
											alt="avatar"
											width="30px"
											height="30px"
											className="rounded-full"
										/>
										<div className="flex flex-col">
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-[12px] font-bold">
													Daren Pitts
												</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={10}
													height={10}
													fill="currentColor"
													className="bi bi-patch-check-fill"
													viewBox="0 0 16 16"
												>
													<title>star</title>
													<path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
												</svg>
											</div>
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-neutral-700 text-[10px] font-bold">
													Nov 27, 2024
												</span>
												<span className="fi fi-us w-[18px] h-[12px]" />
											</div>
										</div>
									</div>
									<div>
										<span className="text-[12px]">
											has all the features needed for b06 and warzone in one
											script ‍🔥
										</span>
									</div>
								</div>
							</motion.div>
							<motion.div
								className="w-full lg:min-w-[748px] min-w-full shadow-xl rounded-md bg-white"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: isVisible2 ? 1 : 0, y: 0 }}
								transition={{ duration: 1 }}
							>
								<div className="absolute bg-transparent shadow-xl rounded-3xl ml-4">
									<div className="flex flex-row justify-start items-center gap-1 fill-yellow-300 px-1 py-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
									</div>
								</div>
								<div className="pt-[30px] pb-[12px] px-[16px]">
									<div className="flex flex-row justify-start items-center gap-2">
										<img
											src="/default_avatar.jpg"
											alt="avatar"
											width="30px"
											height="30px"
											className="rounded-full"
										/>
										<div className="flex flex-col">
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-[12px] font-bold">
													Kennith Brown
												</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={10}
													height={10}
													fill="currentColor"
													className="bi bi-patch-check-fill"
													viewBox="0 0 16 16"
												>
													<title>star</title>
													<path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
												</svg>
											</div>
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-neutral-700 text-[10px] font-bold">
													Nov 26, 2024
												</span>
												<span className="fi fi-us w-[18px] h-[12px]" />
											</div>
										</div>
									</div>
									<div>
										<span className="text-[12px]">
											first script thats ive bought that actually works
										</span>
									</div>
								</div>
							</motion.div>
							<motion.div
								className="w-full lg:min-w-[748px] min-w-full shadow-xl rounded-md bg-white"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: isVisible2 ? 1 : 0, y: 0 }}
								transition={{ duration: 1.1 }}
							>
								<div className="absolute bg-transparent shadow-xl rounded-3xl ml-4">
									<div className="flex flex-row justify-start items-center gap-1 fill-yellow-300 px-1 py-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
									</div>
								</div>
								<div className="pt-[30px] pb-[12px] px-[16px]">
									<div className="flex flex-row justify-start items-center gap-2">
										<img
											src="/default_avatar.jpg"
											alt="avatar"
											width="30px"
											height="30px"
											className="rounded-full"
										/>
										<div className="flex flex-col">
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-[12px] font-bold">
													Woody Burton
												</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={10}
													height={10}
													fill="currentColor"
													className="bi bi-patch-check-fill"
													viewBox="0 0 16 16"
												>
													<title>star</title>
													<path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
												</svg>
											</div>
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-neutral-700 text-[10px] font-bold">
													Nov 24, 2024
												</span>
												<span className="fi fi-us w-[18px] h-[12px]" />
											</div>
										</div>
									</div>
									<div>
										<span className="text-[12px]">glad i bought</span>
									</div>
								</div>
							</motion.div>
							<motion.div
								className="w-full lg:min-w-[748px] min-w-full shadow-xl rounded-md bg-white"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: isVisible2 ? 1 : 0, y: 0 }}
								transition={{ duration: 1.2 }}
							>
								<div className="absolute bg-transparent shadow-xl rounded-3xl ml-4">
									<div className="flex flex-row justify-start items-center gap-1 fill-yellow-300 px-1 py-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
										</svg>
									</div>
								</div>
								<div className="pt-[30px] pb-[12px] px-[16px]">
									<div className="flex flex-row justify-start items-center gap-2">
										<img
											src="/default_avatar.jpg"
											alt="avatar"
											width="30px"
											height="30px"
											className="rounded-full"
										/>
										<div className="flex flex-col">
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-[12px] font-bold">Doug Head</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={10}
													height={10}
													fill="currentColor"
													className="bi bi-patch-check-fill"
													viewBox="0 0 16 16"
												>
													<title>star</title>
													<path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
												</svg>
											</div>
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-neutral-700 text-[10px] font-bold">
													Nov 23, 2024
												</span>
												<span className="fi fi-us w-[18px] h-[12px]" />
											</div>
										</div>
									</div>
									<div>
										<span className="text-[12px]">
											thought it could work for csgo but only bo6 and warzone
											still good for those games though
										</span>
									</div>
								</div>
							</motion.div>
							<motion.div
								className="w-full lg:min-w-[748px] min-w-full shadow-xl rounded-md bg-white"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: isVisible2 ? 1 : 0, y: 0 }}
								transition={{ duration: 1.3 }}
							>
								<div className="absolute bg-transparent shadow-xl rounded-3xl ml-4">
									<div className="flex flex-row justify-start items-center gap-1 fill-yellow-300 px-1 py-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.5"
											height={13}
											className="bi bi-star-fill"
											viewBox="0 0 16 16"
										>
											<title>star</title>
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
									</div>
								</div>
								<div className="pt-[30px] pb-[12px] px-[16px]">
									<div className="flex flex-row justify-start items-center gap-2">
										<img
											src="/default_avatar.jpg"
											alt="avatar"
											width="30px"
											height="30px"
											className="rounded-full"
										/>
										<div className="flex flex-col">
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-[12px] font-bold">
													Mitchell Jennings
												</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={10}
													height={10}
													fill="currentColor"
													className="bi bi-patch-check-fill"
													viewBox="0 0 16 16"
												>
													<title>star</title>
													<title>random</title>
													<path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
												</svg>
											</div>
											<div className="flex flex-row justify-start items-center gap-2">
												<span className="text-neutral-700 text-[10px] font-bold">
													Nov 21, 2024
												</span>
												<span className="fi fi-us w-[18px] h-[12px]" />
											</div>
										</div>
									</div>
									<div>
										<span className="text-[12px]">best one out there</span>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
				<Footer />
			</PayPalScriptProvider>
		</>
	);
}
