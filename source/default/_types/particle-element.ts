export default class ParticleElement {
    constructor(
        public name: string
    ) {}

    enable($context: {}): any {
        console.log('default particle enable');
    }

    disable(): any {
        console.log('default particle disable');
    }
}
