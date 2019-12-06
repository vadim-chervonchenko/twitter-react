/*
  *
  * Вопросов 3 ,
  * что отлавливать ( FETCH_USER_REQUEST или FETCH_USER_REQUEST_SUCCESS ) и
  * как потом диспатчить нужные экшнкриэйтор
  * как использовать try catch во время диспатча событий.
   *
   *
   * */

export const tweetMiddleware = (store) => (next) => (action) => {
    return next( action );
};