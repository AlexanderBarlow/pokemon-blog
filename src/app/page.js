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
import { Button } from "@/components/ui/button";

export default function Home() {
  const [carouselCards, setCarouselCards] = useState([]);
  const [featuredCards, setFeaturedCards] = useState([]);

  // Fetch cards for the carousel (Rare Secret)
  useEffect(() => {
    async function fetchCarouselCards() {
      const query = `rarity:"Rare Secret"`;
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

  // Fetch cards for the Featured section (Rare Ultra)
  useEffect(() => {
    async function fetchFeaturedCards() {
      const query = `rarity:"Rare Ultra"`;
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
        <section className="w-full h-full max-w-screen-xl grid grid-cols-2 md:grid-cols-2 gap-8 py-24 pb-[50px]">
        {/* Announcement Text (Left Column) */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-primary tracking-wide leading-snug drop-shadow-xl">
            Welcome to <br />
            <span className="text-yellow-400">Pokémon Card Vault</span>
          </h1>
          <p className="text-lg mt-6 text-gray-300 leading-relaxed max-w-md">
            Track, browse, and collect the rarest Pokémon cards ever released!
            Connect with fellow collectors and stay ahead of the market.
          </p>
          <Button className="mt-6 px-6 py-3 bg-yellow-400 text-black text-lg font-bold rounded-lg shadow-md hover:scale-105 transition-all">
            Explore Now
          </Button>
        </div>

        {/* Pokémon Card Carousel (Right Column) */}
        <div className="flex justify-center px-6">
          <Carousel className="w-full max-w-md md:max-w-lg p-4 rounded-lg shadow-2xl border-yellow-500 bg-opacity-20 backdrop-blur-lg">
            <CarouselContent className="flex">
              {carouselCards.length > 0 ? (
                carouselCards.map((card) => (
                  <CarouselItem key={card.id} className="w-[250px] flex flex-col items-center p-2">
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
                <p className="text-gray-500 text-center w-full">Loading cards...</p>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

    {/* Featured Cards Section (remains unchanged) */}
    <section className="w-full max-w-7xl mt-20">
      <h2 className="text-4xl font-bold text-center text-primary mb-8">
        Featured Pokémon Cards
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {featuredCards.length > 0 ? (
          featuredCards.map((card) => (
            <Card
              key={card.id}
              className="shadow-lg p-6 bg-card border border-yellow-500 hover:scale-105 transition-all duration-300"
            >
              <CardContent className="flex flex-col items-center">
                <img
                  src={card.images.small}
                  alt={card.name}
                  className="rounded-lg mb-2 hover:scale-110 transition-all duration-300 w-40"
                />
                <h3 className="text-md font-bold text-card-foreground">
                  {card.name}
                </h3>
                <p className="text-gray-400 text-sm">Set: {card.set.name}</p>
                <p className="text-gray-400 text-sm">Rarity: {card.rarity}</p>
                {card.tcgplayer?.prices?.normal?.market && (
                  <p className="text-green-500 font-bold text-sm">
                    Market Price: ${card.tcgplayer.prices.normal.market.toFixed(2)}
                  </p>
                )}
                <a
                  href={card.tcgplayer?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-blue-500 text-sm hover:underline"
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
