import GoogleSignIn from "@/components/GoogleSignIn";
import SignupForm from "@/components/forms/SignupForm";

const SignInPage = async () => {
  return (
    <main className="container bg-signIn bg-no-repeat bg-contain bg-center flex flex-col mx-auto mt-24">
      <header className="max-w-[50rem] mx-auto pt-24 mb-10b bg-white/80">
        <h3 className="text-2xl">
          The first thing we need to do is get you registered. If you have a
          valid Google Account, you can sign in using that account here.
        </h3>
        <GoogleSignIn />
      </header>

      {/* Otherwise divider */}
      <div className="w-[50rem] mx-auto flex justify-center items-center bg-white/80">
        <div className="w-1/2 bg-neutral-950 h-[0.025rem]"></div>
        <div className="text-neutral-700 mx-3 text-xl">Otherwise</div>
        <div className="w-1/2 bg-neutral-950 h-[0.025rem]"></div>
      </div>

      <section className="max-w-[50rem] pt-8 flex flex-col mx-auto bg-white/80">
        <h3 className="text-2xl">
          If you do not have a Google Account, please create an &quot;Earn After
          Reading&quot; account here.
        </h3>
        <SignupForm />
      </section>
    </main>
  );
};

export default SignInPage;
