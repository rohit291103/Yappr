import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface ServerIdPageProps {
  params: Promise<{
    serverId: string;
  }>;
}

export default async function ServerIdPage({ params }: ServerIdPageProps) {
  // Await the params promise
  const { serverId } = await params;
  const profile = await currentProfile();

  if (!profile) {
    redirect("/");
    return null;
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  // If server doesn't exist or user isn't a member
  if (!server) {
    redirect("/");
    return null;
  }

  const initialChannel = server.channels[0];

  // If general channel doesn't exist, try to get the first channel
  if (!initialChannel || initialChannel.name !== "general") {
    // Fetch server again with all channels
    const serverWithChannels = await db.server.findUnique({
      where: { id: serverId },
      include: {
        channels: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    const firstChannel = serverWithChannels?.channels[0];
    
    if (firstChannel) {
      redirect(`/servers/${serverId}/channels/${firstChannel.id}`);
      return null;
    } else {
      // No channels available - handle appropriately
      redirect("/");
      return null;
    }
  }

  redirect(`/servers/${serverId}/channels/${initialChannel.id}`);
  return null;
}