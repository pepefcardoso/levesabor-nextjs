"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-8 py-12 max-w-7xl min-h-[90vh] flex flex-col items-center">

      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center md:text-left w-full">
        Sobre Nós
      </h1>

      <div className="flex flex-col md:flex-row items-stretch md:space-x-12 w-full">

        <div className="flex-shrink-0 w-full md:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Team Working"
            width={800}
            height={800}
            className="rounded-lg object-cover h-full"
          />
        </div>

        <div className="text-gray-700 text-lg leading-relaxed mt-8 md:mt-0 md:w-1/2 flex flex-col justify-between">
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="mt-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p className="mt-6">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/contact"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg shadow-md"
            >
              Converse Conosco
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
