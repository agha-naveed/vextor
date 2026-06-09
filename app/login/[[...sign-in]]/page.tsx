import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10vh' }}>
      {/* forceRedirectUrl ensures the user always lands on the deep-link page */}
      <SignIn forceRedirectUrl="/auth-success" /> 
    </div>
  );
}