import { truncate } from './truncateText';

export function appendNewsArticles(articles, wrapper) {
  const articlesMarkup = articles
    .map(
      ({
        title,
        description,
        url,
        urlToImage,
        publishedAt,
      }) => `<article class="card">
        <img
          class="card-img-top"
          src="${
            urlToImage
              ? urlToImage
              : 'https://placehold.co/600x400?text=Hot news'
          }"
          alt="${title}"
        />
        <div class="card-body">
          <h5 class="card-title">${truncate(title, 40)}</h5>
          <p class="card-text">${truncate(description)}</p>
          <p class="card-text">
            <small class="text-body-secondary">${publishedAt}</small>
          </p>
          <a href="${url}" class="btn btn-outline-primary" target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      </article>`
    )
    .join('');

  wrapper.insertAdjacentHTML('beforeend', articlesMarkup);
}
