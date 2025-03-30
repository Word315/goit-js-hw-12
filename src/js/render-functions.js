import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

// Функція для очищення галереї
export function clearGallery() {
    gallery.innerHTML = '';
}

// Функція рендерингу нових зображень
export function renderGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <a href="${largeImageURL}" class="gallery-item">
            <img src="${webformatURL}" alt="${tags}" />
            <div class="info">
                <p><b>Likes:</b> ${likes}</p>
                <p><b>Views:</b> ${views}</p>
                <p><b>Comments:</b> ${comments}</p>
                <p><b>Downloads:</b> ${downloads}</p>
            </div>
        </a>
    `).join('');

    gallery.innerHTML += markup;
    refreshLightbox(); // Викликаємо оновлення Lightbox
}

// Функція для оновлення SimpleLightbox
export function refreshLightbox() {
    lightbox.refresh();
}
