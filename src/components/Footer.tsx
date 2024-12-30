import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<div className="mx-auto flex w-full border-t border-gray-600">
			<div className="lg:w-full px-6 lg:px-72 pt-10 pb-4 flex flex-col lg:flex-row lg:justify-between gap-4">
				<div className="flex flex-row items-start">
					<div className="flex flex-row items-center gap-2">
						<Image
							src="/photo_2024-12-03_19-35-25.jpg"
							alt="logo"
							width={60}
							height={60}
							className="rounded-xl"
						/>
						<span className="text-white font-bold text-xl">OMEGA Scripts</span>
					</div>
				</div>

				<div className="flex flex-col lg:justify-between gap-4">
					<div className="flex flex-col lg:flex-row lg:justify-start gap-20">
						<div className="flex flex-col gap-4 pt-5">
							<span className="text-white text-base font-semibold text-pretty">
								Site Map
							</span>
							<div className="flex flex-col gap-2">
								<Link href={"/terms-of-service"}>
									<span className="text-neutral-300 hover:text-white transition-all duration-300">
										Terms Of Service
									</span>
								</Link>
								<Link href={"/privacy-policy"}>
									<span className="text-neutral-300 hover:text-white transition-all duration-300">
										Privacy Policy
									</span>
								</Link>
								<Link href={"/refund-policy"}>
									<span className="text-neutral-300 hover:text-white transition-all duration-300">
										Refund Policy
									</span>
								</Link>
							</div>
						</div>
					</div>

					<div className="block pt-8">
						<span className="text-neutral-300">
							Copyright © 2024 OMEGA Scripts. All Rights Reserved.
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
