import { isEqual } from 'lodash/fp';
import { Observable } from 'rxjs';
import { distinctUntilChanged, share, startWith } from 'rxjs/operators';
import { interpret } from 'xstate';
function useMachine(machine, options) {
    const service = interpret(machine, options);
    let refCount = 0;
    function incrementRefCount() {
        if (refCount === 0) {
            service.start();
        }
        refCount += 1;
    }
    function decrementRefCount() {
        refCount -= 1;
        if (refCount === 0) {
            service.stop();
        }
    }
    const state$ = new Observable((observer) => {
        incrementRefCount();
        const subscription = service.subscribe(observer);
        return {
            unsubscribe: () => {
                subscription.unsubscribe();
                decrementRefCount();
            },
        };
    }).pipe(share());
    const context$ = new Observable((observer) => {
        incrementRefCount();
        const listener = (context) => {
            observer.next(context);
        };
        service.onChange(listener);
        return {
            unsubscribe: () => {
                service.off(listener);
                decrementRefCount();
            },
        };
    }).pipe(startWith(service.machine.initialState.context), distinctUntilChanged(isEqual), share());
    return {
        context$,
        service,
        state$,
        send: service.send,
    };
}
export { useMachine };
//# sourceMappingURL=useMachine.js.map