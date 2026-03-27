import Layout from "@/components/Layout";

const PrivacyPolicy = () => (
  <Layout>
    <section className="py-20">
      <div className="mx-auto w-[95%] max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground mb-6">Privacy Policy</h1>

        <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
          <p>
            This Privacy Policy explains how dev.portfolio collects, uses, and protects information.
          </p>

          <div>
            <h2 className="font-semibold text-foreground mb-2">1. Information We Collect</h2>
            <p>
              We may collect your email address when you request an OTP for admin access/login.
              OTP codes are sent via email and used only to authenticate you for the dashboard.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-foreground mb-2">2. How We Use Your Information</h2>
            <p>
              We use your email to deliver OTP codes and to authenticate access to the dashboard.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-foreground mb-2">3. Third-Party Services</h2>
            <p>
              Email delivery is handled by an email provider (SMTP). If you enable other services later,
              they should be listed here.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-foreground mb-2">4. Data Security</h2>
            <p>
              We take reasonable measures to protect information from unauthorized access.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-foreground mb-2">5. Contact</h2>
            <p>
              For questions about this policy, contact{" "}
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

export default PrivacyPolicy;