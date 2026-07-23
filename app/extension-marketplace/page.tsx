import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import ExtensionUploadForm from '../components/ExtensionUploadForm';

const THIS_PAGE_PATH = '/extension-marketplace';

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    // Not signed in: bounce to /login, tagged with where to come back to.
    // If they're already signed in, we skip /login entirely and show the
    // form directly below — no unnecessary redirect round-trip.
    redirect(`/login?redirect_url=${encodeURIComponent(THIS_PAGE_PATH)}`);
  }

  return <ExtensionUploadForm />;
};

export default Page;