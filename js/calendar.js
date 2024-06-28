const dataPath = '' // сюда вписываем адрес JSON-файла

document.addEventListener("DOMContentLoaded", () => {
    tabsInit()
    sidebarController()
    filterSpoilersController()
    render(dataPath)
})

// Вкладки
function tabsInit() {
    const tabsWrap = document.querySelector('[data-js="tabsWrap"]')

    if(!tabsWrap) return

    const tabsSlider = tabsWrap.querySelector('[data-js="tabsSlider"]')
    const tabsBtnCalendar = tabsWrap.querySelector('[data-js="tabsBtnCalendar"]')
    const tabsBtnCards = tabsWrap.querySelector('[data-js="tabsBtnCards"]')

    const tabsSliderEx = new Swiper(tabsSlider, {
        slidesPerView: 1,
        allowTouchMove: false,
        effect: 'fade'
    });

    tabsBtnCalendar.addEventListener('click', () => {
        tabsSliderEx.slideTo(0)
        tabsBtnCards.classList.remove('active');
        tabsBtnCalendar.classList.add('active');
    })

    tabsBtnCards.addEventListener('click', () => {
        tabsSliderEx.slideTo(1)
        tabsBtnCalendar.classList.remove('active');
        tabsBtnCards.classList.add('active');
    })

}

// Боковое меню
function sidebarController() {
    const sidebar = document.querySelector('[data-js="sidebar"]')
    
    if(!sidebar) return

    const sidebarOpen = document.querySelector('[data-js="sidebarOpen"]')
    const sidebarClose = sidebar.querySelector('[data-js="sidebarClose"]')

    sidebarOpen.addEventListener('click', () => {
        sidebar.classList.add('active')
    })

    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('active')
    })

}

// Спойлеры в фильтрах
function filterSpoilersController() {
    const filterParams = document.querySelectorAll('[data-js="filterParam"]')
    
    if(filterParams.length < 1) return

    filterParams.forEach(item => {
        let itemHeader = item.querySelector('[data-js="filterParamHeader"]')

        if(itemHeader) {
            itemHeader.addEventListener('click', (e) => {
                let currentItem = e.currentTarget;
                let currentWrap = currentItem.closest('[data-js="filterParam"]')
                let currentContent = currentWrap.querySelector('[data-js="filterParamBody"]')
                if($(currentWrap).hasClass('expanded')) {
                    $(currentContent).hide(500)
                    $(currentWrap).removeClass('expanded')
                } else {
                    $(currentContent).show(500)
                    $(currentWrap).addClass('expanded')
                }
            })
        }

    })

}

function render(dataPath) {
    const eventsData = JSON.parse(calendarData)

    // сортируем данные
    eventsData.sort(function(a, b) {
        return parseFloat(a.year) - parseFloat(b.year) 
            || parseFloat(paramsVariables.months[a.month.toLowerCase()]) - parseFloat(paramsVariables.months[b.month.toLowerCase()])
            || parseFloat(a.day) - parseFloat(b.day);
    });

    renderCaledar(eventsData)
    renderCards(eventsData)
    filter(eventsData)
} 

function renderCards(eventsData) {
    const cardsWrap = document.querySelector('[data-js="cardsWrap"]');

    if(!cardsWrap) return

    cardsWrap.innerHTML = ''

    // первый год
    let currentYear = eventsData[0].year;
    let yearBlock = document.createElement('div')
    yearBlock.classList.add('cards__year', 'year');
    yearBlock.setAttribute('data-filter-name', 'year');
    yearBlock.setAttribute('data-filter-value', currentYear);
    yearBlock.innerHTML = `<div class="year__title">${currentYear}</div>`
    
    //первый месяц
    let currentMonth = eventsData[0].month;
    let monthBlock = document.createElement('div')
    monthBlock.classList.add('cards__month', 'month');
    monthBlock.innerHTML = `<div class="month__title">${currentMonth}</div>`

    // таблица первого месяца
    let monthTable = document.createElement('div')
    monthTable.classList.add('month__table', 'cards-table');

    monthBlock.appendChild(monthTable)
    yearBlock.appendChild(monthBlock)
    cardsWrap.appendChild(yearBlock)

    eventsData.forEach(item => {

        if(currentYear !== item.year) {
            currentYear = item.year
            yearBlock = document.createElement('div')
            yearBlock.classList.add('cards__year', 'year');
            yearBlock.setAttribute('data-filter-name', 'year');
            yearBlock.setAttribute('data-filter-value', currentYear);
            yearBlock.innerHTML = `<div class="year__title">${currentYear}</div>`
            cardsWrap.appendChild(yearBlock)
        }

        if(currentMonth.toLowerCase() !== item.month.toLowerCase() || currentYear !== item.year) {
            currentMonth = item.month
            monthBlock = document.createElement('div')
            monthBlock.classList.add('cards__month', 'month');
            monthBlock.innerHTML = `<div class="month__title">${currentMonth}</div>`
            monthTable = document.createElement('div')
            monthTable.classList.add('month__table', 'cards-table');
            monthBlock.appendChild(monthTable)
            yearBlock.appendChild(monthBlock)
        }

        let eventCard = document.createElement('div')
        eventCard.classList.add('cards-table__card', 'cards-card');


        let imgName = item.brand.toLowerCase().replace(/\s/g, "_")

        eventCard.innerHTML = `<div class="cards-card__header">
                                    <div class="cards-card__date">${item.day + "." + paramsVariables.months[currentMonth.toLowerCase()]}</div>
                                    <div class="cards-card__logo">
                                        <img src="img/calendar/brands/${imgName}.svg" alt="${item.brand}">
                                    </div>
                                </div>
                                <div class="cards-card__title">Marie Claire x Gloria Jeans Wellness Day</div>
                                <div class="cards-card__tags">
                                    <div class="cards-card__tag">Spirit</div>
                                    <div class="cards-card__tag">Print/Digital</div>
                                    <div class="cards-card__tag">Имиджевая</div>
                                    <div class="cards-card__tag">100—500</div>
                                    <div class="cards-card__tag">спонсоры</div>
                                </div>`
        
        monthTable.appendChild(eventCard)

    })
}

function renderCaledar(eventsData) {
    const calendarWrap = document.querySelector('[data-js="calendarWrap"]');

    if(!calendarWrap) return

    calendarWrap.innerHTML = ''
}

function filter(eventsData) {
    let resultData = eventsData;

    renderCards(resultData);
    renderCaledar(resultData);
}

const calendarData = `[
    {
        "id": "",
        "name": "Конференция Территория свободной мысли",
        "year": "2019",
        "month": "февраль",
        "day": "28",
        "brand": "Антенна телесемь",
        "cluster": "Spirit",
        "department": "print/digital",
        "direction": "имиджевая",
        "number": "100-500",
        "sponsors": true
    },
    {
        "id": "",
        "name": "Marie Claire x Gloria Jeans Wellness Day",
        "year": "2019",
        "month": "Октябрь",
        "day": "10",
        "brand": "StarHit",
        "cluster": "spirit",
        "department": "print/digital",
        "direction": "имиджевая",
        "number": "<50",
        "sponsors": true
    },
    {
        "id": "",
        "name": "Бизнес-завтрак",
        "year": "2020",
        "month": "Ноябрь",
        "day": "15",
        "brand": "Psychologies",
        "cluster": "Spirit",
        "department": "print/digital",
        "direction": "имиджевая",
        "number": "<100",
        "sponsors": true
    },
    {
        "id": "",
        "name": "Конференция Территория свободной мысли",
        "year": "2019",
        "month": "февраль",
        "day": "21",
        "brand": "Доктор Питер",
        "cluster": "spirit",
        "department": "print/digital",
        "direction": "имиджевая",
        "number": "500-1000",
        "sponsors": true
    },
        {
        "id": "",
        "name": "Конференция Территория свободной мысли",
        "year": "2019",
        "month": "февраль",
        "day": "28",
        "brand": "Maxim",
        "cluster": "Spirit",
        "department": "print/digital",
        "direction": "имиджевая",
        "number": ">1000",
        "sponsors": true
    },
    {
        "id": "",
        "name": "Конференция Территория свободной мысли",
        "year": "2019",
        "month": "февраль",
        "day": "10",
        "brand": "Marie Claire",
        "cluster": "spirit",
        "department": "print/digital",
        "direction": "имиджевая",
        "number": "100-500",
        "sponsors": true
    },
    {
        "id": "",
        "name": "Бизнес-завтрак",
        "year": "2020",
        "month": "Ноябрь",
        "day": "15",
        "brand": "myDecor",
        "cluster": "Spirit",
        "department": "print/digital",
        "direction": "имиджевая",
        "number": "100-500",
        "sponsors": true
    },
    {
        "id": "",
        "name": "Конференция Территория свободной мысли",
        "year": "2019",
        "month": "февраль",
        "day": "21",
        "brand": "Вокруг Света",
        "cluster": "spirit",
        "department": "print/digital",
        "direction": "имиджевая",
        "number": "100-500",
        "sponsors": true
    },
    {
        "id": "",
        "name": "Конференция Территория свободной мысли",
        "year": "2019",
        "month": "февраль",
        "day": "21",
        "brand": "Parents",
        "cluster": "spirit",
        "department": "print/digital",
        "direction": "имиджевая",
        "number": "100-500",
        "sponsors": true
    },
    {
        "id": "",
        "name": "Конференция Территория свободной мысли",
        "year": "2019",
        "month": "февраль",
        "day": "21",
        "brand": "SMH",
        "cluster": "spirit",
        "department": "print/digital",
        "direction": "имиджевая",
        "number": "500-1000",
        "sponsors": true
    },
        {
        "id": "",
        "name": "Конференция Территория свободной мысли",
        "year": "2020",
        "month": "февраль",
        "day": "28",
        "brand": "theGirl",
        "cluster": "Spirit",
        "department": "print/digital",
        "direction": "имиджевая",
        "number": ">1000",
        "sponsors": true
    },
    {
        "id": "",
        "name": "Конференция Территория свободной мысли",
        "year": "2019",
        "month": "Октябрь",
        "day": "10",
        "brand": "Wday",
        "cluster": "spirit",
        "department": "print/digital",
        "direction": "имиджевая",
        "number": "100-500",
        "sponsors": true
    },
    {
        "id": "",
        "name": "Конференция Территория свободной мысли",
        "year": "2019",
        "month": "Март",
        "day": "3",
        "brand": "Woman",
        "cluster": "spirit",
        "department": "print/digital",
        "direction": "имиджевая",
        "number": "100-500",
        "sponsors": true
    }
]`

const paramsVariables = {
    months: {
        "январь": "01",
        "февраль": "02",
        "март": "03",
        "апрель": "04",
        "май": "05",
        "июнь": "06",
        "июль": "07",
        "август": "08",
        "сентябрь": "09",
        "октябрь": "10",
        "ноябрь": "11",
        "декабрь": "12",
    }
}