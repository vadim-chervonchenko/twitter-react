import React, {Fragment} from 'react';
import {notification, message} from 'antd';

/* после set_error все равно нужно обнулять ошибки
 *
  * оно то збс, пришла пачка ошибок, ты вывел все, но на этом все, даже если ты сразу удалишь все ошибки, то с экрана они уйдут только по истечению определенного времени. Поэтому сделать нужно так,
  *
  * 1) Нужно понять как встречать все типы ошибок с сервера, какой-то универсальный способ, было бы неплохо запилить.
  * 2) на set_error записать весь массив ошибок в errors.
  * 3) как только нотиси вывелись, можно сразу же удалять все дерьмо. ( может есть событие или экшон для этого или придется самому пилить. )
  * 4) Встречаем только стандартные ошибки , сформированные на сервере.
  *
  * */
const ErrorNotification = (props) => {
    const result = props.errors.map((i) => {

        console.log(i);

        // notification.error({message: i})
        message.error(i)
    });

    return (
        <Fragment>
            <div>
                {result}
            </div>
        </Fragment>
    );
};

export default ErrorNotification;