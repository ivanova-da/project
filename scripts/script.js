"use strict"
document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector('.header');     

  if (header) {
    console.log('Константа header существует');

      /* 
      *   Алгоритм
      *
      *   1. Начало.
      *   2. Получаем высоту блока/элемента (создание переменной, которая не будет меняться).
      *   3. Проверка условия (навешиваем слушатель событий на scroll страницы и ожидаем ее прокрутку): если страница прокручивается.
      *       3.1. Да: Получаем значение насколько прокрутили страницу (создание переменной, которая будет меняться).
      *           3.1.1 Проверка условия (сравниваем высоту элемента и значение прокрученной страницы): если расстояние от верха страницы больше высоты элемента
      *               3.1.1.1. Да: устанавливаем класс модификатора на элемент
      *               3.1.1.2. Нет (если расстояние от верха экрана меньше высоты элемента): удаляем класс модификатора у элемента
      *       3.2. Нет: Конец
      *   4. Конец
      * 
      *   Блок-схема: /images/block-schema.png
      */
     
      const heightHeader = header.offsetHeight;

      document.addEventListener('scroll', () => {

        console.log('Страница скролится');

        let scrollPageY = this.scrollY;

        if (scrollPageY > heightHeader) {
            header.classList.add('header--scroll')
        } else {
          header.classList.remove('header--scroll')
        }
      })
  }

 

  const favoriteBlock = document.querySelector('.offers__indicators-favourites');

  if (favoriteBlock) {
      console.log('Константа favoriteBlock существует');

      const favoriteButton = favoriteBlock.querySelector('.offers__indicators-button');
      const favoriteCount = favoriteBlock.querySelector('.offers__indicators-count');

      let isFavorite = false; // Состояние избранного
      let count = parseInt(favoriteCount.textContent); // Начальное значение счетчика с приведением строки к числу

      // Обработчик клика на иконку
      favoriteButton.addEventListener('click', () => {
          isFavorite = !isFavorite; // Меняем состояние

          if (isFavorite) {
              count += 1; // Увеличиваем счетчик
              favoriteButton.children[0].classList.add('offers__indicators-image--active'); // Делаем иконку красной
          } else {
              count -= 1; // Уменьшаем счетчик
              favoriteButton.children[0].classList.remove('offers__indicators-image--active'); // Возвращаем иконку в серый цвет
          }

          favoriteCount.textContent = count; // Обновляем счетчик
      });
  }
});