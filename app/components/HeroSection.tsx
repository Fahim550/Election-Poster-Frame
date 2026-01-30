import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 pattern-geometric opacity-60" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary-foreground/5 blur-3xl animate-pulse-slow" />
      <div
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto relative z-10 py-20 md:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
              সবার আগে
              <br />
              <span className="relative">
                বাংলাদেশ
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 7 Q 50 0, 100 4 T 200 3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-primary-foreground/40"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              জনগণের অধিকার, গণতন্ত্র এবং একটি শক্তিশালী বাংলাদেশের প্রত্যয়
            </p>

            <Link href="/photo-frame" className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 ">
              <Button className="group">
                আপনার ফ্রেম তৈরি করুন
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <p className="text-sm text-primary-foreground/60">
               আরও ফিচার শীঘ্রই আসছে
            </p>
          </div>

          {/* Right Content - Abstract Geometric Art */}
          <div className="hidden lg:flex items-center justify-center animate-slide-in-right">
            <div className="relative w-full max-w-md aspect-square">
              {/* Main Circle - Bangladesh inspired */}
              <div className="absolute inset-8 rounded-full border-4 border-primary-foreground/20 animate-float" />

              {/* Inner Circle - Representing Unity */}
              <div className="absolute inset-16 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary-foreground/20 animate-pulse-slow" />
              </div>

              {/* Decorative Lines */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary-foreground/30 to-transparent" />
              <div className="absolute top-0 left-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-primary-foreground/30 to-transparent" />

              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary-foreground/40" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary-foreground/40" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary-foreground/40" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary-foreground/40" />

              {/* Floating Elements */}
              <div
                className="absolute top-0 right-1/4 w-3 h-3 rounded-full bg-primary-foreground/60 animate-float"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute bottom-1/4 left-0 w-4 h-4 rounded-full bg-primary-foreground/40 animate-float"
                style={{ animationDelay: "2s" }}
              />
              <div
                className="absolute bottom-0 right-1/3 w-2 h-2 rounded-full bg-primary-foreground/80 animate-float"
                style={{ animationDelay: "3s" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
