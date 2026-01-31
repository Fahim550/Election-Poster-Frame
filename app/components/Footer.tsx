const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-6 md:py-8">
      <div className="container mx-auto">
        <div className="text-center space-y-2">
          {/* Slogan */}
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold">
              সবার আগে বাংলাদেশ
            </h3>
            <div className="w-16 h-0.5 bg-primary-foreground/30 mx-auto" />
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/70">
            <a href="#frame-builder" className="hover:text-primary-foreground transition-colors">
              ফ্রেম তৈরি
            </a>
            <a href="#upcoming" className="hover:text-primary-foreground transition-colors">
              আসন্ন ফিচার
            </a>
            <a href="#values" className="hover:text-primary-foreground transition-colors">
              আমাদের লক্ষ্য
            </a>
          </div>

          {/* Disclaimer */}
          <div className="pt-6 border-t border-primary-foreground/10">
            <p className="text-xs text-primary-foreground/50 max-w-lg mx-auto leading-relaxed">
              এই প্ল্যাটফর্মটি বাংলাদেশ জাতীয়তাবাদী দলের (BNP) সমর্থকদের জন্য তৈরি। 
              সকল তথ্য ও কনটেন্ট শুধুমাত্র তথ্যমূলক উদ্দেশ্যে প্রদান করা হয়েছে।
            </p>
          </div>

          {/* Copyright */}
          <p className="text-xs text-primary-foreground/40 pt-4">
            © {new Date().getFullYear()} সবার আগে বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
