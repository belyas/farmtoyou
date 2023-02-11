import { useSession } from '@supabase/auth-helpers-react';

export default function ProtectedPage() {
  const session = useSession();

  if (!session) {
    return <div>Access denied!</div>;
  }

  return <div>You're allowed to see the page</div>;
}
