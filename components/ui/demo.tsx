"use client";

import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

// Curated high-res e-commerce flagship drop images
const WORKS: WorksWheelItem[] = [
  {
    title: "Aura Sound Pro Max",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
    href: "#aura-sound",
    subtitle: "₹18,999 · Spatial Audio"
  },
  {
    title: "Chronos Chronograph Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
    href: "#chronos-watch",
    subtitle: "₹12,499 · Sapphire Crystal"
  },
  {
    title: "Verve Titanium Sunglasses",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80",
    href: "#verve-sunglasses",
    subtitle: "₹4,999 · Polarized UV400"
  },
  {
    title: "Nomad Canvas Weekend Duffle",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
    href: "#nomad-duffle",
    subtitle: "₹6,899 · Weatherproof Waxed"
  },
  {
    title: "Apex Mechanical Keyboard",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80",
    href: "#apex-keyboard",
    subtitle: "₹8,499 · Hot-Swap RGB"
  },
  {
    title: "Urban Glide Minimal Sneaker",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
    href: "#urban-glide",
    subtitle: "₹7,299 · Italian Nappa"
  },
  {
    title: "Lumina Smart Table Lamp",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    href: "#lumina-lamp",
    subtitle: "₹3,799 · Wireless Charging"
  },
  {
    title: "Ceramic Artisan Pour-Over",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    href: "#ceramic-dripper",
    subtitle: "₹2,199 · Matte Charcoal"
  },
];

export default function WorksWheelDemo() {
  return (
    <div className="bg-background text-foreground w-full h-screen">
      <WorksWheel items={WORKS} label="Suresh '26" action="View Drop" />
    </div>
  );
}
