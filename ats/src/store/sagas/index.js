import {all, fork} from 'redux-saga/effects';
import home from './home';



export default function* watchers() {
    yield all([
        home,

    ].map(fork));
}
