import { Observable } from 'rxjs';
import type { EventObject, Interpreter, InterpreterOptions, State, StateMachine, StateSchema, Typestate } from 'xstate';
declare function useMachine<TContext, TSchema extends StateSchema, TEvent extends EventObject, TTypestate extends Typestate<TContext>>(machine: StateMachine<TContext, TSchema, TEvent, TTypestate>, options?: Partial<InterpreterOptions>): {
    context$: Observable<TContext>;
    service: Interpreter<TContext, TSchema, TEvent, TTypestate>;
    state$: Observable<State<TContext, TEvent, TSchema, TTypestate>>;
    send: Interpreter<TContext, TSchema, TEvent, TTypestate>['send'];
};
export { useMachine };
