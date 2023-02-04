import Image from 'next/image'

export default function WeatherInfo({ item }: any) {
  return (<>
    <div className="bg-white shadow-2xl p-6 rounded-2xl border-2 border-gray-50">
      <div className="flex flex-col">
        <div>
          <h2 className="font-bold text-gray-600 text-center">{item.name}</h2>
        </div>
        <div className="my-6">
          <div className="flex flex-row space-x-4">
            <div id="icon" className="min-w-[110px]">
              <span>
                <Image src={item.icon} alt={"Icon for " + item.shortForecast} width={100} height={100} />
              </span>
            </div>
            <div id="temp">
              <h4 className="text-4xl">{item.temperature}&deg;{item.temperatureUnit}</h4>
              <p className="text-xs text-gray-500">{item.detailedForecast}</p>
              <div className="text-xs text-gray-500">
                <ul>
                  <li>Wind direction: {item.windDirection}</li>
                  <li>Wind Speed: {item.windSpeed}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}
