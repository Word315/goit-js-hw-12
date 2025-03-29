import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 }); // Один екземпляр

// Функція для очищення галереї перед новим рендерингом
export function clearGallery() {
    gallery.innerHTML = '';
}

// Функція рендерингу нових зображень
export function renderGallery(images) {
    clearGallery(); // Очищаємо галерею перед рендерингом нових зображень

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

    gallery.innerHTML = markup;
    lightbox.refresh(); // Оновлюємо Lightbox після рендерингу нових елементів
}
