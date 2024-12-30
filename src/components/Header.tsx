import Image from "next/image";

export default function Header() {
	return (
		<header className="w-full p-4 border-b border-gray-600 bg-gray-900">
			<div className="flex flex-row justify-center items-center gap-2">
				<Image
					src="/photo_2024-12-03_19-35-25.jpg"
					alt="logo"
					width={60}
					height={60}
					className="rounded-xl"
				/>
				<span className="text-white font-bold text-xl">OMEGA Scripts</span>
			</div>
		</header>
	);
}
