"use strict"
document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector('.header');     

  if (header) {
    console.log('Константа header существует');
  }
})

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
