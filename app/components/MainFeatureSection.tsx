import { Button } from "@/components/ui/button";
import { ArrowRight, ImageIcon, Sparkles } from "lucide-react";
import Link from "next/link";

const MainFeatureSection = () => {
  return (
    <section id="frame-builder" className="py-20 md:py-28 bg-gradient-soft">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            বর্তমানে চালু সেবা
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            আমাদের প্রধান ফিচার
          </h2>
        </div>

        {/* Main Feature Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50">
            {/* Card Glow Effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            
            <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left - Icon & Visual */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  {/* Background Shape */}
                  <div className="absolute inset-0 bg-gradient-hero rounded-2xl rotate-3 scale-105 opacity-10" />
                  
                  {/* Icon Container */}
                  <div className="relative bg-secondary rounded-2xl p-12 md:p-16">
                    <div className="absolute top-4 right-4">
                      <Sparkles className="w-6 h-6 text-accent animate-pulse-slow" />
                    </div>
                    <ImageIcon className="w-20 h-20 md:w-28 md:h-28 text-primary" strokeWidth={1.5} />
                    
                    {/* Decorative Frame Corners */}
                    <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" />
                    <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div className="flex flex-col justify-center text-center md:text-left space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    Photo Frame Builder
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    আপনার ছবি দিয়ে <span className="text-primary font-semibold">"সবার আগে বাংলাদেশ"</span> বার্তা ছড়িয়ে দিন। 
                    সামাজিক মাধ্যমে শেয়ার করুন এবং আন্দোলনে সংযুক্ত হন।
                  </p>
                </div>

                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3 justify-center md:justify-start">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    সহজে ফটো আপলোড করুন
                  </li>
                  <li className="flex items-center gap-3 justify-center md:justify-start">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    একাধিক ফ্রেম ডিজাইন
                  </li>
                  <li className="flex items-center gap-3 justify-center md:justify-start">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    তাৎক্ষণিক ডাউনলোড ও শেয়ার
                  </li>
                </ul>

                <Link href="/photo-frame" className="pt-4">
                  <Button size="lg" className="group w-full md:w-auto">
                    ফ্রেম তৈরি করুন
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainFeatureSection;
