import { createErrorMessage, createSuccessMessage } from './uploadPictures/createMessages.js';
import { onClosePictureForm } from './uploadPictures/uploadPictureForm.js';
import { unblockSubmitButton } from './uploadPictures/uploadPictureForm.js';

const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA : '/data',
  SEND_DATA : '/',
};

const DOWNLOAD_ERROR_TEXT = 'Не удалось загрузить данные. Попробуйте обновить страницу';

const getData = () =>
  fetch(`${BASE_URL}${Route.GET_DATA}/`)
    .then((response) => {
      if(!response.ok){
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(DOWNLOAD_ERROR_TEXT);
    });

const sendData = (formData) => {

  fetch(
    `${BASE_URL}${Route.SEND_DATA}`,
    {
      method: 'POST',
      body: formData,
    }
  ).then ((response) => response.json())
    .then((response) => {
      if (!response){
        createErrorMessage();
      } else {
        onClosePictureForm();
        createSuccessMessage();
      }
      unblockSubmitButton();
    })
    .catch(() => {
      unblockSubmitButton();
      createErrorMessage();
    });
};

export { getData, sendData };
