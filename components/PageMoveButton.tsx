"use client";

import { useRouter } from "next/navigation";

interface PageMoveButtonProps {
  href: "/" | "/test" | "/result";
  title: string;
}

export default function PageMoveButton({ href, title }: PageMoveButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <button onClick={handleClick} className="w-30 h-10 bg-orange-300">
      {title}
    </button>
  );
}
