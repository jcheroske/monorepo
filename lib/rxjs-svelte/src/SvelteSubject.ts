import { BehaviorSubject } from 'rxjs'

class SvelteSubject<T> extends BehaviorSubject<T> {
  set(value: T): void {
    super.next(value)
  }
}

export { SvelteSubject }
