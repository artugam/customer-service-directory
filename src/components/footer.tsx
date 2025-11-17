import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Customer Service Directory</h3>
            <p className="text-sm text-muted-foreground">
              Compare and choose the best customer service platform for your business.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Platform Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/find-platform"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Platform Finder
                </Link>
              </li>
              <li>
                <Link
                  href="/#platforms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Browse All Platforms
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Compare Platforms
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-customer-service"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  AI Solutions Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} Customer Service Directory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
