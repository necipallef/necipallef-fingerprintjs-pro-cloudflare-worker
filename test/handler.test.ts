import * as http from 'http'
import { RequestOptions } from 'http'

function makeRequest(method: string, path: string) {
  const requestOptions: RequestOptions = {
    protocol: 'http:',
    hostname: 'localhost',
    port: 8787,
    method: 'POST',
    path,
  }

  return new Promise((resolve) => {
    http
      .request(requestOptions, (response) => {
        let data = ''
        response.on('data', (_data) => (data += _data))
        response.on('end', () => resolve(data))
      })
      .end()
  })
}

test('GET to / should be unmatched path', async () => {
  const expected = '{"message":"An error occurred with Cloudflare worker.","reason":"unmatched path /"}'
  await makeRequest('GET', '/').then((res) => expect(res).toEqual(expected))
})

test('GET to /abcd/abcd', async () => {
  const expected = 'script'
  await makeRequest('GET', '/abcd/abcd').then((res) => expect(res).toEqual(expected))
})
