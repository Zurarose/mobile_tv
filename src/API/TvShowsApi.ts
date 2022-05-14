import axios from "axios";

const ShowApi = axios.create({
  baseURL: 'https://api.tvmaze.com/schedule/',
  params: {
    country: 'US',
  }
})

export const TvShowsApi = {
  async getShowList(length: 'full' | 'short', date: Date) {
    const count = length === 'full' ? '' : 'web?'
    let dd = date.getUTCDate().toString()
    if (+dd < 10) dd = "0" + dd
    let mm = date.getMonth().toString()
    if (+mm < 10) mm = "0" + mm
    const requestDate = date.getFullYear() + "-" + mm + "-" + dd;
    const result = await ShowApi.get(count, {params: {date: requestDate}});
    return result.data;
  },
}