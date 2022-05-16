import axios from "axios";

const ShowApi = axios.create({
  baseURL: 'https://api.tvmaze.com/schedule/',
  params: {
    country: 'US',
  }
});

export const TvShowsApi = {
  async getShowList(length: 'full' | 'short', date: Date) {
    let dd = date.getUTCDate().toString();
    if (+dd < 10) {
      dd = "0" + dd;
    }
    let mm = (date.getMonth() + 1).toString();
    if (+mm < 10) {
      mm = "0" + mm;
    }
    const requestDate = date.getFullYear() + "-" + mm + "-" + dd;
    const result = await ShowApi.get('', {params: {date: requestDate}});
    if (length === 'full') {
      return result.data;
    }
    else if (length === 'short' && result.data.length > 5) {
      return result.data.slice(0, 5);
    }
    else {
      return result.data;
    }
  },
};