export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-20 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto space-y-10">
        <header className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">Legal</p>
          <h1 className="text-3xl md:text-4xl font-medium">Accessibility Statement</h1>
          <p className="text-xs text-brew-warm-gray">Last updated: March 2026</p>
        </header>

        <div className="space-y-8 text-sm text-brew-ivory/85 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-medium text-brew-ivory">Our Commitment</h2>
            <p>Brewify Coffee is committed to making our website accessible to all users, regardless of ability or technology. We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA.</p>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-medium text-brew-ivory">Measures We Take</h2>
            <ul className="space-y-2 list-none pl-0">
              {[
                "Semantic HTML for clear document structure",
                "Sufficient color contrast ratios across all text elements",
                "Keyboard navigability throughout the site",
                "Descriptive alt text on all meaningful images",
                "Clear focus indicators for keyboard users",
                "Responsive design that works across screen sizes and zoom levels",
                "Forms with clearly labeled fields and accessible error messages",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-brew-warm-gray mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-medium text-brew-ivory">Known Limitations</h2>
            <p>While we strive for full accessibility, some elements may not yet meet all WCAG 2.1 AA criteria. We are actively working to identify and resolve these gaps.</p>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-medium text-brew-ivory">Feedback & Contact</h2>
            <p>If you experience any accessibility barrier or have feedback, please contact us:</p>
            <p>
              <a href="mailto:iam@brewifycoffee.com" className="text-brew-ivory underline underline-offset-2 hover:text-brew-warm-gray transition-colors">
                iam@brewifycoffee.com
              </a>
            </p>
            <p>We aim to respond to accessibility feedback within 3 business days.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
