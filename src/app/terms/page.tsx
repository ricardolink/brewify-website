export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-20 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto space-y-10">
        <header className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">Legal</p>
          <h1 className="text-3xl md:text-4xl font-medium">Terms of Use</h1>
          <p className="text-xs text-brew-warm-gray">Last updated: March 2026</p>
        </header>

        <div className="space-y-8 text-sm text-brew-ivory/85 leading-relaxed">
          {[
            { title: "1. Acceptance of Terms", body: "By accessing or using Brewify Coffee (Brewify, we, us), you agree to be bound by these Terms of Use. If you do not agree, please do not use the site or services." },
            { title: "2. Use of the Site", body: "You may browse Brewify for personal, non-commercial purposes. You agree not to copy, scrape, resell, or exploit any content or functionality of the platform without written permission." },
            { title: "3. Accounts and Access", body: "Certain features — including Build Your Coffee and THE 100 membership — require an account or verified invite code. You are responsible for maintaining the confidentiality of your credentials." },
            { title: "4. THE 100 Membership", body: "Purchasing a founding membership grants you the rights described on the Membership page, including a permanent blend slot, earnings on orders of your blend, and invite tokens. These rights are non-refundable once your blend is created. Blend ownership may be transferred to another user." },
            { title: "5. Earnings and Payouts", body: "Members earn $1 per bag sold of their blend. Earnings may be applied as store credit at any time. Cash payouts require a minimum balance of $100 and are processed on a monthly basis upon request." },
            { title: "6. Intellectual Property", body: "Blend names, stories, and profiles created through Brewify are associated with your account but may appear publicly on the site. Brewify retains the right to display your blend as part of the platform." },
            { title: "7. Prohibited Conduct", body: "You agree not to: use the platform for any unlawful purpose; attempt to gain unauthorized access to any part of the site; submit false or misleading information; or interfere with the security of the platform." },
            { title: "8. Limitation of Liability", body: "Brewify is provided \"as is.\" We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform, to the maximum extent permitted by law." },
            { title: "9. Changes to Terms", body: "We may update these Terms at any time. Continued use of the site after changes constitutes acceptance of the revised Terms." },
            { title: "10. Contact", body: "Questions about these Terms? Email us at iam@brewifycoffee.com." },
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
