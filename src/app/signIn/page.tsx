import GoogleSignIn from "@/components/GoogleSignIn";
import SignupForm from "@/components/forms/SignupForm";
import Image from "next/image";
import SiteLogo from "../../../public/logos/siteLogo.webp";

const SignInPage = async () => {
  return (
    <div className="bg-neutral-800 flex flex-col items-center">
      <main className="container h-screen justify-center items-center flex flex-col mx-auto">
        <header className="max-w-[40rem] flex flex-col items-center justify-center pt-8 px-20 mx-auto bg-white rounded-lg">
          <h3 className="text-2xl font-light text-black">
            Sign in using your{" "}
            <span className="font-normal bg-gradient-to-r from-blue-600 via-amber-500 to-green-500 bg-clip-text text-transparent">
              Google
            </span>{" "}
            Account.
          </h3>
          <GoogleSignIn />
        </header>

        {/* Otherwise divider */}
        <div className="w-[38rem] max-w-[40rem] px-10 mx-auto flex justify-center items-center">
          <div className="w-1/2 bg-indigo-200/70 h-[0.02rem]"></div>
          <div className="text-indigo-100 tracking-wider mx-3 text-sm py-4">
            or
          </div>
          <div className="w-1/2 bg-indigo-200/70 h-[0.02rem]"></div>
        </div>

        <section className="max-w-[40rem] px-10 pb-6 flex flex-col mx-auto bg-white rounded-lg">
          <h3 className="text-2xl pt-6 font-light text-black">
            Create a new{" "}
            <span className="text-purple-500 font-normal">
              Earn After Reading
            </span>{" "}
            account.
          </h3>
          <div className="w-full flex justify-center pt-4">
            <Image
              src={SiteLogo}
              alt="site logo"
              width={500}
              height={500}
              className="rounded-2xl border-2 border-purple-300 shadow-md shadow-neutral-700 w-24 h-24 p-2 bg-neutral-800"
            />
          </div>

          <SignupForm />
        </section>
      </main>
    </div>
  );
};

export default SignInPage;
