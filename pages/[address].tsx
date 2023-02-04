import Head from 'next/head'
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import WeatherInfo from '@/components/WeatherInfo'
import Footer from '@/components/Footer'

type Data = {
  map: any
}

export const getServerSideProps: GetServerSideProps<{ periods: Data }> = async (context) => {
  const params = context.params
  const address = params ? params.address : ''
  const geocoder_response = await fetch(process.env.HOST + 'api/geocoder/' + address)
  const geocoder = await geocoder_response.json()
  if (typeof geocoder.addressMatches[0] === 'undefined') {
    return {
      redirect: {
        permanent: false,
        destination: '/?error=true',
      }
    }
  }
  const coordinates = [
    geocoder.addressMatches[0].coordinates.y,
    geocoder.addressMatches[0].coordinates.x
  ].join(',')
  const weather_response = await fetch(process.env.HOST + 'api/weather/' + coordinates)
  const data = await weather_response.json()
  const periods = data.properties.periods.slice(0, 7)
  return {
    props: {
      periods
    },
  }
}

export default function Home({ periods }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Weather Forecast</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-col h-screen justify-between'>
        <h1 className='text-center p-8'>Weather Forecast</h1>
        <main className="container m-auto p-4">
          <ul className="grid grid-cols-7 gap-4">
            {periods.map((item: any, key: number) => (
              <li key={key} className="">
                <WeatherInfo item={item} />
              </li>
            ))}
          </ul>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button onClick={_ => window.location.href = "/"} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">New Search</button>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
