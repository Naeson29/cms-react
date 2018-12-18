import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer                               from '../reducers/index';
import promise                                   from 'redux-promise';
import reduxReset                                from 'redux-reset';

export default function configureStore() {
    // Redux DEVTOOL
    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(promise),
        reduxReset()
    );

    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    return createStore(rootReducer, enhancer);
}