import { prisma } from '@/lib/prisma'
import Mux from '@mux/mux-node'

export async function POST() {
  const { Video } = new Mux()

  const upload = await Video.Uploads.create({
    new_asset_settings: {
      playback_policy: 'public',
      max_resolution_tier: '1080p',
      encoding_tier: 'baseline',
    },
    cors_origin: '*',
  })

  if (!upload) {
    return Response.json({
      message: 'Erro ao criar o upload do vídeo',
      status: 500,
    },{
      status: 500,
    })
  }

  await prisma.video.create({
    data: {
      path: `/video/${upload.id}`,
      videoId: upload.id
    }
  })

  return Response.json({
    url: upload.url,
    id: upload.id,
  },{
    status: 200,
  })
}