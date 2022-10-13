export class FetchError extends Error {
    constructor(message, response, data){
        this.name = "FetchError";
        this.response = response;
        this.data = data ?? { message: message };
    }
}

export default async function fetchJson( input, init)
{
  const response = await fetch(input, init);

  // if the server replies, there's always some data in json
  // if there's a network error, it will throw at the previous line

  const data = await response.json(); //IMPORTANT

  // response.ok is true when res.status is 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  if (response.ok) {
    return data;
  }

  throw new FetchError({
    message: response.statusText,
    response,
    data,
  });
}