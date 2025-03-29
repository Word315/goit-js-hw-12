import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 }); // Один екземпляр

// Функція для очищення галереї перед новим рендерингом
export function clearGallery() {
    gallery.innerHTML = '';
}

// Функція для рендерингу нових зображень (додавання зображень до існуючих)
export function renderGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <a href="${largeImageURL}" class="gallery-item">
            <img src="${webformatURL}" alt="${tags}" />
            <div class="info">
                <p><b>Likes: </b> ${likes}</p>
                <p><b>Views: </b> ${views}</p>
                <p><b>Comments: </b> ${comments}</p>
                <p><b>Downloads: </b> ${downloads}</p>
            </div>
        </a>
    `).join('');

    gallery.insertAdjacentHTML('beforeend', markup); // Додаємо нові зображення до існуючих
    lightbox.refresh(); // Оновлюємо Lightbox після рендерингу нових елементів
}

// Функція для показу кнопки "Load more"
export function showLoadMoreButton() {
    loadMoreButton.style.display = 'block';
}

// Функція для приховування кнопки "Load more"
export function hideLoadMoreButton() {
    loadMoreButton.style.display = 'none';
}
