import {createRequestInstance, watchRequests} from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';

export const rootSaga = function* rootSaga(axiosInstance) {
    yield createRequestInstance({
        driver: createDriver(axiosInstance)
    });
    yield watchRequests();
};