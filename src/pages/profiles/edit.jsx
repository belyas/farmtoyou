import UpdateProfileForm from '@/components/profiles/updateProfileForm';
import Account from '@/components/Account';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';

const getServerSideProps = async ctx => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    props: {
      session: session,
    },
  };
};

export default function EditProfile({ session }) {
  return (
    <>
      <UpdateProfileForm />
      <Account session={session} />
    </>
  );
}
