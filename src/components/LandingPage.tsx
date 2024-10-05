"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HeroImage from "../../public/images/heroImage.webp";

const LandingPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = () => {
    if (!session) {
      router.push("/signIn");
    } else {
      router.push("/dashboard");
    }
  };

  const firstName = session?.user?.name?.split(" ")[0];

  return (
    <main className="my-12">
      <section className="flex items-center gap-20">
        {!session ? (
          <article className="w-1/2 text-2xl tracking-wide">
            <h1 className="uppercase text-5xl text-neutral-700 font-semibold mb-3">
              Unlock Fun Through Responsibility
            </h1>
            <p>
              Transform everyday chores into exciting opportunities with{" "}
              <span className="text-[#a85181] font-semibold">
                Earn After Reading
              </span>{" "}
              – the app that makes responsibility rewarding for kids. By
              completing tasks like homework, room cleanup, or helping around
              the house, children earn valuable tokens they can redeem for what
              they love most: extra gaming time, choice movies, or even pushing
              bedtime back a bit. It&apos;s not just about getting things done –
              it&apos;s about teaching the value of earning privileges while
              making the journey fun and engaging for the whole family.
            </p>
            <button
              onClick={handleClick}
              className="bg-[#6c2a4d] uppercase text-white px-6 py-3 rounded-lg mt-4 hover:bg-neutral-950 transition duration-300"
            >
              Let&apos;s go!
            </button>
          </article>
        ) : (
          <article className="w-1/2 text-2xl tracking-wide">
            <h1 className="uppercase text-5xl text-neutral-700 font-semibold mb-3">
              Welcome back, {firstName}!
            </h1>
            <p>
              Let&apos;s keep going with your tasks and get your kids earning
              some cool perks. Since you&apos;re already logged in, let&apos;s
              skip the boring part and just pick up where we left off!
            </p>
            <button
              onClick={handleClick}
              className="bg-[#6c2a4d] uppercase text-white px-6 py-3 rounded-lg mt-4 hover:bg-neutral-950 transition duration-300"
            >
              Continue
            </button>
          </article>
        )}
        <div className="w-1/2">
          <Image src={HeroImage} alt="Hero Image" width={550} height={550} />
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
