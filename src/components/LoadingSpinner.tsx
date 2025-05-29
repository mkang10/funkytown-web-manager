import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">
      <Image
        src="/assets/logo.avif"
        alt="Funkytown Logo"
        width={80}
        height={80}
        className="animate-spin-slow h-20 w-20 rounded-xl object-cover shadow-lg"
      />
    </div>
  );
}
