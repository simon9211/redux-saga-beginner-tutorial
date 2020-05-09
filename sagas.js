import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'


export function * helloSaga() {
    console.log('hello Sagas!');
}

// Our worker Saga: 将执行异步的 increment 任务
export function* incrementAsync() {
    yield call(delay, 1000)
    yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action spawn 一个新的 incrementAsync 任务
export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        helloSaga(),
        incrementAsync(),
        watchIncrementAsync()
    ])
}