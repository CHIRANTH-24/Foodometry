import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home({ onNext }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to RecipeMaster!</h1>
      <p className="mb-6">Find recipes tailored to your preferences.</p>
      <Link href="/onboarding">
        <Button onClick={onNext}>Get Started</Button>
      </Link>
    </div>
  );
}
