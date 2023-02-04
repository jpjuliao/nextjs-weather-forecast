import Image from 'next/image'

export default function WeatherInfo({ item }: any) {
  return (<>
    <div className="bg-white shadow-2xl rounded-2xl border-2 border-gray-50 overflow-hidden hover:scale-105 transition-all">
      <div className="flex flex-col relative">
        <div className="md:mb-6">
          <div className="flex md:flex-wrap flex-row flex-nowrap mt-14 md:mt-0">
            <div id="icon" className="md:flex-auto md:w-auto w-[113px]">
              <Image src={item.icon} alt={"Icon for " + item.shortForecast} width={113} height={113}/>
            </div>
            <div id="day-title" className='w-full md:static absolute top-0 left-0 right-0'>
              <h2 className="font-bold text-xs h-14 mb-2 flex md:justify-center md:text-center place-items-center bg-gray-700 text-white leading-4 px-4 md:px-2">{item.name}</h2>
            </div>
            <div id="temp" className='px-2 flex-1 flex-grow'>
              <h4 className="lg:text-4xl md:text-2xl text-xl text-center md:text-gray-700 text-white mt-2 md:static absolute top-1 right-4">{item.temperature}&deg;{item.temperatureUnit}</h4>
              <p className="text-xs text-gray-500 h-auto md:h-32 overflow-hidden pt-2 md:pt-0">{item.detailedForecast}</p>
              <div className="text-xs text-gray-500">
                <ul className='md:block flex justify-between'>
                  <li><strong> Wind direction: </strong><br /> {item.windDirection}</li>
                  <li><strong>Wind Speed:</strong><br /> {item.windSpeed}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}
