"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import type { Reservation } from "@/types";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState<Reservation[]>([]);
	const [loading, setLoading] = useState(true);

	const refreshOrders = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/admin/bookings");
			const json = await res.json();
			setOrders(json.bookings ?? []);
		} catch (e) {
			setOrders([]);
		}
		setLoading(false);
	};

	useEffect(() => {
		refreshOrders();
	}, []);

	const handleStatusUpdate = async (id: string, status: Reservation["status"]) => {
		try {
			const res = await fetch("/api/admin/bookings", {
				method: "PATCH",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ id, status }),
			});

			if (res.ok) {
				await refreshOrders();
			}
		} catch (e) {
			// ignore
		}
	};

	return (
		<main className="min-h-screen bg-[#0B0B0B] px-4 py-8 text-[#F5F2EA] sm:px-6">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 flex items-center justify-between gap-4">
					<div>
						<p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">ऑपरेशन</p>
						<h1 className="mt-2 text-4xl font-semibold tracking-tighter">ऑर्डर पुनरावलोकन आणि स्वीकार</h1>
					</div>
					<div className="rounded-full border border-[#C9A66B]/20 bg-[#C9A66B]/8 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#C9A66B]">
						{orders.length} प्रलंबित
					</div>
				</div>

				{loading ? (
					<div className="rounded-[30px] border border-white/10 bg-[#141414] p-6 text-[#A8A39A]">Booking data loading...</div>
				) : null}

				<div className="space-y-5">
					{orders.map((order) => (
						<div key={order.id} className="rounded-[30px] border border-white/10 bg-[#141414] p-5 md:p-6">
							<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
								<div className="space-y-2 text-sm text-[#A8A39A]">
									<div className="flex items-center gap-3">
										<span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A66B]">{order.booking_code}</span>
										<span className="rounded-full border border-[#C9A66B]/20 bg-[#C9A66B]/8 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-[#C9A66B]">{order.status}</span>
									</div>
									<p className="text-xl font-medium text-[#F5F2EA]">{order.customer_name}</p>
									<p>{order.service_id}</p>
									<p>
										{new Date(order.start_time).toLocaleString("en-IN", {
											dateStyle: "medium",
											timeStyle: "short",
										})}
									</p>
									<p>Chair ID: {order.chair_id}</p>
									<p>{order.customer_phone}</p>
								</div>

								<div className="flex flex-col gap-3 lg:items-end">
									<div className="flex flex-wrap gap-2">
										<Button size="sm" className="rounded-full" onClick={() => handleStatusUpdate(order.id, "ARRIVED")}>स्वीकारा</Button>
										<Button variant="secondary" size="sm" className="rounded-full" onClick={() => handleStatusUpdate(order.id, "IN_SERVICE")}>सेवा सुरू</Button>
										<Button variant="secondary" size="sm" className="rounded-full" onClick={() => handleStatusUpdate(order.id, "CANCELLED")}>नकार द्या</Button>
									</div>
									<p className="text-xs uppercase tracking-[0.2em] text-[#A8A39A]">कारवाई आवश्यक</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
