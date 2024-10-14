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
        {/* <div className="w-full flex justify-center items-center mb-6">
          <div className="w-1/3 h-[0.025rem] bg-black"></div>
          <div className="text-3xl font-light px-8">How it Works</div>
          <div className="w-1/3 h-[0.025rem] bg-black"></div>
        </div> */}
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
          <ul className="list-decimal space-y-2 pl-5">
            <li>
              Positive Reinforcement
              <li className="list-disc ml-5">
                Our reward-based system encourages positive behavior and
                motivation.
              </li>
            </li>
            <li>
              Personalized Approach
              <ul className="list-disc">
                <li className="list-inside">
                  Tailor the app to your child&apos;s individual needs and
                  interests.
                </li>
              </ul>
            </li>
            <li>
              Habit Formation
              <ul className="list-disc">
                <li className="list-inside">
                  Develop essential life skills and routines for long-term
                  success.
                </li>
              </ul>
            </li>
            <li>
              Improved Parent-Child Relationships
              <ul className="list-disc">
                <li className="list-inside">
                  Strengthen your bond through shared goals and achievements.
                </li>
                <li className="list-inside">
                  Earn After Reading is a valuable tool for parents seeking to
                  empower their children and foster a love of learning.
                </li>
              </ul>
            </li>
          </ul>
        </p>
      </article>
    </main>
  );
}
