"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to admin dashboard immediately
    router.push('/admin');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#081028] flex items-center justify-center">
      <div className="text-center">
        <div className="text-2xl font-bold text-white mb-4">
          <span className="text-[#E100FF]">MUS</span>
          <span className="text-[#C7C7C7]">EEDLE</span>
          <span className="text-xs align-super">®</span>
        </div>
        <div className="text-gray-400">Redirecting to dashboard...</div>
      </div>
    </div>
  );
}
