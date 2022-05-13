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
    const requestDate = date.toISOString().slice(0, 10);
    const result = await ShowApi.get(count, {params: {date: requestDate}});
    console.log(result.data);
    return result.data;
  },
}