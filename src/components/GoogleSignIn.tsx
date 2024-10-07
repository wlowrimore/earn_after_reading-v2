import Image from "next/image";
import GoogleLogo from "../../public/logos/google.webp";
import { signIn } from "../../auth";
import { redirect } from "next/dist/server/api-utils";

const GoogleSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
    >
      <button
        type="submit"
        className="my-8 py-2 pl-3 pr-4 bg-neutral-800 shadow-md shadow-neutral-700 hover:bg-neutral-950 transition duration-300 rounded-full border border-neutral-300 text-white text-lg flex items-center gap-2"
      >
        <Image src={GoogleLogo} alt="google logo" width={24} height={24} />
        Sign in with Google
      </button>
    </form>
  );
};

export default GoogleSignIn;
