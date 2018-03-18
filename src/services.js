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