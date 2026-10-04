import Link from "next/link";
import { ArrowRight, Clock3, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getAvailabilitySummary, getChairStatus, getServices } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const salonPhotos = [
	{
		src: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80",
		alt: "शैलीत मॅन्युअल हॅयरकट",
	},
	{
		src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80",
		alt: "बिआर्ड स्टाइलिंग",
	},
	{
		src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80",
		alt: "ग्रूमिंग स्टुडिओ फोटोग्राफ",
	},
];

const beforeAfterGallery = [
	{
		title: "क्लासिक कट",
		before: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80",
		after: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
		caption: "हँड्स-ऑन कट आणि साफ फिनिश",
	},
	{
		title: "बिआर्ड ट्रिम",
		before: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
		after: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
		caption: "शार्प ड्रॉप आणि नेटल लुक",
	},
	{
		title: "स्टाइलिंग",
		before: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
		after: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80",
		caption: "कॅज्युअल ते प्रीमियम स्टाइल",
	},
];

const interiorPhotos = [
	{
		src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
		alt: "सालुनचे लक्झरी इंटीरियर्स",
	},
	{
		src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80",
		alt: "सालुनचे आधुनिक चेअर आणि लाइटिंग",
	},
	{
		src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80",
		alt: "सालुनमध्ये ट्रीटमेंट रूम",
	},
];

const serviceHighlights = [
	{
		id: "signature-cut",
		name: "सिग्नेचर कट",
		description: "दृश्यसंपन्न फिनिश आणि व्यक्तिमत्वानुसार स्टाइलिंग",
		price: 1299,
		duration_minutes: 45,
		image:
			"https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "beard-luxe",
		name: "बिआर्ड लक्स",
		description: "तपशीलपूर्ण ट्रिम आणि हाय-एंड फिनिश",
		price: 899,
		duration_minutes: 30,
		image:
			"https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "skin-ritual",
		name: "स्किन रिट्युअल",
		description: "साफ़ आणि चमकदार त्वचेसाठी आरामदायक सेवेचे अनुभव",
		price: 1499,
		duration_minutes: 50,
		image:
			"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "premium-grooming",
		name: "प्रीमियम ग्रूमिंग",
		description: "क्लासिक आणि मॉडर्न लुकमध्ये संपूर्ण ट्रीटमेंट",
		price: 1799,
		duration_minutes: 60,
		image:
			"https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80",
	},
];

export default function HomePage() {
	const chairs = getChairStatus();
	const summary = getAvailabilitySummary();
	const services = getServices();

	return (
		<main className="min-h-screen bg-[#0B0B0B] text-[#F5F2EA]">
			<section className="relative overflow-hidden border-b border-white/10 bg-[#0B0B0B]">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,166,107,0.18),transparent_35%)]" />
				<div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[#C9A66B]/40 to-transparent" />

				<div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
					<header className="mb-10 flex items-center justify-between rounded-full border border-white/10 bg-[#121212]/80 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A66B]/40 bg-[#C9A66B]/10 text-[10px] font-semibold tracking-[0.2em] text-[#C9A66B]">
								TTH
							</div>
							<div>
								<p className="text-[9px] uppercase tracking-[0.28em] text-[#A8A39A]">Luxury Grooming</p>
								<p className="text-sm font-semibold tracking-[0.04em]">तुषार ट्रिम हाऊस</p>
							</div>
						</div>

						<nav className="hidden items-center gap-6 text-sm text-[#A8A39A] md:flex">
							<Link href="#" className="transition-colors hover:text-[#F5F2EA]">मुख्यपृष्ठ</Link>
							<Link href="#services" className="transition-colors hover:text-[#F5F2EA]">सेवा</Link>
							<Link href="#gallery" className="transition-colors hover:text-[#F5F2EA]">गॅलरी</Link>
							<Link href="#availability" className="transition-colors hover:text-[#F5F2EA]">उपलब्धता</Link>
							<Link href="#booking" className="transition-colors hover:text-[#F5F2EA]">माझी बुकिंग</Link>
						</nav>

						<Button asChild size="lg" className="rounded-full px-6 shadow-[0_12px_30px_rgba(201,166,107,0.2)]">
							<Link href="#booking">आता बुक करा</Link>
						</Button>
					</header>

					<div className="grid items-center gap-8 pb-10 pt-6 md:grid-cols-[1.1fr_0.9fr] md:pt-8">
						<div className="relative z-10">
							<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9A66B]/25 bg-[#C9A66B]/8 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-[#C9A66B]">
								<Sparkles size={12} />
								प्रीमियम ग्रूमिंग स्टुडिओ
							</div>

							<h1 className="max-w-xl font-(family-name:--font-playfair) text-5xl font-semibold leading-[0.9] tracking-[-0.08em] text-[#F5F2EA] md:text-7xl">
								तुषार
								<span className="mt-2 block text-[#C9A66B]">ट्रिम हाऊस</span>
							</h1>

							<p className="mt-5 max-w-lg text-2xl leading-tight tracking-[-0.04em] text-[#F5F2EA] md:text-4xl">
								तंत्र. शैली. आत्मविश्वास.
							</p>

							<p className="mt-5 max-w-xl text-base leading-7 text-[#A8A39A] md:text-lg">
								लक्झरी फील, हँड्स-ऑन टेक्निशियन, आणि वेळेची कमतरता न ठेवता, तुमच्या स्टाइलची नवी ओळख बनवण्याची सेवा.
							</p>

							<div className="mt-8 flex flex-col gap-4 sm:flex-row">
								<Button asChild size="lg" className="rounded-full px-6 shadow-[0_12px_30px_rgba(201,166,107,0.2)]">
									<Link href="#booking" className="inline-flex items-center gap-2">
										तुमची वेळ बुक करा
										<ArrowRight size={16} />
									</Link>
								</Button>
								<Button asChild variant="secondary" size="lg" className="rounded-full px-6">
									<Link href="#availability">लाइव्ह उपलब्धता</Link>
								</Button>
							</div>

							<div className="mt-10 flex flex-wrap gap-3 text-sm text-[#A8A39A]">
								<div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#121212]/80 px-3 py-2"><Star size={14} className="text-[#C9A66B]" /> ४.९ ग्राहक रेटिंग</div>
								<div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#121212]/80 px-3 py-2"><Clock3 size={14} className="text-[#C9A66B]" /> दररोज खुललेले</div>
								<div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#121212]/80 px-3 py-2"><MapPin size={14} className="text-[#C9A66B]" /> पनवेल</div>
							</div>
						</div>

						<div className="relative">
							<div className="absolute -left-8 top-8 hidden h-24 w-24 rounded-full border border-[#C9A66B]/35 bg-[#C9A66B]/10 blur-sm md:block" />
							<div className="relative mx-auto max-w-135 rounded-4xl border border-white/10 bg-[#121212] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
								<div className="grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
									<div className="overflow-hidden rounded-3xl border border-white/10 bg-[#181818]">
										<img
											src={salonPhotos[0].src}
											alt={salonPhotos[0].alt}
											className="h-88 w-full object-cover"
										/>
									</div>
									<div className="grid gap-3">
										<div className="overflow-hidden rounded-3xl border border-white/10 bg-[#181818]">
											<img src={salonPhotos[1].src} alt={salonPhotos[1].alt} className="h-42 w-full object-cover" />
										</div>
										<div className="overflow-hidden rounded-3xl border border-white/10 bg-[#181818]">
											<img src={salonPhotos[2].src} alt={salonPhotos[2].alt} className="h-42 w-full object-cover" />
										</div>
									</div>
								</div>

								<div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
									<div className="rounded-3xl border border-white/10 bg-[#191919] p-4">
										<div className="flex items-center justify-between gap-3">
											<span className="text-[10px] uppercase tracking-[0.22em] text-[#A8A39A]">Live now</span>
											<span className="inline-flex items-center gap-2 rounded-full border border-[#4ADE80]/20 bg-[#4ADE80]/10 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-[#4ADE80]">
												<span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
												लाइव्ह
											</span>
										</div>
										<div className="mt-4 flex items-center justify-between text-sm text-[#F5F2EA]">
											<span>कुर्सी ०१</span>
											<span className="text-[#F87171]">सेवा सुरु</span>
										</div>
										<div className="mt-2 flex items-center justify-between text-sm text-[#F5F2EA]">
											<span>कुर्सी ०२</span>
											<span className="text-[#4ADE80]">उपलब्ध</span>
										</div>
									</div>
									<div className="rounded-3xl border border-[#C9A66B]/20 bg-[#C9A66B]/5 px-4 py-3 text-right">
										<p className="text-[9px] uppercase tracking-[0.2em] text-[#A8A39A]">Next slot</p>
										<p className="mt-1 text-3xl font-medium tracking-tighter text-[#F5F2EA]">{summary.nextAvailable}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				<div className="grid gap-4 md:grid-cols-3">
					{[
						{ icon: ShieldCheck, label: "अचूक कट" },
						{ icon: Star, label: "प्रीमियम फिनिश" },
						{ icon: Clock3, label: "जलद बुकिंग" },
					].map(({ icon: Icon, label }) => (
						<div key={label} className="rounded-[1.75rem] border border-white/10 bg-[#141414] p-5 text-center shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
							<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A66B]/30 bg-[#C9A66B]/10 text-[#C9A66B]">
								<Icon size={18} />
							</div>
							<p className="text-base font-medium text-[#F5F2EA]">{label}</p>
						</div>
					))}
				</div>
			</section>

			<section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="mb-8 flex items-end justify-between gap-4">
					<div>
						<p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">Curated menu</p>
						<h2 className="mt-2 font-(family-name:--font-playfair) text-3xl font-semibold tracking-tighter text-[#F5F2EA]">तुमच्या स्टाइलसाठी निवड</h2>
					</div>
					<Link href="#booking" className="hidden text-sm text-[#C9A66B] md:inline-flex">
						वेळ जवळून बुक करा →
					</Link>
				</div>

				<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
					{serviceHighlights.map((service) => (
						<article key={service.id} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#141414] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A66B]/30 hover:shadow-[0_18px_40px_rgba(0,0,0,0.2)]">
							<div className="relative overflow-hidden">
								<img src={service.image} alt={service.name} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
								<div className="absolute inset-0 bg-linear-to-t from-[#0B0B0B]/80 via-transparent to-transparent" />
								<span className="absolute left-4 top-4 inline-flex rounded-full border border-[#C9A66B]/25 bg-[#0B0B0B]/60 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-[#C9A66B]">लोकप्रिय</span>
							</div>
							<div className="p-5">
								<div className="mb-3 flex items-center justify-between gap-3">
									<h3 className="text-xl font-medium text-[#F5F2EA]">{service.name}</h3>
									<span className="text-sm font-medium text-[#C9A66B]">{formatCurrency(service.price)}</span>
								</div>
								<p className="text-sm leading-6 text-[#A8A39A]">{service.description}</p>
								<div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-[#A8A39A]">
									<span>{service.duration_minutes} मिनिटे</span>
									<span className="text-[#C9A66B] transition-colors group-hover:text-[#F5F2EA]">आता बुक करा</span>
								</div>
							</div>
						</article>
					))}
				</div>
			</section>

			<section id="gallery" className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
				<div className="mb-8 flex items-end justify-between gap-4">
					<div>
						<p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">Before / After</p>
						<h2 className="mt-2 font-(family-name:--font-playfair) text-3xl font-semibold tracking-tighter text-[#F5F2EA]">रिअल ट्रान्सफॉर्मेशन</h2>
					</div>
					<div className="rounded-full border border-[#C9A66B]/20 bg-[#C9A66B]/8 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#C9A66B]">
						५००+ ट्रिम केलेले
					</div>
				</div>

				<div className="grid gap-5 xl:grid-cols-3">
					{beforeAfterGallery.map((item) => (
						<div key={item.title} className="overflow-hidden rounded-4xl border border-white/10 bg-[#141414] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
							<div className="mb-4 flex items-center justify-between px-1 pt-1">
								<span className="text-sm font-medium text-[#F5F2EA]">{item.title}</span>
								<span className="text-[10px] uppercase tracking-[0.2em] text-[#A8A39A]">Result</span>
							</div>

							<div className="grid grid-cols-2 gap-2">
								<div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0B]">
									<div className="bg-[#C9A66B]/10 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-[#C9A66B]">Before</div>
									<img src={item.before} alt={`${item.title} before`} className="h-52 w-full object-cover" />
								</div>
								<div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0B]">
									<div className="bg-[#4ADE80]/10 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-[#4ADE80]">After</div>
									<img src={item.after} alt={`${item.title} after`} className="h-52 w-full object-cover" />
								</div>
							</div>

							<p className="mt-4 px-2 pb-3 text-sm leading-6 text-[#A8A39A]">{item.caption}</p>
						</div>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="mb-8 flex items-end justify-between gap-4">
					<div>
						<p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">Interior</p>
						<h2 className="mt-2 font-(family-name:--font-playfair) text-3xl font-semibold tracking-tighter text-[#F5F2EA]">सालुनचा अनुभव</h2>
					</div>
					<Link href="#booking" className="hidden text-sm text-[#C9A66B] md:inline-flex">
						बुकिंगसाठी तयार →
					</Link>
				</div>

				<div className="grid gap-4 md:grid-cols-3">
					{interiorPhotos.map((photo, index) => (
						<div key={photo.src} className={`overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#141414] ${index === 0 ? "md:col-span-2" : ""}`}>
							<img
								src={photo.src}
								alt={photo.alt}
								className={`${index === 0 ? "h-104" : "h-64"} w-full object-cover transition-transform duration-500 hover:scale-105`}
							/>
						</div>
					))}
				</div>
			</section>

			<section id="availability" className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
				<div className="rounded-4xl border border-white/10 bg-[#141414] p-5 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
					<div className="mb-6 flex items-center justify-between gap-4">
						<div>
							<p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">लाइव्ह कुर्सी स्थिती</p>
							<h2 className="mt-2 font-(family-name:--font-playfair) text-3xl font-semibold tracking-tighter text-[#F5F2EA]">उपलब्धता</h2>
						</div>
						<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0B0B0B] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#A8A39A]">
							<span className="h-2 w-2 rounded-full bg-[#4ADE80]" /> लाइव्ह
						</div>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						{chairs.map((chair) => (
							<div key={chair.id} className="rounded-3xl border border-white/10 bg-[#191919] p-5 transition-colors hover:border-[#C9A66B]/20">
								<div className="flex items-center justify-between gap-3">
									<h3 className="text-xl font-medium text-[#F5F2EA]">{chair.name}</h3>
									<span className={chair.status === "AVAILABLE" ? "text-[#4ADE80]" : chair.status === "IN_SERVICE" ? "text-[#F87171]" : "text-[#C9A66B]"}>
										{chair.status === "AVAILABLE" ? "🟢 उपलब्ध" : chair.status === "IN_SERVICE" ? "🔴 सेवा सुरु" : "🟡 आरक्षित"}
									</span>
								</div>
								<div className="mt-5 text-sm text-[#A8A39A]">
									{chair.status === "AVAILABLE" ? (
										<p>बुकिंगसाठी उपलब्ध</p>
									) : (
										<>
											<p className="text-[#F5F2EA]">{chair.customer}</p>
											<p>{chair.service}</p>
											<p>{chair.timeRange}</p>
										</>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="booking" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
					<div className="rounded-4xl border border-white/10 bg-[#141414] p-5 md:p-8 shadow-[0_24px_50px_rgba(0,0,0,0.25)]">
						<div className="mb-6">
							<p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">तुमची वेळ</p>
							<h2 className="mt-2 font-(family-name:--font-playfair) text-3xl font-semibold tracking-tighter text-[#F5F2EA]">एका मिनिटात बुक करा</h2>
						</div>

						<form className="space-y-5">
							<div className="grid gap-5 md:grid-cols-2">
								<label className="space-y-2 text-sm text-[#A8A39A]">
									<span>नाव</span>
									<input className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-[#F5F2EA] outline-none ring-0 placeholder:text-[#A8A39A] transition-colors focus:border-[#C9A66B]/40" placeholder="तुमचे नाव लिहा" />
								</label>
								<label className="space-y-2 text-sm text-[#A8A39A]">
									<span>मोबाईल क्रमांक</span>
									<input className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-[#F5F2EA] outline-none ring-0 placeholder:text-[#A8A39A] transition-colors focus:border-[#C9A66B]/40" placeholder="१०_digit क्रमांक" />
								</label>
							</div>

							<label className="space-y-2 text-sm text-[#A8A39A]">
								<span>सेवा</span>
								<select className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-[#F5F2EA] outline-none transition-colors focus:border-[#C9A66B]/40">
									{services.map((service) => (
										<option key={service.id} value={service.id} className="bg-[#0B0B0B]">
											{service.name} • {formatCurrency(service.price)}
										</option>
									))}
								</select>
							</label>

							<div className="grid gap-5 md:grid-cols-2">
								<label className="space-y-2 text-sm text-[#A8A39A]">
									<span>तारीख</span>
									<input type="date" className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-[#F5F2EA] outline-none transition-colors focus:border-[#C9A66B]/40" />
								</label>
								<label className="space-y-2 text-sm text-[#A8A39A]">
									<span>वेळ</span>
									<select className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-[#F5F2EA] outline-none transition-colors focus:border-[#C9A66B]/40">
										<option>१:१५ PM</option>
										<option>१:३० PM</option>
										<option>२:०० PM</option>
									</select>
								</label>
							</div>

							<Button type="submit" size="lg" className="w-full rounded-full text-base shadow-[0_16px_35px_rgba(201,166,107,0.18)]">
								बुकिंगची पुष्टी करा
							</Button>
						</form>
					</div>

					<aside className="rounded-4xl border border-[#C9A66B]/20 bg-[#C9A66B]/5 p-5 md:p-8">
						<p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">तुमची अपॉइंटमेंट</p>
						<div className="mt-6 space-y-4 text-sm text-[#F5F2EA]">
							<div className="flex items-center justify-between border-b border-white/10 pb-3">
								<span className="text-[#A8A39A]">सेवा</span>
								<span>हॅयरकट + बिआर्ड</span>
							</div>
							<div className="flex items-center justify-between border-b border-white/10 pb-3">
								<span className="text-[#A8A39A]">कालावधी</span>
								<span>४५ मिनिटे</span>
							</div>
							<div className="flex items-center justify-between border-b border-white/10 pb-3">
								<span className="text-[#A8A39A]">तारीख</span>
								<span>आज</span>
							</div>
							<div className="flex items-center justify-between border-b border-white/10 pb-3">
								<span className="text-[#A8A39A]">वेळ</span>
								<span>१:१५ PM</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-[#A8A39A]">अंदाजे खर्च</span>
								<span className="text-[#C9A66B]">₹२५०</span>
							</div>
						</div>
					</aside>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="mb-8 flex items-end justify-between gap-4">
					<div>
						<p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">गॅलरी</p>
						<h2 className="mt-2 font-(family-name:--font-playfair) text-3xl font-semibold tracking-tighter text-[#F5F2EA]">स्टुडिओची झलक</h2>
					</div>
					<Link href="#booking" className="hidden text-sm text-[#C9A66B] md:inline-flex">
						तुमची वेळ बुक करा →
					</Link>
				</div>

				<div className="grid gap-4 md:grid-cols-3">
					{salonPhotos.map((photo) => (
						<div key={photo.src} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#141414]">
							<img src={photo.src} alt={photo.alt} className="h-72 w-full object-cover transition-transform duration-500 hover:scale-105" />
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
