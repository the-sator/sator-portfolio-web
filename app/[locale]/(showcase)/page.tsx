import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4">
      <h1 className="text-2xl">An awesome website is coming soon</h1>
      <Link
        href="/admin-panel"
        className="text-blue-500 underline hover:text-blue-600"
      >
        Visit admin
      </Link>
    </div>
  );
}
