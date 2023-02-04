// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const host = "https://api.weather.gov"
  const path = "/points/"
  const points = "39.7456,-97.0892"
  const endpoint = host + path + points
  const data = await requestData(endpoint,
    (data: any) => res.status(200).json(data),
    (error: any) => res.status(500).json(error)
  )
  return { props: { data } }
}

async function requestData(endpoint: string, success: Function, failure: Function): Promise<Data> {
  return fetch(endpoint)
    .then(response => {
      if (!response.ok) Promise.reject(response);
      return response.json()
    })
    .then(data => success(data.properties))
    .catch(error => failure(error.message))
}
