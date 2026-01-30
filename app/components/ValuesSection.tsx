import { TrendingUp, Users, Vote } from "lucide-react";

const values = [
  {
    icon: Vote,
    title: "গণতন্ত্র",
    description: "জনগণের ভোটাধিকার ও মতপ্রকাশের স্বাধীনতা নিশ্চিত করা আমাদের অঙ্গীকার",
  },
  {
    icon: Users,
    title: "মানুষের অধিকার",
    description: "প্রতিটি নাগরিকের মৌলিক অধিকার রক্ষা এবং সামাজিক ন্যায়বিচার প্রতিষ্ঠা",
  },
  {
    icon: TrendingUp,
    title: "জাতীয় উন্নয়ন",
    description: "অর্থনৈতিক প্রগতি ও টেকসই উন্নয়নের মাধ্যমে সমৃদ্ধ বাংলাদেশ গড়ে তোলা",
  },
];

const ValuesSection = () => {
  return (
    <section id="values" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            আমাদের লক্ষ্য
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            মূল্যবোধ ও দর্শন
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            একটি সুন্দর, গণতান্ত্রিক এবং সমৃদ্ধ বাংলাদেশের স্বপ্ন নিয়ে এগিয়ে চলেছি
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="group text-center space-y-4"
            >
              {/* Icon Container */}
              <div className="relative inline-flex mx-auto">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/30 transition-colors" />
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-hero shadow-lg">
                  <value.icon className="w-9 h-9 text-primary-foreground" strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3 pt-2">
                <h3 className="text-2xl font-bold text-foreground">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Line */}
        <div className="mt-16 flex justify-center">
          <div className="w-24 h-1 rounded-full bg-gradient-hero opacity-50" />
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
