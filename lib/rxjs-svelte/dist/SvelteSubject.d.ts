import { BehaviorSubject } from 'rxjs';
declare class SvelteSubject<T> extends BehaviorSubject<T> {
    set(value: T): void;
}
export { SvelteSubject };
