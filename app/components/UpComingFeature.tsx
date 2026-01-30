import { Clock, FolderOpen, Globe, Lock, Users } from "lucide-react";

const upcomingFeatures = [
  {
    icon: Users,
    title: "Volunteer Registration",
    titleBn: "স্বেচ্ছাসেবক নিবন্ধন",
    description: "দেশব্যাপী স্বেচ্ছাসেবক নেটওয়ার্কে যুক্ত হন",
  },
  {
    icon: Globe,
    title: "Supporter Wall",
    titleBn: "সমর্থক দেয়াল",
    description: "সকল সমর্থকদের একত্রিত প্ল্যাটফর্ম",
  },
  {
    icon: FolderOpen,
    title: "Media Kit",
    titleBn: "মিডিয়া কিট",
    description: "অফিসিয়াল ব্র্যান্ডিং ও মিডিয়া রিসোর্স",
  },
];

const UpcomingFeaturesSection = () => {
  return (
    <section id="upcoming" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Clock className="w-4 h-4" />
            শীঘ্রই আসছে
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            আসন্ন ফিচারসমূহ
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            আমরা নিরলসভাবে কাজ করছি আরও শক্তিশালী টুলস নিয়ে আসতে
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {upcomingFeatures.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-muted/50 rounded-2xl p-8 border border-border/50 transition-all duration-300 hover:shadow-lg"
            >
              {/* Coming Soon Badge */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                  <Lock className="w-3 h-3" />
                  শীঘ্রই
                </span>
              </div>

              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-muted border border-border">
                  <feature.icon className="w-7 h-7 text-muted-foreground" strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground/70">
                  {feature.titleBn}
                </h3>
                <p className="text-sm text-muted-foreground/80">
                  {feature.description}
                </p>
              </div>

              {/* Disabled Overlay Pattern */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-muted/30 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Newsletter Hint */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            নতুন ফিচার লঞ্চ হলে জানতে আমাদের সাথে থাকুন
          </p>
        </div>
      </div>
    </section>
  );
};

export default UpcomingFeaturesSection;
