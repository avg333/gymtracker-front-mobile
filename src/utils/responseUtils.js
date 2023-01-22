
export function processAxiosResponse(res) {
  return { ok: true, data: res.data }
}


export function processAxiosError(error) {
  const axiosResponse = { ok: false, code: null, message: null, data: null }

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    axiosResponse.code = error.response.status
    axiosResponse.data = error.response.data
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    axiosResponse.message = error.response.message
    console.log('Error', error.message);
  }

  return axiosResponse
}
