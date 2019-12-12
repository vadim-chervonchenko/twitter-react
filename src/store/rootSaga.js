import {createRequestInstance, watchRequests} from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';

export const rootSaga = function* rootSaga(axios) {
    yield createRequestInstance({
        driver: createDriver(axios)
    });
    yield watchRequests();
};