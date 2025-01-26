"use client";
import Image from "next/image";
import { useState } from "react";
import { CardWithForm } from "@/app/components/Card";
export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Top card */}
      <div className="mx-20 mt-8 p-8 bg-gray-200 shadow-lg rounded-lg w-full    ">
        {/* Content for the top container */}
        <h1 className="text-3xl text-center">Large Container at the Top</h1>
        <p className="text-center mt-4">You can add more content or components here.</p>
      </div>
      {/* 2x2 grid of cards */}
      <div className="grid grid-cols-2 gap-4">
        <CardWithForm />
        <CardWithForm />
        <CardWithForm />
        <CardWithForm />
      </div>
    </div>
  );
}