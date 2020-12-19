import { Api } from './api';
import { AppPresenter } from './presenter/app-presenter';

const END_POINT = 'https://main-shop-fake-server.herokuapp.com';
const api = new Api(END_POINT);

const mainContainer = document.querySelector('.main');

const appPresenter = new AppPresenter(mainContainer, api);
appPresenter.init();
