class CustomInput extends HTMLElement{
    connectedCallback(){
        let label = document.createElement('label');
        label.innerHTML = '식당이름'
        this.appendChild(label);
        let input = document.createElement('input')
        this.appendChild(input);
    }
}
customElements.define('custom-input',CustomInput)