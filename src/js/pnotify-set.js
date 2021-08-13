import { alert, notice, info, success, error } from '../../node_modules/@pnotify/core';
import { defaults } from '../../node_modules/@pnotify/core';
defaults.closerHover = false;
defaults.styling = 'angeler';
defaults.icons = 'angeler';

export const pN = {
  basicSet: {
    hide: false,
    sticker: false,
    shadow: true,
    // animation: 'fade',
    // animateSpeed: 'normal'
  },
  controlInput: {
    TITLE: 'WRONG ENTER',
    TEXT: 'Use only \"a-z\" \"A-Z\"!',
    ADD__CLASS: 'notice-position angeler-extended'
  },
  invReq: {
    TITLE: 'INVALID REQUEST: get error 404',
    TEXT: 'Clear input and try again',
    ADD__CLASS: 'error-position angeler-extended'
  },
  tooMuchAns: {
    TITLE: 'TOO MACH ANSWER',
    TEXT: 'Clarify the request',
    ADD__CLASS: 'notice-position angeler-extended'
  },
  setCreator: function (setData) {
    this.basicSet.title = setData.TITLE;
    this.basicSet.text = setData.TEXT;
    this.basicSet.addClass = setData.ADD__CLASS;
    // this.basicSet.delay = 2000;
    return this.basicSet;
  },
  noticePn: notice,
  errorPn: error,
}