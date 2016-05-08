class Convertor {
    constructor(data) {
        this.data = data;    
        this.processor = [];
    }

    registerProcessor(processor) {
        this.processor.push(processor);
    }

    start() {

    }
}
