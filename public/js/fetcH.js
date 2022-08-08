
const listNode = document.querySelector('.restaurant');
const submit = document.querySelector('.submit');
//const modal = document.querySelector('.modal');
//const deleteBtn = document.querySelector('.')

let brand = document.getElementById("Name");
let place = document.getElementById("Location");
let evaluation = document.getElementById("Evaluation")

let clicked = false;

function create() {
    fetch("/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: brand.value,
            place: place.value,
            evaluation: evaluation.value,
        }),
    })
}

const listUrl = '/list'
const getList = async (listUrl) => {
    const res = await fetch(listUrl);
    const res2 = await res.json();
    const res3 = await JSON.parse(res2);
    const obj = await Object.values(res3);
    for (const prop of obj) {
        createHTMLString(prop);
    }
}


getList(listUrl)

function createHTMLString(restaurant) {
    const resName = document.createElement('div');
    const placeName = document.createElement('div');
    const evName = document.createElement('div');
    const deleteBtn = document.createElement('button');

    resName.className = 'name';
    placeName.className = `location`;
    evName.className = `evaluation`;
    deleteBtn.className = 'delBtn';
    let resNameText = document.createTextNode(restaurant[0])
    let placeNameText = document.createTextNode(restaurant[1])
    let evNameText = document.createTextNode(restaurant[2])
    let deleteBtnText = document.createTextNode('삭제')
    
    resName.appendChild(resNameText);
    placeName.appendChild(placeNameText);
    evName.appendChild(evNameText);
    deleteBtn.appendChild(deleteBtnText)
    document.getElementsByClassName('restaurant')[0].appendChild(resName);
    document.getElementsByClassName('restaurant')[0].appendChild(placeName);
    document.getElementsByClassName('restaurant')[0].appendChild(evName);
    document.getElementsByClassName('restaurant')[0].appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
        del(restaurant[0])

    })
}

function rerender(name) {
    del(name)
    getList(listUrl)
}

function del(name) {
    fetch("/del", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
        }),
    }).then((response) => {
        console.log(response);
    }).then(() => {
        create();
        removeAllChildNodes(listNode);
        getList(listUrl);
    })
    removeAllChildNodes(listNode);
    getList(listUrl);

}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


async function good() {
    await create()
    removeAllChildNodes(listNode)
    await getList(listUrl)
}


submit.addEventListener('click', () => {
    create();
    removeAllChildNodes(listNode);
    getList(listUrl);
    modal.classList.toggle('show');
    brand.value = '';
    place.value = '';
    evaluation.value = '';
})