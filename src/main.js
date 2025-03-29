import './css/styles.css';
import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

// Один екземпляр SimpleLightbox для оновлення після рендеру
const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

let searchQuery = '';
let currentPage = 1;
let totalHits = 0; // Загальна кількість результатів пошуку

// Обробка форми
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    searchQuery = event.target.elements['search-text'].value.trim();

    if (!searchQuery) {
        iziToast.warning({ 
            message: 'Please enter a search query.', 
            position: 'topRight' 
        });
        return;
    }

    clearGallery(); // Очищення галереї перед новими результатами
    loader.style.display = 'block';
    currentPage = 1; // Скидаємо сторінку до 1

    try {
        const { images, total } = await fetchImages(searchQuery, currentPage);
        totalHits = total;

        if (images.length === 0) {
            iziToast.error({ 
                message: 'Sorry, no images found. Try another search!', 
                position: 'topRight' 
            });
        } else {
            renderGallery(images);
            lightbox.refresh(); // Оновлюємо lightbox після рендерингу
            handleLoadMoreButton(images.length);
        }
    } catch (error) {
        iziToast.error({ 
            title: 'Error', 
            message: 'Failed to fetch images. Try again later.', 
            position: 'topRight' 
        });
    } finally {
        loader.style.display = 'none';
    }
});

// Обробка кнопки "Load more"
loadMoreButton.addEventListener('click', async () => {
    currentPage += 1;

    try {
        const { images } = await fetchImages(searchQuery, currentPage);
        renderGallery(images);
        lightbox.refresh(); // Оновлюємо lightbox після рендерингу

        handleLoadMoreButton(images.length);
        scrollPage();
    } catch (error) {
        iziToast.error({ 
            title: 'Error', 
            message: 'Failed to fetch images. Try again later.', 
            position: 'topRight' 
        });
    }
});

// Функція для показу/приховування кнопки "Load more" в залежності від наявності зображень
function handleLoadMoreButton(imagesCount) {
    if (imagesCount < 15 || currentPage * 15 >= totalHits) {
        hideLoadMoreButton();
        iziToast.info({
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight'
        });
    } else {
        showLoadMoreButton();
    }
}

// Функція для плавного прокручування сторінки
function scrollPage() {
    const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth'
    });
}
