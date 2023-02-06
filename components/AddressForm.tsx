import LoaderURL from '@/assets/loader.svg'
import Image from 'next/image'

export default function AddressForm() {

  async function handleSubmit(e: any) {
    e.preventDefault()

    hideError()

    const street = document.querySelector('#street-address') as HTMLInputElement
    const city = document.querySelector('#city') as HTMLInputElement
    const region = document.querySelector('#region') as HTMLInputElement
    const postalCode = document.querySelector('#postal-code') as HTMLInputElement

    if (!street.value || street.value.length < 3) {
      showError('Please enter a valid Street name.')
      return false
    }

    if (!city.value || city.value.length < 3) {
      showError('Please enter a valid City name.')
      return false
    }

    if (!region.value || region.value.length < 1) {
      showError('Please enter a valid Region name.')
      return false
    }

    if (!postalCode.value || postalCode.value.length < 5) {
      showError('Please enter a valid Postal Code name.')
      return false
    }

    loader(true)

    const request = `${street.value}, ${city.value}, ${region.value}, ${postalCode.value}`
    try {
      const response = await fetch(`/api/geocoder/${request}`);
      const result = await response.json()
      if (result.addressMatches.length) {
        hideError()
        window.location.href = `./${request}`
      } else {
        showError('Coordinates were not found for the given address')
        loader(false)
      }
    } catch (e: any) {
      showError('Network error: ' + e.message)
      loader(false)
    }

  }

  function showError(text: string) {
    const elem = document.getElementById('search-address-error')
    if (!elem) return false;
    elem.classList.remove('hidden')
    elem.innerHTML = text
  }

  function hideError() {
    const elem = document.getElementById('search-address-error')
    if (!elem) return false;
    elem.classList.add('hidden')
    elem.innerHTML = ''
  }

  function loader(toggle: boolean) {
    const element = document.querySelector('#loader') as HTMLInputElement
    if (!element) return
    if (toggle) {
      element.classList.add('flex')
      element.classList.remove('hidden')
    } else {
      element.classList.remove('flex')
      element.classList.add('hidden')

    }
  }

  return (<>
    <form action="/" method="GET" onSubmit={(e) => handleSubmit(e)}>
      <div className="overflow-hidden shadow sm:rounded-md w-[600px] max-w-full m-auto">
        <div className="bg-white/[.8] px-4 py-5 sm:p-6">
          <div className='place-content-center pt-6 hidden' id='loader'>
            <Image src={LoaderURL} alt="Loader icon" width={50} />
          </div>
          <div id="search-address-error" className="text-center m-4 p-4 rounded text-white bg-red-600 hidden"></div>
          <h1 className='text-center p-8 pb-2'>Weather Forecast</h1>
          <p className='text-center mb-8'>Enter any US address to retrieve the weather forecast information.</p>
          <div className="grid grid-cols-6 gap-6">

            <div className="col-span-6">
              <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">Street address</label>
              <input type="text" name="street-address" id="street-address" autoComplete="street-address" className="mt-1 block w-full rounded-md border py-2 px-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" name="city" id="city" autoComplete="address-level2" className="mt-1 block w-full rounded-md border py-2 px-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">State / Province</label>
              <input type="text" name="region" id="region" autoComplete="address-level1" maxLength={2} minLength={2} className="mt-1 block w-full rounded-md border py-2 px-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
              <input type="number" name="postal-code" id="postal-code" autoComplete="postal-code" className="mt-1 block w-full rounded-md border py-2 px-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Search</button>
        </div>
      </div>
    </form>
  </>)
}
