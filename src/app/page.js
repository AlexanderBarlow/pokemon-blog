"use client";

import { useState, useEffect } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/Card";

export default function Home() {
	const [carouselCards, setCarouselCards] = useState([]);
	const [featuredCards, setFeaturedCards] = useState([]);

	// Fetch cards for the carousel (Rare Secret)
	useEffect(() => {
		async function fetchCarouselCards() {
			const rarityType = "Rare Secret";
			const query = `rarity:"${encodeURIComponent(rarityType)}"`;

			try {
				const res = await fetch(
					`https://api.pokemontcg.io/v2/cards?q=${query}&orderBy=-set.releaseDate&pageSize=10`,
					{
						method: "GET",
						headers: {
							"X-Api-Key": process.env.NEXT_PUBLIC_POKETCG_API_KEY,
							"Content-Type": "application/json",
						},
					}
				);

				if (!res.ok) {
					throw new Error("Failed to fetch Pokémon cards");
				}

				const data = await res.json();
				setCarouselCards(data.data || []);
			} catch (error) {
				console.error("Error fetching carousel cards:", error);
				setCarouselCards([]);
			}
		}

		fetchCarouselCards();
	}, []);

	// Fetch different cards for the Featured section (Rare Ultra)
	useEffect(() => {
		async function fetchFeaturedCards() {
			const rarityType = "Rare Ultra";
			const query = `rarity:"${encodeURIComponent(rarityType)}"`;

			try {
				const res = await fetch(
					`https://api.pokemontcg.io/v2/cards?q=${query}&orderBy=-set.releaseDate&pageSize=8`,
					{
						method: "GET",
						headers: {
							"X-Api-Key": process.env.NEXT_PUBLIC_POKETCG_API_KEY,
							"Content-Type": "application/json",
						},
					}
				);

				if (!res.ok) {
					throw new Error("Failed to fetch Pokémon cards");
				}

				const data = await res.json();
				setFeaturedCards(data.data || []);
			} catch (error) {
				console.error("Error fetching featured cards:", error);
				setFeaturedCards([]);
			}
		}

		fetchFeaturedCards();
	}, []);

	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-10">
			{/* Hero Section */}
			<section className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10">
				{/* Announcement Text */}
				<div className="md:w-1/2 text-center md:text-left">
					<h1 className="text-5xl font-pokemon font-bold text-primary drop-shadow-lg">
						Welcome to Pokémon Card Vault
					</h1>
					<p className="text-lg mt-4 text-gray-300 leading-relaxed">
						Track, browse, and collect the rarest Pokémon cards ever released!
					</p>
				</div>

				{/* Pokémon Card Carousel */}
				<div className="relative w-full max-w-lg">
					<Carousel className="w-full max-w-lg p-4 rounded-lg shadow-xl border border-yellow-500">
						<CarouselContent className="flex">
							{carouselCards.length > 0 ? (
								carouselCards.map((card) => (
									<CarouselItem
										key={card.id}
										className="w-[250px] flex flex-col items-center p-2"
									>
										<img
											src={card.images.large}
											alt={card.name}
											className="rounded-lg shadow-lg border-4 border-yellow-500 h-[320px] hover:scale-105 transition-transform duration-300"
										/>
										<h3 className="text-lg font-bold text-card-foreground mt-2">
											{card.name}
										</h3>
									</CarouselItem>
								))
							) : (
								<p className="text-gray-500 text-center w-full">
									Loading cards...
								</p>
							)}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</section>

			{/* Featured Cards Section */}
			<section className="w-full max-w-7xl mt-16">
				<h2 className="text-3xl font-bold text-center text-primary mb-8">
					Featured Pokémon Cards
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					{featuredCards.length > 0 ? (
						featuredCards.map((card) => (
							<Card
								key={card.id}
								className="shadow-lg p-4 bg-card border border-yellow-500 hover:scale-105 transition-all duration-300"
							>
								<CardContent className="flex flex-col items-center">
									<img
										src={card.images.small}
										alt={card.name}
										className="rounded-lg mb-2 hover:scale-110 transition-all duration-300"
									/>
									<h3 className="text-lg font-bold text-card-foreground">
										{card.name}
									</h3>
									<p className="text-gray-400">Set: {card.set.name}</p>
									<p className="text-gray-400">Rarity: {card.rarity}</p>
									{card.tcgplayer?.prices?.normal?.market && (
										<p className="text-green-500 font-bold">
											Market Price: $
											{card.tcgplayer.prices.normal.market.toFixed(2)}
										</p>
									)}
									<a
										href={card.tcgplayer?.url}
										target="_blank"
										rel="noopener noreferrer"
										className="mt-2 text-blue-500 hover:underline"
									>
										View on TCGPlayer
									</a>
								</CardContent>
							</Card>
						))
					) : (
						<p className="text-gray-500 text-center w-full col-span-4">
							No cards found.
						</p>
					)}
				</div>
			</section>
		</main>
	);
}
