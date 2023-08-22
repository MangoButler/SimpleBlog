import { getSession } from "next-auth/react";
import PasswordChangeForm from "../components/profile/PasswordChangeForm";
import ProfileSection from "../components/profile/ProfileSection";

function ProfilePage(props) {
  return <ProfileSection />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
