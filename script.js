let mainData = [];
let mainData2 = []

async function getCars() {
    const url = "https://6367b246edc85dbc84d9ba5d.mockapi.io/products?sortBy=rating&order=desc&l=16&p=1";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Xatolik bor!");
        }
        let dataMain = await response.json()
mainData2 = dataMain
        mainData = dataMain
        renderPizza(dataMain);

    } catch (error) {
        console.log(error);
    }
}

getCars();

let arrowDown = document.querySelector(".filter-to img"),
    filtering = document.querySelector(".selection-of-filtering"),
    pizzas = document.querySelector(".pizzas");

arrowDown.addEventListener("click", () => {
    if (filtering.style.display === "flex") {
        filtering.style.display = "none";
    } else {
        filtering.style.display = "flex";
    }
});

function renderPizza(data) {
    mainData = data
    pizzas.innerHTML = "";
    data.forEach(item => {
        pizzas.innerHTML += `
            <div>
                <img src="https://react-pizza-v2-psi.vercel.app/assets/img/products/4.png" alt="" style="width: 200px; height: 200px;">
                <h2>${item.title}</h2>
                <p>${item.description}</p><br>
                <div style="display: flex;">
                    <div class="choose">${item.size.map((size, index) => `<span class="${index === 0 ? 'active-choose' : 'choose-span'}">${size}</span>`).join("")}</div>
                </div>
                <div>
                    <div class="dough">${item.dough.map((dough, index) => `<span class="${index === 0 ? 'active-dough' : 'dough-span'}">${dough}</span>`).join("")}</div>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <h2>${item.price}₴</h2>
                    <button class="add-to-cart">В корзину <i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
        `;
    });
}

let search = document.querySelector(".input input")

search.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase();

    if (!value) {
        renderPizza(mainData);
        return;
    }

    let filtered = mainData.filter(item =>
        item.title.toLowerCase().includes(value)
    );

    renderPizza(filtered);
});
// renderPizza(data);

let tabs = document.querySelector(".tabs"),
    tab = document.querySelectorAll(".tab"),
    active_tab = document.querySelectorAll(".active");

console.log(tabs, tab);

tab.forEach(item => {
    item.addEventListener("click", () => {
        console.log(item.textContent);
        
        tab.forEach(el => el.classList.remove("active"));
        item.classList.add("active");

        let filtered;
        filtered = mainData.filter(item2 => item.textContent === "Мясные" ? item2.category === 1 : item.textContent === "Сырные" ? item2.category === 2 : item.textContent === "Гриль" ? item2.category === 3 : item.textContent === "Вегетарианская" ? item2.category === 4 : item.textContent === "Острые" ? item2.category === 5 : item.textContent === "Закрытые" ? item2.category === 6 : mainData2);
        renderPizza(item.textContent === "Все" ? mainData2 : filtered);
    });
});


// let search = document.querySelector(".input input"),
//     title = document.querySelectorAll(".pizzas > div > h2");

// search.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//         search.blur();

//         let value = search.value.toLowerCase();

//         let filtered = [...cards].filter(card => {
//             let title = card.querySelector("h2").textContent.toLowerCase();
//             return title.includes(value);
//         });

//         cards.forEach(card => {
//             card.style.display = "none";
//         });

//         filtered.forEach(card => {
//             card.style.display = "block";
//         });
//     }
// });

let choose = document.querySelectorAll(".choose");

console.log(choose);

choose.forEach(item => {
    item.children.forEach(child => {
        child.addEventListener("click", () => {
            item.children.forEach(child2 => child2.classList.remove("active-choose"));
            child.classList.add("active-choose");
        });
    });
});