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
  const [cards, setCards] = useState([]);

useEffect(() => {
  async function fetchCards() {
    const rarityType = "Rare Shiny GX";
    const query = `rarity:"${encodeURIComponent(rarityType)}"`; // ✅ Encode correctly

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
      setCards(data.data || []); // ✅ Ensure data is set properly
    } catch (error) {
      console.error("Error fetching Pokémon cards:", error);
      setCards([]);
    }
  }

  fetchCards();
}, []);


  return (
    <main className="flex flex-col items-center justify-center p-10">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
        {/* Announcement Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-bold">Welcome to Pokémon Card Vault</h1>
          <p className="text-lg mt-4 text-gray-500">
            Browse, track, and collect your favorite Pokémon cards!
          </p>
        </div>

        {/* Pokémon Card Carousel */}
        <div className="relative">
          <Carousel className="w-full max-w-lg h-[400px] bg-card p-4 rounded-lg shadow-xl border border-yellow-500">
            <CarouselContent>
              {cards.length > 0 ? (
                cards.map((card, index) => (
                  <CarouselItem
                    key={card.id}
                    className={`flex flex-col items-center transform rotate-y-[${
                      index * 30
                    }deg]`}
                  >
                    <img
                      src={card.images.large}
                      alt={card.name}
                      className="rounded-lg shadow-lg mb-2 border-4 border-yellow-500"
                    />
                    <h3 className="text-lg font-bold text-card-foreground">
                      {card.name}
                    </h3>
                    <p className="text-gray-400">
                      Set: {card.set.name} ({card.set.releaseDate})
                    </p>
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

      {/* Card Showcase Section */}
      <section className="w-full max-w-6xl mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">
          Featured Pokémon Cards
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cards.length > 0 ? (
            cards.map((card) => (
              <Card key={card.id} className="shadow-lg p-4">
                <CardContent className="flex flex-col items-center">
                  <img
                    src={card.images.small}
                    alt={card.name}
                    className="rounded-lg mb-2"
                  />
                  <h3 className="text-lg bold text-black">{card.name}</h3>
                  <p className="text-gray-500">Set: {card.set.name}</p>
                  <p className="text-gray-500">Rarity: {card.rarity}</p>
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
