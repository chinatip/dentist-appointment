import { API_URL } from 'const'
import { client, resolve } from "react-resolver";
import axios from 'axios';

import { Loader } from 'common';

export const LOADER = client(Loader)

export const FETCH_TABLE = (table) => {
  return resolve(table, () => {
    const url = `${API_URL}${table}`
  
    return axios.get(url).then(({ data }) => data)
  })
}

export const CREATE_USER = (newPatient) => {
  const URL = `${API_URL}patients`;

  // fetch(URL, {
  //   method: 'POST',
  //   body: JSON.stringify(newPatient),
  //   headers: {
  //     "Content-Type": 'application/json',
  //     "Accept": "application/json"
  //   }
  // }).then(function(response) {
  //   return response.json();
  // })

  axios(URL, newPatient).then((response) => console.log(response))
}