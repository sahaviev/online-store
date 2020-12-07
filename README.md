# Сайт объявлений

## Техническое задание
https://www.notion.so/eb49f3a5e5a54f76ac1c02044ff904b8

## Техническое описание проекта

* Архитектура MVP
* Код написан с использованием объектно-ориентированного подхода
* Код написан преимущественно в декларативном стиле, без мутаций
* Код написан на чистом JavaScript, без библиотек и внешних зависимостей

## Описание файловой структуры 
 
Каталоги:
 * model - модели отвечают за данные, их изменение
 * presenter - посредники отвечают за взаимодействие отображения и моделей
 * view - реализует отображение данных
 * utils - вспомогательные утилиты проекта


## ToDo по освновному функционалу
 * фильтры фотоаппаратов
 * фильтры машин
 * избранное
 * отображение информации в popup'e
 * Range Slider нормальный прикрутить


## ToDo
 * Рефакторинг фильтров
 * Привод сервера к нормальному виду
 * Написание unit-тестов
 * Написание cypress e2e-тестов
 
 
## Косяки
 * Огромное количество косяков с id и названиями в верстке
 * Тестовые данные с типами ноутбуков
 * Название категорий в версте расходятся с сервером из-за этого приходится писать 
 огромное количество адапатеров с сервера на клиент. 
 В боевых приложениях так не пишут, нужно и можно адаптировать сервер
 под клиента и отдавать чистые данные
  
  