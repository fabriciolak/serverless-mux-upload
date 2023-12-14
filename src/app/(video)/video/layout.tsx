import React from "react";

export default function VideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col p-8">{children}</div>
  );
}
