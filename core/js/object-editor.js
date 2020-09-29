class ObjectEditor {
    constructor(object, exposedProperties) {
        this.element = document.createElement("div")
        this.element.className = "ObjectEditor"
        document.body.appendChild(this.element)

        for (let a = 0; a < exposedProperties.length; ++a) {
            //this.renderField(object, exposedProperties[a])
        }
    }

    renderField(object, prop) {
        let cont = document.createElement("div");
        let field = document.createElement("input")
        field.value = object[prop]
        field.className = "ObjectEditor-Field"
        field.oninput = event => {
            object[prop] = event.target.value
            console.log(event)
        }
        let label = document.createElement("label")
        label.innerHTML = prop
        cont.appendChild(label)
        cont.appendChild(field)

        this.element.appendChild(cont)
    }
}

export default ObjectEditor
