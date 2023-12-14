import VideoPlayer from "@/components/video-player";
import { prisma } from "@/lib/prisma";

interface VideoProps {
  params: {
    id: string;
  };
}

export default async function Video({ params }: VideoProps) {
  const { id } = params;

  const response = await prisma.video.findFirstOrThrow({
    where: {
      id,
    },
  });

  const videoURL = `https://stream.mux.com/xnKS45kHuHBG4iyn401f1dOxQrHjCnCJq300Wvk7l00soY.m3u8`;

  return (
    <div className="flex-1">
      <h1>Video</h1>

      <div className="w-[720px] h-full flex items-center justify-center">
        <video src={videoURL} controls className="aspect-video w-full"></video>
        {videoURL}

        <VideoPlayer />
      </div>
    </div>
  );
}
