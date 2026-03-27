import Layout from "@/components/Layout";

const TermsOfService = () => (
  <Layout>
    <section className="py-20">
      <div className="mx-auto w-[95%] max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground mb-6">Terms of Service</h1>

        <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
          <p>
            These Terms of Service govern use of dev.portfolio and its admin dashboard.
          </p>

          <div>
            <h2 className="font-semibold text-foreground mb-2">1. Acceptance</h2>
            <p>
              By using the website, you agree to these terms.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-foreground mb-2">2. Admin Access</h2>
            <p>
              Admin access requires OTP verification using an email address.
              Access may be limited to a configured email address (ADMIN_EMAIL).
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-foreground mb-2">3. No Warranty</h2>
            <p>
              The service is provided “as is” without warranties of any kind.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-foreground mb-2">4. Contact</h2>
            <p>
              For questions about these terms, contact{" "}
              <span className="text-foreground font-medium">hello@developer.com</span>.
            </p>
          </div>

          <p className="text-xs">
            Note: This is a template. Replace with your real details and legal requirements.
          </p>
        </div>
      </div>
    </section>
  </Layout>
);

export default TermsOfService;