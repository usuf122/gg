import React, { useState, useCallback, useEffect } from "react";
import "@/App.css";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { DuaCard } from "@/components/DuaCard";
import { duasData } from "@/data/duasData";

function App() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const scrollTo = useCallback((index) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <div className="app-container min-h-screen bg-cream">
      <Toaster position="top-center" />
      
      {/* Background Pattern Overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none bg-pattern" />
      
      {/* Header */}
      <header className="relative pt-8 sm:pt-12 pb-6 sm:pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald/10 flex items-center justify-center border-2 border-gold/30">
              <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-emerald" />
            </div>
          </div>
          <h1 
            data-testid="app-title"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-emerald mb-3"
          >
            Сборник Дуа
          </h1>
          <p className="font-body text-secondary text-base sm:text-lg max-w-2xl mx-auto">
            Достоверные мольбы из Корана и Сунны с транскрипцией и переводом
          </p>
        </div>
      </header>

      {/* Main Carousel */}
      <main className="relative px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: false,
            }}
            className="w-full"
            data-testid="dua-carousel"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {duasData.map((dua, index) => (
                <CarouselItem 
                  key={dua.id} 
                  className="pl-2 md:pl-4"
                >
                  <DuaCard 
                    dua={dua} 
                    cardNumber={index + 1} 
                    totalCards={duasData.length}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              data-testid="carousel-prev-btn"
              className="h-12 w-12 rounded-full border-2 border-emerald/20 bg-white hover:bg-emerald hover:text-white hover:border-emerald disabled:opacity-40 transition-all duration-300 shadow-lg"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2" data-testid="carousel-dots">
              {duasData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  data-testid={`carousel-dot-${index}`}
                  className={`transition-all duration-300 rounded-full ${
                    current === index
                      ? "w-8 h-3 bg-gold shadow-md"
                      : "w-3 h-3 bg-sage/40 hover:bg-sage/60"
                  }`}
                  aria-label={`Перейти к дуа ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={!canScrollNext}
              data-testid="carousel-next-btn"
              className="h-12 w-12 rounded-full border-2 border-emerald/20 bg-white hover:bg-emerald hover:text-white hover:border-emerald disabled:opacity-40 transition-all duration-300 shadow-lg"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Card Counter */}
          <p 
            data-testid="card-counter"
            className="text-center mt-4 font-body text-secondary"
          >
            {current + 1} из {duasData.length}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative py-6 px-4 border-t border-subtle">
        <p className="text-center text-sm text-secondary/70 font-body">
          Да примет Аллах наши мольбы
        </p>
      </footer>
    </div>
  );
}

export default App;
