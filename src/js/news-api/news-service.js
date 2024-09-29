import axios from 'axios';
import { BASE_URL, API_KEY, PER_PAGE } from './config.js';

export async function fetchNews(searchQuery, currentPage = 1) {
  const options = new URLSearchParams({
    q: searchQuery,
    apiKey: API_KEY,
    pageSize: PER_PAGE,
    page: currentPage,
    language: 'en',
  });
  const url = `${BASE_URL}/everything?${options}`;

  const {
    data: { articles, totalResults, status, message = '' },
  } = await axios.get(url);

  if (status !== 'ok') {
    throw new Error('message');
  }

  if (articles.length === 0) {
    throw new Error('No articles found');
  }

  return { articles, totalResults };
}
