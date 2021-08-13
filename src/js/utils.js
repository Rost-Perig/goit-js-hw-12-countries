
/* ======================== Проверка ввода и запрет ввода символов в форму ======================== */

export function controlKeyUp({input, pnotifyOverlay}, pNot) {
  if (/[^A-Za-z]/.test(input.value[input.value.length - 1])) {
      pNot.noticePn(pNot.setCreator(pNot.controlInput));
      openModalPn(pnotifyOverlay, input);
  } 
  input.value = input.value.replace(/[^A-Za-z]/g, ''); 
};

/* ======================== очистка формы и страницы ======================== */

export function clearing({form, statesContainer, resultTitle}) {
  form.reset();
  statesContainer.innerHTML = '';
  resultTitle.innerHTML = '';
}

/* ======================== получение данных с серверра АРI ======================== */

export function fetchStates(refs) {
  return fetch(`${refs.BASE_URL}/name/${refs.queryValue}`)
    .then(response => {
    return response.json();
    })
};

/* ======================== рендер всего ======================== */

import statesListTpl from '../templates/states-list.hbs';
import resultTitleTpl from '../templates/result-title.hbs';
import stateCardTpl from '../templates/state-card.hbs';

export let currentStsArr = [];

export function renderSt(states, { input, statesContainer, resultTitle, pnotifyOverlay }, pNot) {
    
  if (states.length === 1) {
    currentStsArr = states;
    resultTitle.innerHTML = resultTitleTpl(states.length);
    statesContainer.innerHTML = stateCardTpl(states[0]);
  }

  if (states.length > 1 && states.length < 11) {
    currentStsArr = states;
    resultTitle.innerHTML = resultTitleTpl(states.length);  
    statesContainer.innerHTML = statesListTpl(states);
  }

  if (states.length > 10) {
    statesContainer.innerHTML = '';
    resultTitle.innerHTML = '';
       pNot.noticePn(pNot.setCreator(pNot.tooMuchAns));
      openModalPn(pnotifyOverlay, input);
  }

  if (states.length === undefined) {
       pNot.errorPn(pNot.setCreator(pNot.invReq));
      openModalPn(pnotifyOverlay, input);
  }
};

/* ======================== работа с модальным окном ======================== */

export function openModalOn({ modal, modalContent }, tempArr) {

  if (!document.activeElement.classList.contains("states-list-link")) {
    return;
    };
    
  const imgAlt = document.activeElement.firstElementChild.alt;
  let stateOb = tempArr.find(state => {
    if (imgAlt === state.name) {
      return state;
    }
  });
    
  modal.classList.add('is-open');
  modalContent.innerHTML = stateCardTpl(stateOb);
  document.body.style.overflow = "hidden"; // остановка скролла под модальным окном
  document.body.style.height = "100wh"; // остановка скролла под модальным окном
};

export function closeModalOn({modal}) {
  modal.classList.remove('is-open');
  document.body.style.overflow = "auto"; // запуск скролла после закрытия модального окна
  document.body.style.height = "auto"; // запуск скролла после закрытия модального окна
};



/* ======================== события кнопок ======================== */

export function onKeyPress(e, refs, tempArr) {
  if(e.code === "Enter") {
    openModalOn(refs, tempArr);
  };

  let modalIsOpen = refs.modal.classList.contains('is-open');
  
  if (modalIsOpen) {
   if (e.code === "Escape") {
    closeModalOn(refs);
  };
  };
};

/* ======================== Overlay для pNotify ======================== */

function openModalPn(pnotifyOverlay, input) {
    pnotifyOverlay.classList.add('is-open');
    let closerPn = document.querySelector('.pnotify-closer');
    closerPn.addEventListener('click', e => {
      pnotifyOverlay.classList.remove('is-open');
      input.disabled = false;
    })
    input.disabled = true;
}