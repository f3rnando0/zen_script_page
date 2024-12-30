import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function RefundPolicy() {
	return (
		<div className="flex flex-col justify-between h-screen">
			<div>
				<Header />
				<div className="flex flex-col justify-center items-center text-center pb-10 px-4 lg:px-0">
					<main className="pt-4 max-w-[700px] flex flex-col justify-center items-center text-center text-white">
						<h1 className="text-[46px] font-bold">Return & Refund Policy</h1>
						<div className="flex flex-col gap-4 text-left text-[14px]">
							<span>
								Our products have a no-refund policy. Due to the instant access
								to the products along with the time taken to produce these
								products, we cannot offer a refund. You will immediately have
								access to everything.
								<br />
								By purchasing one of our products, you agree to the refund
								policy.
							</span>
							<span>
								You will have lifetime access to the products, only revocable
								for sharing your login or reposting content publicly.
							</span>
						</div>
					</main>
				</div>
			</div>
			<Footer />
		</div>
	);
}
