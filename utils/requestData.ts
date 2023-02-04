/**
 * Request data
 * @param endpoint string URL endpoint
 * @param success function Success
 * @param failure function Failure
 * @returns promise
 */
export default async function requestData(endpoint: string, success: Function, failure: Function) {
  return fetch(endpoint)
    .then(response => {
      if (!response.ok) Promise.reject(response);
      return response.json()
    })
    .then(data => success(data))
    .catch(error => failure(error.message))
}
