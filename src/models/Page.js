export default class Page {
    constructor(page= {}){
        this.elements = page.elements || []
        this.bg = page.bg || {
            img: '',
            color: 'rgb(255, 255, 255)'
        }
    }
}
