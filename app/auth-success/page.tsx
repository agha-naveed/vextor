import { currentUser } from '@clerk/nextjs/server';
import RedirectHandler from './RedirectHandler';

export default async function AuthSuccessPage() {
  // Use currentUser() instead of auth() to get profile details
  const user = await currentUser(); 
  
  const userId = user?.id || null;
  const firstName = user?.firstName ?? 'Developer'; // Fallback if no name exists

  return <RedirectHandler userId={userId} firstName={firstName} />;
}