export const postBase64 = (url, body) => {
  return fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/base64',
      },
      body,
    })
    .then(response => {
      if (!response.ok) {
        throw Error(response);
      }
      return response;
    })
    .then(response => response.json());
};
