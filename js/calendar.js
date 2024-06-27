document.addEventListener("DOMContentLoaded", () => {
    tabsInit()
    sidebarController()
    filterSpoilersController()
    renderCards()
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

function renderCards() {
    const cardsWrap = document.querySelector('[data-js="cardsWrap"]');

    if(!cardsWrap) return

    calendarData.forEach(yearItem => {
        //Год
        let yearBlock = document.createElement('div')
        yearBlock.classList.add('cards__year', 'year');
        yearBlock.innerHTML = `<div class="year__title">${yearItem.year}</div>`

        yearItem.months.forEach(monthItem => {
            //Месяц
            let monthBlock = document.createElement('div')
            monthBlock.classList.add('cards__month', 'month');
            monthBlock.innerHTML = `<div class="month__title">${monthItem.month}</div>`

            //Таблица месяца
            let monthTable = document.createElement('div')
            monthTable.classList.add('month__table', 'cards-table');

            //Заполнение таблицы месяца
            let eventsList = monthItem.events

            eventsList.sort(function(a, b) {
                return parseFloat(a.day) - parseFloat(b.day);
            });

            eventsList.forEach(eventItem => {
                let eventCard = document.createElement('div')

                eventCard.classList.add('cards-table__card', 'cards-card');

                eventCard.innerHTML = `<div class="cards-card__header">
                                            <div class="cards-card__date">${eventItem.day + "." + paramsVariables.months[monthItem.month.toLowerCase()]}</div>
                                            <div class="cards-card__logo">
                                                <img src="img/calendar/brands/starHit.svg" alt="brand logo">
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
           


            monthBlock.appendChild(monthTable)
            yearBlock.appendChild(monthBlock)
            cardsWrap.appendChild(yearBlock)
        })

        console.log(yearBlock)
    })
}

const calendarData = [
    {
        "year": "2019",
        "months": [
            {
                "month": "февраль",
                "events": [
                    {
                        "id": "Конференция Территория свободной мысли",
                        "name": "Конференция Территория свободной мысли",
                        "day": "28",
                        "brand": "Антенна телесемь",
                        "cluster": "Spirit",
                        "department": "PRINT/DIGITAL",
                        "direction": "ИМИДЖЕВАЯ",
                        "number": 300,
                        "sponsors": true
                    },
                    {
                        "id": "Конференция Территория свободной мысли",
                        "name": "Конференция Территория свободной мысли",
                        "day": "21",
                        "brand": "Антенна телесемь",
                        "cluster": "Spirit",
                        "department": "PRINT/DIGITAL",
                        "direction": "ИМИДЖЕВАЯ",
                        "number": 300,
                        "sponsors": true
                    }
                ]
                
            },
            {
                "month": "Октябрь",
                "events": [
                    {
                        "id": "Marie Claire x Gloria Jeans Wellness Day",
                        "name": "Marie Claire x Gloria Jeans Wellness Day",
                        "day": "10",
                        "brand": "starHit",
                        "cluster": "Spirit",
                        "department": "PRINT/DIGITAL",
                        "direction": "ИМИДЖЕВАЯ",
                        "number": 300,
                        "sponsors": true
                    }
                ]
                
            }  
        ]
    },
    {
        "year": "2020",
        "months": [
            {
                "month": "Ноябрь",
                "events": [
                    {
                        "id": "Бизнес-завтрак",
                        "name": "Бизнес-завтрак",
                        "day": "15",
                        "brand": "Psychologies",
                        "cluster": "Spirit",
                        "department": "PRINT/DIGITAL",
                        "direction": "ИМИДЖЕВАЯ",
                        "number": 300,
                        "sponsors": true
                    }
                ]
                
            }  
        ]
    },

]

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