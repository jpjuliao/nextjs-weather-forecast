// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import requestData from '@/utils/requestData'

type Data = {
}

/**
 * Geocoder request handler
 * @param req NextApiRequest object
 * @param res NextApiResponse object
 * @returns object Properties
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address } = req.query // "4600+Silver+Hill+Rd%2C+Washington%2C+DC+20233"
  const host = "https://geocoding.geo.census.gov"
  const path = "/geocoder/locations/onelineaddress"
  const extras = "&benchmark=2020&format=json"
  const endpoint = host + path + "?address=" + address + extras
  const data = await requestData(endpoint,
    (data: any) => res.status(200).json(data.result),
    (error: any) => res.status(500).json(error)
  )
  return { props: { data } }
}
