const form = document.querySelector('.js-search');  //посилання на форму
const list = document.querySelector('.list');  //посилання на місце для відображення погоди

const BASE_URL = 'http://api.weatherbit.io/v2.0/current';
const API_KEY = '7777688c5d60467c9eb79643c90bd47c';

form.addEventListener('submit', onSearch);      //слушатель кнопки пошуку

// колбек функція
function onSearch(evt){
    evt.preventDefault() // для  відміни перезавантаження сторінки
    // отримуємо дані з глибокою диструктуризацією
    const {query: {value: searchValue}, days: {value: daysValue}} = evt.currentTarget.elements;
    
    // Блокуємо відправку форми коли поле пусте
    if (!searchValue) {
        alert('Поле пусте 😥');
        return
    }

    forecastApi(searchValue, daysValue).then(data => {creatMarkup(data.forecast.forecastday)})
}

// функція для створеня размітки сайта
function creatMarkup(arr) {
    const markUp = arr.map(item => `<li>
    <img src="${item.day.condition.icon}" alt="icon">
    <span>${item.day.condition.text}</span>
//     <h2>День: ${item.date}</h2>
    <h3>Температура: ${item.day.avgtemp_c}&#8451;</h3>
</li>`).join('');
list.innerHTML = markUp;
}


// функція для опроса АПІ сервера
function forecastApi(name="Kiev"){    
    // повертаєм конструкцію fetch для запиту URL та його опцій, й прийняття ПОМІСУ (?-початок перелику параметрів пошуку,= - значення параметра, & - перелік параметрів)
   return fetch(`${BASE_URL}?key=${API_KEY}&city=${name}`).then(resp => {

        //перевірка респонса помилок
        if (!resp.ok){
            throw new Error(resp.statusText)   //для примусового виводу помилки (404)
        }
        return resp.json()
    }).catch(err => console.error(err));
}
