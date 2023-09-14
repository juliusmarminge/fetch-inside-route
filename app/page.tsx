"use client";

export default function Home() {
  return (
    <div>
      <button
        onClick={async () => {
          await fetch("/api?action=upload", { method: "POST" });
        }}
      >
        POST to backend
      </button>
    </div>
  );
}
