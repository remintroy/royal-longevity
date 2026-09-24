import {
  Dumbbell,
  Flower2,
  Activity,
  Waves,
  Sparkles,
  Smile,
  Brush,
  Scissors,
  Hand,
} from "lucide-react";
import type { CategoryId } from "@/data/catalogue";
const icons = {
  "gym-fitness": Dumbbell,
  yoga: Flower2,
  pilates: Activity,
  "swimming-pool": Waves,
  "spa-wellness": Sparkles,
  "facial-treatments": Smile,
  makeup: Brush,
  "salon-hair": Scissors,
  "nails-pedicure": Hand,
};
export function CategoryIcon({
  category,
  className,
}: {
  category: CategoryId;
  className?: string;
}) {
  const Icon = icons[category];
  return <Icon className={className} strokeWidth={1.2} aria-hidden="true" />;
}
