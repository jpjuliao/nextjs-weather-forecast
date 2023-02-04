// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const host = "https://geocoding.geo.census.gov"
  const path = "/geocoder/locations/onelineaddress"
  const address = "4600+Silver+Hill+Rd%2C+Washington%2C+DC+20233"
  const extras = "&benchmark=2020&format=json"
  const endpoint = host + path + "?address=" + address + extras
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
    .then(data => success(data.result))
    .catch(error => failure(error.message))
}
