const btn = document.getElementById('change_btn');
let titles = document.querySelectorAll('h2');
let paragraphs = document.querySelectorAll('p');
let cells = document.getElementsByTagName('td');

btn.addEventListener('click', () => {
    for(let i = 1, j = 0; i < 8, j<=2; i+=3, j++){
        cells[i].innerHTML = '';
        cells[i].appendChild(paragraphs[j]);
        cells[i-1].innerHTML = '';
        cells[i-1].appendChild(titles[j]);
    }
})