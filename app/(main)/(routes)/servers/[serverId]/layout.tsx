import React from "react";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServerSidebar } from "@/components/server/server-sidebar";

export default async function ServerIdLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>; // 👈 params is a Promise now
}) {
  const { serverId } = await params; // 👈 await it

  const profile = await currentProfile();

  if (!profile) {
    redirect("/sign-in"); // or your Clerk sign-in URL
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (!server) return redirect("/");

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}
