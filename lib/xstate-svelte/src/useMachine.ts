import { isEqual } from 'lodash/fp'
import { Observable } from 'rxjs'
import { distinctUntilChanged, share, startWith } from 'rxjs/operators'
import type {
  EventObject,
  Interpreter,
  InterpreterOptions,
  State,
  StateMachine,
  StateSchema,
  Typestate,
} from 'xstate'
import { interpret } from 'xstate'

function useMachine<
  TContext,
  TSchema extends StateSchema,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext>
>(
  machine: StateMachine<TContext, TSchema, TEvent, TTypestate>,
  options?: Partial<InterpreterOptions>,
): {
  context$: Observable<TContext>
  service: Interpreter<TContext, TSchema, TEvent, TTypestate>
  state$: Observable<State<TContext, TEvent, TSchema, TTypestate>>
  send: Interpreter<TContext, TSchema, TEvent, TTypestate>['send']
} {
  type TState = State<TContext, TEvent, TSchema, TTypestate>

  const service = interpret(machine, options)

  let refCount = 0
  function incrementRefCount() {
    if (refCount === 0) {
      service.start()
    }

    refCount += 1
  }

  function decrementRefCount() {
    refCount -= 1

    if (refCount === 0) {
      service.stop()
    }
  }

  const state$ = new Observable<TState>((observer) => {
    incrementRefCount()

    const subscription = service.subscribe(observer)

    return {
      unsubscribe: () => {
        subscription.unsubscribe()
        decrementRefCount()
      },
    }
  }).pipe(share())

  const context$ = new Observable<TContext>((observer) => {
    incrementRefCount()

    const listener = (context: TContext) => {
      observer.next(context)
    }

    service.onChange(listener)

    return {
      unsubscribe: () => {
        service.off(listener)
        decrementRefCount()
      },
    }
  }).pipe(
    startWith(service.machine.initialState.context),
    distinctUntilChanged(isEqual),
    share(),
  )

  return {
    context$,
    service,
    state$,
    send: service.send,
  }
}

export { useMachine }
