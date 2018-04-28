export default class Page {
    constructor(page= {}){
        this.elements = page.elements || []
        this.bg = page.bg || {
            img: '',
            color: ''
        }
    }
}
