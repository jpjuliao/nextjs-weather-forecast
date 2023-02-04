// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import requestData from '@/utils/requestData'

type Data = {
}

/**
 * Weather request handler
 * @param req NextApiRequest object
 * @param res NextApiResponse object
 * @returns object properties
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { coordinates } = req.query
  const host = "https://api.weather.gov"
  const path = "/points/"
  const points = coordinates
  const endpoint = host + path + points
  const data = await requestData(endpoint,
    (data: any) => {
      requestData(data.properties.forecast, 
        (data: any) => res.status(200).json(data), 
        (error: any) => res.status(500).json(error))
    },
    (error: any) => res.status(500).json(error)
  )
  return { props: { data } }
}
