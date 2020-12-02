import { BehaviorSubject } from 'rxjs';
class SvelteSubject extends BehaviorSubject {
    set(value) {
        super.next(value);
    }
}
export { SvelteSubject };
//# sourceMappingURL=SvelteSubject.js.map