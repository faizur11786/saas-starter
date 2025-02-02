import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
  Section,
  Button,
  Tailwind,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  userFirstName: string;
  resetPasswordLink: string;
  companyName: string;
  supportEmail: string;
  supportPhone?: string;
}

export default function ResetPasswordEmail({
  userFirstName,
  resetPasswordLink,
  companyName,
  supportEmail,
  supportPhone,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto p-6 max-w-2xl">
            <Text className="text-2xl font-bold text-gray-900">
              Password Reset Request
            </Text>
            <Section className="mt-6">
              <Text className="text-gray-700">Hi {userFirstName},</Text>
              <Text className="text-gray-700 mt-4">
                We received a request to reset your password for your{" "}
                <strong>{companyName}</strong> account. Click the button below
                to create a new password:
              </Text>
              <Section className="mt-6 text-center">
                <Button
                  href={resetPasswordLink}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Reset Password
                </Button>
              </Section>
              <Text className="text-gray-700 mt-6">
                This link will expire in <strong>15 minutes</strong> for
                security reasons. If you don’t reset your password within this
                time, you’ll need to submit another request.
              </Text>
              <Text className="text-gray-700 mt-6">
                <strong>Didn’t request this change?</strong> If you didn’t
                initiate this password reset, please ignore this email or
                contact our support team immediately at{" "}
                <Link href={`mailto:${supportEmail}`} className="text-blue-600">
                  {supportEmail}
                </Link>
                {supportPhone && ` or ${supportPhone}.`}
              </Text>
            </Section>
            <Section className="mt-8 text-center text-gray-500 text-sm">
              <Text>
                Need help? Visit our{" "}
                <Link href="#" className="text-blue-600">
                  Help Center
                </Link>
              </Text>
              <Text>
                {companyName} |{" "}
                <Link href="#" className="text-blue-600">
                  Privacy Policy
                </Link>{" "}
                |{" "}
                <Link href="#" className="text-blue-600">
                  Terms of Service
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
