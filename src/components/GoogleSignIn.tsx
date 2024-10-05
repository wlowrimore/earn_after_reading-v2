import Image from "next/image";
import GoogleLogo from "../../public/logos/google.webp";
import { signIn } from "next-auth/react";

const GoogleSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { callbackUrl: "/dashboard" });
      }}
    >
      <button
        type="submit"
        className="my-8 py-3 pl-3 pr-4 bg-neutral-700 hover:bg-neutral-950 transition duration-300 rounded-full border border-neutral-300 text-white text-xl flex items-center gap-1.5"
      >
        <Image src={GoogleLogo} alt="google logo" width={24} height={24} />
        Sign in with Google
      </button>
    </form>
  );
};

export default GoogleSignIn;
