import {
  LifeBuoy,
  MessageCircleHeart,
  Signature,
  Waypoints,
} from "lucide-react";
import Image from "next/image";
import React from "react";

export function HowItWorks() {
  return (
    <main
      id="how-it-works"
      className="p-6 w-full max-h-[46rem] overflow-y-auto"
    >
      <article className="pl-1 text-lg w-full">
        <p className="text-lg leading-6 font-[500] bg-neutral-700 text-white p-3 mb-6 rounded-lg">
          Earn After Reading is a unique app designed to help parents motivate
          their children to complete everyday tasks and learn essential life
          skills. Our app utilizes a reward-based system that encourages
          responsibility, accountability, and follows a structured routine.
        </p>
        <p className="flex flex-col w-full leading-6 py-3 border-b">
          <span className="flex w-full text-xl text-[#a85181] font-semibold">
            Create Tasks
          </span>{" "}
          With two options availabe, parents can easily add tasks, tailored to
          their child&apos;s specific needs and age. Examples include completing
          homework, taking a shower, brushing teeth, or helping with chores.
        </p>
        <p className="flex flex-col w-full leading-6 py-3 border-t border-b">
          <span className="flex w-full text-xl text-[#a85181] font-semibold">
            Set Deadlines
          </span>{" "}
          Assign due dates and deadlines for each task, ensuring your child
          understands the importance of timely completion.
        </p>
        <p className="flex flex-col w-full leading-6 py-3 border-t border-b">
          <span className="flex w-full text-xl text-[#a85181] font-semibold">
            Earn Points
          </span>{" "}
          As your child completes tasks on time, they will earn points that can
          be redeemed for rewards. These rewards can be customized to your
          child&apos;s interests, such as extra screen time, toys, or
          privileges.
        </p>
        <p className="flex flex-col w-full leading-6 py-3 border-t border-b">
          <span className="flex w-full text-xl text-[#a85181] font-semibold">
            Track Progress
          </span>{" "}
          Monitor your child&apos;s progress and identify areas where they may
          need additional support. Our app provides insights into task
          completion rates, deadlines met, and overall performance.
        </p>
        <p className="flex flex-col w-full leading-6 py-3 border-t border-b">
          <span className="flex w-full text-xl text-[#a85181] font-semibold">
            Build Habits
          </span>{" "}
          Earn After Reading helps children develop healthy habits and routines,
          making it easier for them to stay organized and focused.
        </p>
        <p className="flex flex-col w-full leading-6 py-3 border-t">
          <span className="flex w-full text-xl text-[#a85181] font-semibold">
            Key Benefits
          </span>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            <div className="flex flex-col py-6 px-8 rounded-lg bg-indigo-300/30">
              <h3 className="text-center text-2xl font-[500]">
                Positive Reinforcement
              </h3>
              <div className="w-full flex justify-center my-2">
                <MessageCircleHeart className="w-24 h-24 text-zinc-400 my-3" />
              </div>
              <p className="text-base font-[500] text-neutral-700">
                Our reward-based system encourages positive behavior and
                motivation.
              </p>
            </div>
            <div className="flex flex-col py-6 px-8 rounded-lg bg-indigo-300/30">
              <h3 className="text-center text-2xl font-[500]">
                Personalized Approach
              </h3>
              <div className="w-full flex justify-center my-2">
                <Signature className="w-24 h-24 text-zinc-400 my-3" />
              </div>
              <p className="text-base font-[500] text-neutral-700">
                Tailor the app to your child&apos;s individual needs and
                interests.
              </p>
            </div>
            <div className="flex flex-col py-6 px-8 rounded-lg bg-indigo-300/30">
              <h3 className="text-center text-2xl font-[500]">
                Habit Development
              </h3>
              <div className="w-full flex justify-center my-2">
                <LifeBuoy className="w-24 h-24 text-zinc-400 my-3" />
              </div>
              <p className="text-base font-[500] text-neutral-700">
                Develop essential life skills and routines for long-term
                success.
              </p>
            </div>
            <div className="flex flex-col py-6 px-8 rounded-lg bg-indigo-300/30">
              <h3 className="text-center text-2xl font-[500]">
                Parent-Child Relationships
              </h3>
              <div className="w-full flex justify-center my-2">
                <Waypoints className="w-24 h-24 text-zinc-400 my-3" />
              </div>
              <p className="text-base font-[500] text-neutral-700">
                Strengthen your bond through shared goals and achievements.
              </p>
            </div>
          </div>
          <p className="flex justify-center p-3 bg-neutral-700 text-white rounded-lg">
            Earn After Reading is a valuable tool for parents seeking to empower
            their children and foster a love of learning.
          </p>
        </p>
      </article>
    </main>
  );
}
