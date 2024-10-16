"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export interface CaseStudyProps {
  id: string;
  title: string;
  imageUrl: string;
  comment: string;
}

export function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyProps[]>([]);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const res = await fetch("/js/case-studies.js");
        const data = await res.json();
        setCaseStudies(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCaseStudies();
  }, []);

  return (
    <main
      id="case-studies"
      className="p-6 w-full max-h-[46rem] overflow-y-auto"
    >
      {caseStudies.map((feature, index) => (
        <div
          key={feature.id}
          className={`
            flex ${
              index % 2 === 1 ? "flex-row-reverse" : "flex-row"
            } w-full items-center bg-neutral-700 border border-neutral-800 rounded-lg mb-8
          `}
        >
          <div className="w-1/4">
            <Image
              src={feature.imageUrl}
              alt={feature.title}
              width={500}
              height={500}
              className={`object-cover ${
                index % 2 === 1 ? "rounded-r-lg" : "rounded-l-lg"
              }`}
            />
          </div>
          <div className="w-full px-4 bg-neutral-700 text-white">
            <h1 className="text-2xl font-[500]">{feature.title}</h1>
            <article className="text-lg font-[500] mt-2">
              &quot;{feature.comment}&quot;
            </article>
          </div>
        </div>
      ))}
    </main>
  );
}
