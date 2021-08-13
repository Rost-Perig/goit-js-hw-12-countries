import { debounce } from 'throttle-debounce';
import './sass/main.scss';
import '@pnotify/core/dist/Angeler.css';
import { refsS } from './js/refs';
import { controlKeyUp, fetchStates, currentStsArr, renderSt, clearing, openModalOn, closeModalOn, onKeyPress } from './js/utils';
import { pN } from './js/pnotify-set';
window.addEventListener('keydown', e => onKeyPress(e,refsS, currentStsArr));
refsS.form.elements.query.addEventListener('input', () => controlKeyUp(refsS, pN)); //Проверка ввода
refsS.form.elements.query.addEventListener('input', debounce(800, () => fetchAndRender(refsS, pN)));
refsS.modalCloser.addEventListener('click', () => closeModalOn(refsS));
refsS.statesContainer.addEventListener('click', e => {
  e.preventDefault();
  openModalOn(refsS, currentStsArr);
});
refsS.modalOverlay.addEventListener('click', e => {
  if (e.target !== e.currentTarget) {
    return;
  };
  closeModalOn(refsS);
});
refsS.clearBtn.addEventListener('click', e => {
  e.preventDefault();
  clearing(refsS);
});

function fetchAndRender(refs, pNot) {
  if (refs.form.elements.query.value === refs.queryValue) {
    return;
  } else {refs.queryValue = refs.form.elements.query.value;}
  if (refs.form.elements.query.value === '') {
    clearing(refs);
    return;
  };
  fetchStates(refs)
    .then(states => {
      renderSt(states, refs, pNot)
    })
    .catch(catchError => {
      console.log(catchError);
    })
};



console.log("Привіт, світ! Життя брутальне!");




