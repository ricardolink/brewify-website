export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-20 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto space-y-10">
        <header className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">Legal</p>
          <h1 className="text-3xl md:text-4xl font-medium">Privacy Policy</h1>
          <p className="text-xs text-brew-warm-gray">Last updated: March 2026</p>
        </header>

        <div className="space-y-8 text-sm text-brew-ivory/85 leading-relaxed">
          {[
            { title: "1. Information We Collect", body: "We collect information you provide directly — such as your name, email address, and responses to blend-building questions — as well as technical data like IP address, browser type, and pages visited." },
            { title: "2. How We Use Your Information", body: "We use your information to create and deliver your personalized blend, manage your account, send transactional emails, process earnings and payouts, and improve the platform. We do not sell your personal information to third parties." },
            { title: "3. Blend Data", body: "Your blend profile — including your answers, blend name, roast level, and flavor notes — may be displayed publicly on the site if you choose to add your blend to the public feed. You can opt out during the build process." },
            { title: "4. Cookies", body: "We use essential cookies to maintain your session and preferences (such as language selection). We do not use tracking or advertising cookies." },
            { title: "5. Data Retention", body: "We retain your account data for as long as your account is active or as needed to provide services. You may request deletion of your data at any time by contacting us." },
            { title: "6. Third-Party Services", body: "We use Vercel for hosting. Your data may be processed on servers in the United States. We do not share your personal data with advertising networks or data brokers." },
            { title: "7. Your Rights", body: "Depending on your location, you may have the right to access, correct, delete, or restrict the processing of your personal data. To exercise these rights, contact us at iam@brewifycoffee.com." },
            { title: "8. Children", body: "Brewify is not directed at children under 13. We do not knowingly collect data from children under 13." },
            { title: "9. Changes to This Policy", body: "We may update this Privacy Policy periodically. We will notify registered users of material changes by email." },
            { title: "10. Contact", body: "Questions about privacy? Email us at iam@brewifycoffee.com." },
          ].map((s) => (
            <section key={s.title} className="space-y-2">
              <h2 className="text-base font-medium text-brew-ivory">{s.title}</h2>
              <p>{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
