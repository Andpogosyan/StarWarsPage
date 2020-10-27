let peopleList = [];
let elementList = [];
let urlStart = 'http://swapi.dev/api/people/?page=1';
let urlNext;
let urlBack;
let promiseOuter;
let next = document.querySelector('.next');
let back = document.querySelector('.back');

let moveNext = () => {
    next.disabled = true;
    for (let i = 0; i < 10; i++) {
        if (document.querySelector('.people')) {
            document.querySelector('.people').remove();
        }
    };
    urlNext = promiseOuter['next'];
    getStarWarHeroes(urlNext);
    urlBack = promiseOuter['previous'];
}
let moveBack = () => {
    back.disabled = true;
    for (let i = 0; i < 10; i++) {
        if (document.querySelector('.people')) {
            document.querySelector('.people').remove();
        }
    };
    urlBack = promiseOuter['previous'];
    getStarWarHeroes(urlBack);
}




// Функция запроса 
async function getStarWarHeroes(url) {
    let response = await fetch(url);
    let promise = await response.json();
    let copyPromise = promise['results'];
    peopleList = copyPromise;
    let contain = document.querySelector('.container');
    promiseOuter = promise;
    urlNext = promise['next'];
    urlBack = promiseOuter['previous'] ? promiseOuter['previous'] : urlBack;
    for (let i = 0; i < peopleList.length; i++) {
        let el = document.createElement('div');
        let h2 = document.createElement('h2');
        let p = document.createElement('p');
        let img = document.createElement('img');
        img.className = 'people__logo';
        img.alt = 'logo';
        img.src = `images/${peopleList[i].name.split(' ').join('')}.jpg`;
        el.className = 'people';
        h2.className = 'heroName';
        p.id = `${peopleList[i].name}`;
        p.innerText = `Имя: ${peopleList[i].name}
        Дата рождения: ${peopleList[i].birth_year}
        Рост: ${peopleList[i].height}
        Цвет глаз: ${peopleList[i].eye_color}
        Вес: ${peopleList[i].mass}`
        console.log(peopleList);

        el.append(img);
        el.append(h2);

        h2.innerText = peopleList[i].name;

        contain.append(el);
        elementList.push(el.innerText);
        el.addEventListener('click', () => {


            if (document.querySelector('.modalWindow')) {
                document.querySelector('.modalWindow').remove();
            }
            let window = document.createElement('div');
            window.className = 'modalWindow';
            window.style.position = 'fixed';
            let winImg = document.createElement('img');
            winImg.src = `images/${peopleList[i].name.split(' ').join('')}.jpg`;
            let winCont = document.createElement('div');

            let closeButton = document.createElement('button');
            closeButton.innerText = 'Close';
            winCont.append(p);
            winCont.append(closeButton);
            window.append(winImg);
            window.append(winCont);
            console.log(window);
            document.querySelector('body').append(window);
            closeButton.addEventListener('click', () => { window.remove() })
        })
    }

    if (promiseOuter['next'] === 'http://swapi.dev/api/people/?page=2') {
        back.disabled = true;
    } else {
        back.disabled = false;
    }
    if (promiseOuter['previous'] === 'http://swapi.dev/api/people/?page=8') {
        next.disabled = true;
    } else {
        next.disabled = false;
    }
}

let funcStarting = () => {
    document.querySelector('.wrapper').style.background = `url(images/spacebackg2.jpg) repeat`
    document.querySelector('.startShowing').hidden = true;
    document.querySelector('.navButtons').hidden = false;
    next.addEventListener('click', moveNext);
    back.addEventListener('click', moveBack);
    getStarWarHeroes(urlStart);
}

document.querySelector('.startShowing').addEventListener('click', funcStarting)

console.log(peopleList)
console.log(elementList)