"use strict"
document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector('.header');

    if (header) {
        console.log('Константа header существует');
    }

    // Preloader страницы
    const preloader = document.querySelector('.preloader');
    const content = document.querySelector('.content');
    if (preloader && content) {
        setTimeout(() => {
            // Скрываем прелоадер
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';

            // Показываем контент
            content.style.display = 'block';

            // Удаляем элемент из DOM
            preloader.remove();
        }, 3000); // Задержка 3 секунды
    }

    const searchBlock = document.querySelector('.search');

    if (searchBlock) {
        const searchFormField = searchBlock.querySelector('.search__form-name');
        const tags = searchBlock.querySelectorAll('.search__tag-item'); // Получаем все теги

        // Функция для фильтрации тегов
        const filterTags = () => {
            const searchText = searchFormField.value.toLowerCase(); // Получаем текст из поисковой строки

            tags.forEach(tag => {
                const tagText = tag.textContent.toLowerCase(); // Получаем текст тега
                if (tagText.includes(searchText)) {
                    tag.classList.remove('search__tag-item--hidden'); // Показываем тег
                } else {
                    tag.classList.add('search__tag-item--hidden'); // Скрываем тег
                }
            });
        }

        // Обработчик события ввода текста
        searchFormField.addEventListener('input', filterTags);
    }



    const cardsContainer = document.querySelector('#offers');
    if (cardsContainer) {
        const cardList = cardsContainer.querySelector('.offers__list');

        /* Моковые данные */
        const offersData = {
            card1: {
                link: '/cards-menu/',
                icon: 'images/Icon22.svg',
                iconAlt: 'стрелка',
                iconWidth: 70,
                iconHeight: 70,
                title: 'Карты',
                description: 'Кэшбэк 1% Бесплатное обслуживание Мировая поддержка'
            },
            card2: {
                link: '/deposits-menu/',
                icon: 'images/Icon22.svg',
                iconAlt: 'стрелка',
                iconWidth: 70,
                iconHeight: 70,
                title: 'Вклады',
                description: 'Ставка 5% годовых Минимум 1000 рублей Без скрытых комиссий Гибкие условия'
            },
            card3: {
                link: '/credits-menu/',
                icon: 'images/Icon22.svg',
                iconAlt: 'стрелка',
                iconWidth: 70,
                iconHeight: 70,
                title: 'Кредиты',
                description: 'Ставка 10% годовых Сумма до 1 миллиона Одобрение за 1 час'
            }
        }

        // Функция для создания карточки
        const createCard = (linkUrl, iconUrl, iconAlt, iconWidth, iconHeight, title, description) => {


            // Шаблонные строки подстановки (второй вариант вывода разметки - рекомендуемый)

            const card = `
              <a class="offers__item" href="${linkUrl}">
                  <span class="offers__icon">
                      <img src="${iconUrl}" alt="${iconAlt}" width="${iconWidth}" height="${iconHeight}">
                  </span>
                  <h3 class="offers__title">${title}</h3>
                  <p class="offers__description">${description}</p>
              </a>
          `;

            return card;
        }

        for (const cardKey in offersData) {
            const card = offersData[cardKey];

            const cardElement = createCard(card.link, card.icon, card.iconAlt, card.iconWidth, card.iconHeight, card.title, card.description);
            cardList.insertAdjacentHTML('beforeend', cardElement); // Второй вариант
        }
    }

    const mybutton = document.getElementById("scrollToTopBtn");

    window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    };

    mybutton.onclick = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    //Динамический вывод карточек тегов. Массив с данными
    const offersContainer = document.querySelector('#offers');

    if (offersContainer) {

        const dataTitleOffers = ['Карты', 'Вклады', 'Кредиты'];

        const titleOffers = offersContainer.querySelectorAll(".offers__title");

        console.log(titleOffers);

        titleOffers.forEach((item, index) => {
            item.textContent = dataTitleOffers[index];
        });
    }


    const productsImg = document.querySelectorAll('.products__image');

    if (productsImg) {
        console.log('Изображения получены!');

        productsImg.forEach((item, index) => {
            const productsText = document.querySelectorAll('.products__description');
            item.onmouseenter = () => {
                item.style.opacity = 0.5;
                productsText[index].removeAttribute('hidden');
                console.log('Мышка наведена на изображение, показываем текст');
            }

            item.onmouseleave = () => {
                item.style.opacity = 1;
                productsText[index].setAttribute('hidden', true);
                console.log('Мышку убрали с изображения, скрываем текст');
            }

        });
    }


    let currentIndex = 0; //индекс карточек
    const slider = document.querySelectorAll(".quality__card");
    const prevButton = document.querySelector(".quality__left");
    const nextButton = document.querySelector(".quality__right");
    const visibleoffers = 1;
    updateSlider();


    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slider.length - visibleoffers;
        }
        updateSlider();
    });

    nextButton.addEventListener("click", () => {
        if (currentIndex < slider.length - visibleoffers) {
            currentIndex++;
        } else {
            currentIndex = 0; // Переход к началу карточек
        }
        updateSlider();
    });

    function updateSlider() {
        slider.forEach((item, index) => {
            if (index >= currentIndex && index < currentIndex + visibleoffers) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }



    const loginHeaderButton = document.querySelector('.header__login');
    const dialogLayout = document.querySelector('.dialog');

    if (loginHeaderButton && dialogLayout) {
        const closeDialogButton = dialogLayout.querySelector('.popup__close');
        const selectPopup = dialogLayout.querySelector('#popup-select');
        const loginPopup = dialogLayout.querySelector('#popup-login');
        const registrationPopup = dialogLayout.querySelector('#popup-registration');
        const switchToRegister = selectPopup.querySelector('[data-registration]');
        const switchToLogin = selectPopup.querySelector('[data-login]');

        // Открытие модального окна при клике на кнопку "Войти"
        loginHeaderButton.addEventListener('click', () => {
            dialogLayout.removeAttribute('hidden');
        });

        // Закрытие модального окна при клике на кнопку закрытия
        closeDialogButton.addEventListener('click', () => {
            dialogLayout.setAttribute('hidden', true);
        });

        // Закрытие модального окна при клике вне его области
        window.addEventListener('click', (event) => {
            if (event.target === dialogLayout) {
                dialogLayout.setAttribute('hidden', true);
            }
        });

        // Переключение на форму регистрации
        if (registrationPopup) {
            switchToRegister.addEventListener('click', (event) => {
                event.preventDefault();
                selectPopup.setAttribute('hidden', true);
                loginPopup.setAttribute('hidden', true);
                registrationPopup.removeAttribute('hidden');
            });
        }

        // Переключение на форму входа
        if (loginPopup) {
            switchToLogin.addEventListener('click', (event) => {
                event.preventDefault();
                selectPopup.setAttribute('hidden', true);
                registrationPopup.setAttribute('hidden', true);
                loginPopup.removeAttribute('hidden');
            });
        }
    }


})



const cardsContainer = document.querySelector('#offers');
if (cardsContainer) {
    const cardList = cardsContainer.querySelector('.offers__list');

    // Пример URL для получения данных с сервера
    const apiUrl = 'data.json';

    // Функция для создания карточки
    const createCard = (linkUrl, iconUrl, iconAlt, iconWidth, iconHeight, title, description) => {

        // Шаблонные строки и подстановки
        const card = `
          <a class="offers__item" href="${linkUrl}">
              <span class="offers__icon">
                  <img src="${iconUrl}" alt="${iconAlt}" width="${iconWidth}" height="${iconHeight}">
              </span>
              <h3 class="offers__title">${title}</h3>
              <p class="offers__description">${description}</p>
          </a>
      `;

        return card;
    }

    // Загрузка данных с сервера
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Данные
            console.log(typeof (data)); // Тип полученных данных

            // for (const item in data) {
            //     const card = data[item];

            //     const cardElement = createCard(card.link, card.icon, card.iconAlt, card.iconWidth, card.iconHeight, card.title, card.description);
            //     cardList.insertAdjacentHTML('beforeend', cardElement);
            // }

            data.forEach(item => {
                const cardElement = createCard(item.link, item.icon, item.iconAlt, item.iconWidth, item.iconHeight, item.title, item.description);
                cardList.insertAdjacentHTML('beforeend', cardElement);
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
        });
}

