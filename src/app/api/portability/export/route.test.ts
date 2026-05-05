import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { GET } from './route'
import { buildPortableExportFilename } from '@/lib/server/portability/export'

describe('GET /api/portability/export', () => {
  it('returns a collision-resistant attachment filename for downloads', async () => {
    const response = await GET(new Request('http://local/api/portability/export?download=true'))
    assert.equal(response.status, 200)
    assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8')
    const disposition = response.headers.get('content-disposition') || ''
    assert.match(disposition, /^attachment; filename="swarmclaw-export-\d{8}-\d{6}\d{3}Z\.json"$/)
    const body = await response.json()
    assert.equal(disposition, `attachment; filename="${buildPortableExportFilename(body)}"`)
  })
})
