

const submit = document.querySelector('.submit');
let brand = document.getElementById("Name");
let place = document.getElementById("Location");
let evaluation = document.getElementById("Evaluation")

let clicked = false;

function create(){
    console.log('실행');
    fetch("http://localhost:3000/create",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({
            name : brand.value,
            place : place.value,
            evaluation : evaluation.value,
        }),
    }).then((response)=>{
        console.log(response)
    })
}

const listUrl = 'http://localhost:3000/list'
const getList = async (listUrl)=>{
    const res = await fetch(listUrl)
    const res2 = await res.json()
    const res3 = await JSON.parse(res2)
    const obj = await Object.keys(res3)
    setTimeout(()=>{
        for(let i=0;i<obj.length;i++){
            createHTMLString(res3.item)
        }
    },1500)
    for await(let item of obj){
            createHTMLString(res3.x)
    }
    console.log(obj);
}

getList(listUrl)

function createHTMLString(restaurant){
    console.log('dm')
    
        const resName = document.createElement('div');
        const placeName = document.createElement('div');
        const evName = document.createElement('div');
        const deleteBtn = document.createElement('button');
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
    
    
        console.log(restaurant[0],restaurant[1],restaurant[2])
    }





submit.addEventListener('click',create)