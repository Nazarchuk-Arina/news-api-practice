import { refs } from './refs';
import { fetchNews } from './news-api/news-service';
import { appendNewsArticles } from './helpers/appendNewsMarkup';
import { PER_PAGE } from './news-api/config';
import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
let searchQuery = null;
let pages = 0;

refs.form.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMore);
// fetchNews();

async function handleSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  searchQuery = form.elements.newsKeyword.value;
  refs.container.innerHTML = '';
  currentPage = 1;

  try {
    const { articles, totalResults } = await fetchNews(
      searchQuery,
      currentPage
    );
    pages = Math.ceil(totalResults / PER_PAGE);
    appendNewsArticles(articles, refs.container);
    refs.loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
    refs.loadMoreBtn.classList.add('is-hidden');
    izitoast.error({ message: error.message });
  } finally {
    form.reset();
  }
}

async function handleLoadMore(event) {
  currentPage += 1;

  try {
    refs.loader.classList.remove('is-hidden');
    const { articles } = await fetchNews(searchQuery, currentPage);
    appendNewsArticles(articles, refs.container);
    handleScrollView();

    if (currentPage >= Math.min(pages, 16)) {
      refs.loadMoreBtn.classList.add('is-hidden');
      izitoast.success({ message: 'It is last page' });
    }
  } catch (error) {
    console.log(error);
  } finally {
    refs.loader.classList.add('is-hidden');
  }
}

function handleScrollView() {
  const lastArticle = refs.container.lastElementChild;
  const articleHeight = lastArticle.getBoundingClientRect().height;
  const scrollHeight = articleHeight * 2;
  window.scrollBy({
    top: scrollHeight,
    left: 0,
    behavior: 'smooth',
  });
}
