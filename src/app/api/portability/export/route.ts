import { NextResponse } from 'next/server'
import { buildPortableExportFilename, exportConfig } from '@/lib/server/portability/export'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const manifest = exportConfig()
  const { searchParams } = new URL(req.url)
  if (searchParams.get('download') === 'true') {
    return new NextResponse(JSON.stringify(manifest, null, 2), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'content-disposition': `attachment; filename="${buildPortableExportFilename(manifest)}"`,
      },
    })
  }
  return NextResponse.json(manifest)
}
