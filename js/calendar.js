const dataPath = 'https://raw.githubusercontent.com/Hudson8811/shkulev/main/data/events-data.json' // сюда вписываем адрес JSON-файла. Пример файла data/events-data.json

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

// фильтрация и отрисовка событий
function render(dataPath) {

    /*fetch(dataPath, {
        method: 'get'
    }).then(response => response.json()).then(json => {

        const eventsData = json

        // сортируем данные
        eventsData.sort(function(a, b) {

            if(a.day == "") {
                a.day = 32
            }

            if(b.day == "") {
                b.day = 32
            }

            return parseFloat(a.year) - parseFloat(b.year) 
                || parseFloat(monthsNumbers[a.month.toLowerCase()]) - parseFloat(monthsNumbers[b.month.toLowerCase()])
                || (parseFloat(a.day) - parseFloat(b.day));
        });

        // присваиваем id
        eventsData.forEach((dataItem, i) => {
            dataItem.id = 'e' + (i + 1)
        })

        // отриовываем фильтры
        renderFilter(eventsData)

        // выполняем первую отрисовку через фильтр
        filter(eventsData)

        // запускаем прослушивание фильтра
        const filterForm = document.querySelector('[data-js="filterForm"]');

        if(filterForm) {
            const filterInputs = filterForm.querySelectorAll('input')
        
            filterInputs.forEach(input => {
                input.addEventListener('change', () => {
                    filter(eventsData)
                })
            })
        }

    }).catch(function(err) {
        console.log("данные не найдены!")
        console.log(err)
    });*/

   const eventsData = JSON.parse(calendarData)

    // сортируем данные
    eventsData.sort(function(a, b) {

        if(a.day == "") {
            a.day = 32
        }

        if(b.day == "") {
            b.day = 32
        }

        return parseFloat(a.year) - parseFloat(b.year) 
            || parseFloat(monthsNumbers[a.month.toLowerCase()]) - parseFloat(monthsNumbers[b.month.toLowerCase()])
            || (parseFloat(a.day) - parseFloat(b.day));
    });

    // присваиваем id
    eventsData.forEach((dataItem, i) => {
        dataItem.id = 'e' + (i + 1)
    })

    // отриовываем фильтры
    renderFilter(eventsData)

    // выполняем первую отрисовку через фильтр
    filter(eventsData)

    // запускаем прослушивание фильтра
    const filterForm = document.querySelector('[data-js="filterForm"]');

    if(filterForm) {
        const filterInputs = filterForm.querySelectorAll('input')
    
        filterInputs.forEach(input => {
            input.addEventListener('change', () => {
                filter(eventsData)
            })
        })

        const filterClearBtns = filterForm.querySelectorAll('[data-js="filterFieldClear"]')

        filterClearBtns.forEach(clearBtn => {
            clearBtn.addEventListener('click', (e) => {
                let filterField = e.target.closest('[data-js="filterParam"]')
                let filterCheckedInputs = [...filterField.querySelectorAll('input')].filter(input => input.checked)

                filterField.classList.remove('checked')
                filterCheckedInputs.forEach(input => {
                    input.checked = false
                })
                filter(eventsData)
            })
        })
    }

    // Инициализируем модальное окно

    const detailEventModal = new HystModal({
        linkAttributeName: "data-hystmodal",
        beforeOpen: function(modal) {
            let targetEvent = eventsData.find(item => item.id === modal.starter.getAttribute('data-event-id'))
            let modalContent = modal._modalBlock.querySelector('[data-js="eventModalContent"]')
            
            modalContent.innerHTML = `
                                    <div class="event-modal__header">
                                    <div class="event-modal__date">${parseFloat(targetEvent.day) < 32 ? targetEvent.day + " " + monthsDeclination[targetEvent.month.toLowerCase().trim()] : ""}</div>
                                    <div class="event-modal__logo">
                                        <img src="img/calendar/brands/${targetEvent.brand.toLowerCase().replace(/\s/g, "_")}.svg" alt="${targetEvent.brand}">
                                    </div>
                                    </div>
                                    <div class="event-modal__title">${targetEvent.name}</div>
                                    <div class="event-modal__text" data-js="eventModalText"></div>
                                    <div class="event-modal__tags">
                                        ${targetEvent.cluster ? '<div class="event-modal__tag">' + targetEvent.cluster + '</div>' : ''}
                                        ${targetEvent.department ? '<div class="event-modal__tag">' + targetEvent.department + '</div>' : ''}
                                        ${targetEvent.direction ? '<div class="event-modal__tag">' + targetEvent.direction + '</div>' : ''}
                                        ${targetEvent.number ? '<div class="event-modal__tag">' + targetEvent.number + '</div>' : ''}
                                        ${targetEvent.sponsors.toLowerCase().trim() == "да" ? '<div class="event-modal__tag">Спонсоры</div>' : ''}
                                </div>
                                    `   

            let modalContentText = modalContent.querySelector('[data-js="eventModalText"]');

            targetEvent.text.split('<br>').forEach(item => {
                let textItem = document.createElement('p')
                textItem.innerHTML = item.trim()
                modalContentText.appendChild(textItem)
            })

            console.log(targetEvent);
            console.log(modalContent);
        },
        afterClose: function(modal){
            let modalContent = modal._modalBlock.querySelector('[data-js="eventModalContent"]')
            modalContent.innerHTML = ''
        },
    });


} 

// отрисовывает карточки
function renderCards(eventsData) {
    const cardsWrap = document.querySelector('[data-js="cardsWrap"]');

    if(!cardsWrap) return

    if(eventsData.length < 1) {
        cardsWrap.innerHTML = notFoundTemplate
        return
    }

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

            currentMonth = item.month
            monthBlock = document.createElement('div')
            monthBlock.classList.add('cards__month', 'month');
            monthBlock.innerHTML = `<div class="month__title">${currentMonth}</div>`
            monthTable = document.createElement('div')
            monthTable.classList.add('month__table', 'cards-table');
            monthBlock.appendChild(monthTable)
            yearBlock.appendChild(monthBlock)

        } else if(currentMonth.toLowerCase() !== item.month.toLowerCase()) {

            currentMonth = item.month
            monthBlock = document.createElement('div')
            monthBlock.classList.add('cards__month', 'month');
            monthBlock.innerHTML = `<div class="month__title">${currentMonth}</div>`
            monthTable = document.createElement('div')
            monthTable.classList.add('month__table', 'cards-table');
            monthBlock.appendChild(monthTable)
            yearBlock.appendChild(monthBlock)

        }

        let eventCard = document.createElement('a')
        eventCard.classList.add('cards-table__card', 'cards-card');
        eventCard.setAttribute('data-event-id', item.id);
        eventCard.setAttribute('href', 'javascript:void(0)');
        eventCard.setAttribute('data-hystmodal', '#detailEventModal');

        eventCard.innerHTML = `<div class="cards-card__header">
                                    <div class="cards-card__date">${parseFloat(item.day) < 32 ? item.day + "." + monthsNumbers[currentMonth.toLowerCase()]: ""}</div>
                                    <div class="cards-card__logo">
                                        <img src="img/calendar/brands/${item.brand.toLowerCase().replace(/\s/g, "_")}.svg" alt="${item.brand}">
                                    </div>
                                </div>
                                <div class="cards-card__title">${item.name}</div>
                                <div class="cards-card__tags">
                                    ${item.cluster ? '<div class="cards-card__tag">' + item.cluster + '</div>' : ''}
                                    ${item.department ? '<div class="cards-card__tag">' + item.department + '</div>' : ''}
                                    ${item.direction ? '<div class="cards-card__tag">' + item.direction + '</div>' : ''}
                                    ${item.number ? '<div class="cards-card__tag">' + item.number + '</div>' : ''}
                                    ${item.sponsors.toLowerCase().trim() == "да" ? '<div class="cards-card__tag">Спонсоры</div>' : ''}
                                </div>`
        
        monthTable.appendChild(eventCard)

    })
}

// отрисовывает календарь
function renderCaledar(eventsData, sortToBottom=true) {
    const calendarWrap = document.querySelector('[data-js="calendarWrap"]');
    const monthTableHeader = `
                                    <div class="calendar-table__row calendar-table__row--header">
                                        <div class="calendar-table__cell">
                                            <div class="calendar-cell__day">пн</div>
                                        </div>
                                        <div class="calendar-table__cell">
                                            <div class="calendar-cell__day">вт</div>
                                        </div>
                                        <div class="calendar-table__cell">
                                            <div class="calendar-cell__day">ср</div>
                                        </div>
                                        <div class="calendar-table__cell">
                                            <div class="calendar-cell__day">чт</div>
                                        </div>
                                        <div class="calendar-table__cell">
                                            <div class="calendar-cell__day">пт</div>
                                        </div>
                                        <div class="calendar-table__cell">
                                            <div class="calendar-cell__day">сб</div>
                                        </div>
                                        <div class="calendar-table__cell">
                                            <div class="calendar-cell__day">вс</div>
                                        </div>
                                    </div>
                            `

    if(!calendarWrap) return

    if(eventsData.length < 1) {
        calendarWrap.innerHTML = notFoundTemplate
        return
    }

    calendarWrap.innerHTML = ''

    console.log(eventsData)

    // первый год
    let currentYear = eventsData[sortToBottom ? eventsData.length - 1 : 0].year;
    let yearBlock = document.createElement('div')
    yearBlock.classList.add('calendar__year', 'year');
    yearBlock.setAttribute('data-filter-name', 'year');
    yearBlock.setAttribute('data-filter-value', currentYear);
    yearBlock.innerHTML = `<div class="year__title">${currentYear}</div>`
    
    //первый месяц
    let currentMonth = eventsData[sortToBottom ? eventsData.length - 1 : 0].month;
    let monthBlock = document.createElement('div')
    monthBlock.classList.add('calendar__month', 'month');
    monthBlock.innerHTML = `<div class="month__title">${currentMonth}</div>`

    // таблица первого месяца
    let monthTable = document.createElement('div')
    monthTable.classList.add('month__table', 'calendar-table');
    monthTable.innerHTML = getMonthTemplate(currentYear, monthsNumbers[currentMonth.toLowerCase().trim()], monthTableHeader)

    monthBlock.appendChild(monthTable)
    yearBlock.appendChild(monthBlock)
    calendarWrap.appendChild(yearBlock)

    if(sortToBottom) {
        eventsData = eventsData.reverse()
    }

    eventsData.forEach(item => {

        if(currentYear !== item.year) {
            currentYear = item.year
            yearBlock = document.createElement('div')
            yearBlock.classList.add('calendar__year', 'year');
            yearBlock.setAttribute('data-filter-name', 'year');
            yearBlock.setAttribute('data-filter-value', currentYear);
            yearBlock.innerHTML = `<div class="year__title">${currentYear}</div>`
            calendarWrap.appendChild(yearBlock)

            currentMonth = item.month
            monthBlock = document.createElement('div')
            monthBlock.classList.add('cards__month', 'month');
            monthBlock.innerHTML = `<div class="month__title">${currentMonth}</div>`
            monthTable = document.createElement('div')
            monthTable.classList.add('month__table', 'calendar-table');
            monthTable.innerHTML = getMonthTemplate(currentYear, monthsNumbers[currentMonth.toLowerCase().trim()], monthTableHeader)
            monthBlock.appendChild(monthTable)
            yearBlock.appendChild(monthBlock)

        } else if(currentMonth.toLowerCase() !== item.month.toLowerCase()) {

            currentMonth = item.month
            monthBlock = document.createElement('div')
            monthBlock.classList.add('cards__month', 'month');
            monthBlock.innerHTML = `<div class="month__title">${currentMonth}</div>`;
            monthTable = document.createElement('div');
            monthTable.classList.add('month__table', 'calendar-table');
            monthTable.innerHTML = getMonthTemplate(currentYear, monthsNumbers[currentMonth.toLowerCase().trim()], monthTableHeader)
            monthBlock.appendChild(monthTable)
            yearBlock.appendChild(monthBlock)

        }

        let calendarEvent = document.createElement('a');
        calendarEvent.classList.add('calendar-cell__event', "calendar-cell__event--" + brandsClasses[item.brand]);
        calendarEvent.setAttribute('data-event-id', item.id);
        calendarEvent.setAttribute('href', 'javascript:void(0)');
        calendarEvent.setAttribute('data-hystmodal', '#detailEventModal');
        calendarEvent.innerHTML = item.name;

        if(item.day < 32) {
            let targetCell = monthTable.querySelector(`[data-date="${item.year}-${monthsNumbers[currentMonth.toLowerCase().trim()]}-${item.day}"]`)
            targetCell.appendChild(calendarEvent)
        } else {
            let noDayEventsList = monthBlock.querySelector('[data-js="noDayEventsList"]')

            if(noDayEventsList) {
                noDayEventsList.appendChild(calendarEvent)
            } else {
                let noDayEventsBlock = document.createElement('div')
                noDayEventsBlock.classList.add('noday-events')
                noDayEventsBlock.innerHTML = `
                                                <div class="noday-events__title">Без даты</div>
                                                <div class="noday-events__list" data-js="noDayEventsList"></div>
                                             `

                monthBlock.appendChild(noDayEventsBlock)

                let noDayEventsList = noDayEventsBlock.querySelector('[data-js="noDayEventsList"]')
                noDayEventsList.appendChild(calendarEvent)

            }
        } 
    })

    //showMore(calendarWrap)
}

function renderFilter(eventsData) {
    const filterForm = document.querySelector('[data-js="filterForm"]')

    if(!filterForm) return
    
    // добавляем только те годы что есть в данных
    const yearFields = filterForm.querySelector('[data-id="year"] [data-js="filterParamBody"]')
    const dataYearsList = [...new Set(eventsData.map(item => item.year))]
    
    yearFields.innerHTML = ''
    
    dataYearsList.forEach(currentYear => {
        let id = 'year' + currentYear
        let label = document.createElement('label');
        label.classList.add('filter-field')
        label.setAttribute('for', id)
        
        label.innerHTML = `
                            <input type="checkbox" class="filter-field__input" id="${id}" name="year" value="${currentYear}">
                            <div class="filter-field__view">
                                <span class="filter-field__icon" data-js="filterFieldDelete">                                        
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4714 3.52858C12.7318 3.78892 12.7318 4.21103 12.4714 4.47138L4.47145 12.4714C4.2111 12.7317 3.78899 12.7317 3.52864 12.4714C3.26829 12.211 3.26829 11.7889 3.52864 11.5286L11.5286 3.52858C11.789 3.26823 12.2111 3.26823 12.4714 3.52858Z" fill="currentColor"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.52864 3.52858C3.78899 3.26823 4.2111 3.26823 4.47145 3.52858L12.4714 11.5286C12.7318 11.7889 12.7318 12.211 12.4714 12.4714C12.2111 12.7317 11.789 12.7317 11.5286 12.4714L3.52864 4.47138C3.26829 4.21103 3.26829 3.78892 3.52864 3.52858Z" fill="currentColor"/>
                                    </svg> 
                                </span>
                                <span class="filter-field__name">${currentYear}</span>
                            </div>
                        `
                                    
        yearFields.appendChild(label)
    }) 
    
    yearFields.innerHTML = yearFields.innerHTML + `
                                                    <button class="filter-param__clear" data-js="filterFieldClear">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4714 3.52858C12.7318 3.78892 12.7318 4.21103 12.4714 4.47138L4.47145 12.4714C4.2111 12.7317 3.78899 12.7317 3.52864 12.4714C3.26829 12.211 3.26829 11.7889 3.52864 11.5286L11.5286 3.52858C11.789 3.26823 12.2111 3.26823 12.4714 3.52858Z" fill="currentColor"/>
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.52864 3.52858C3.78899 3.26823 4.2111 3.26823 4.47145 3.52858L12.4714 11.5286C12.7318 11.7889 12.7318 12.211 12.4714 12.4714C12.2111 12.7317 11.789 12.7317 11.5286 12.4714L3.52864 4.47138C3.26829 4.21103 3.26829 3.78892 3.52864 3.52858Z" fill="currentColor"/>
                                                        </svg>  
                                                        Очистить                                           
                                                    </button>
                                                `
}

//фильтрует и перерисовывает события
function filter(eventsData) {
    let resultData = eventsData;
    
    const filterForm = document.querySelector('[data-js="filterForm"]');

    if(filterForm) {
        const filterFieldsList = filterForm.querySelectorAll('[data-js="filterParam"]')

        filterFieldsList.forEach(filterField => {
            let fieldCheckedInputs = [...filterField.querySelectorAll('input')].filter(input => input.checked)
            let fieldCheckedCount = filterField.querySelector('[data-js="filterParamCount"]')

            filterField.classList.remove('checked')

            if(fieldCheckedCount) {
                fieldCheckedCount.innerHTML = ''
            }

            if(fieldCheckedInputs.length > 0) {
                let fieldCheckedValues = fieldCheckedInputs.map(input => input.value.toLowerCase())

                filterField.classList.add('checked')
                if(fieldCheckedCount) {
                    fieldCheckedCount.innerHTML = fieldCheckedValues.length
                }

                resultData = resultData.filter(item => {
                    return fieldCheckedValues.indexOf(item[fieldCheckedInputs[0].getAttribute('name')].toLowerCase()) != -1
                })

            }
        })

        const resultCountBlock = filterForm.querySelector('[data-js="filterCount"] span');
        resultCountBlock.innerText = `${resultData.length} ${numWord(resultData.length, ['событие', 'события', 'событий'])}`
    }

    renderCards(resultData);
    renderCaledar(resultData);
}

const calendarData = `[
    {
        "id": "",
        "name": "Фестиваль Вокруг света: вокруг материков",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "февраль",
        "day": "28",
        "brand": "Вокруг света",
        "cluster": "spirit",
        "department": "general",
        "direction": "Бизнес-форматы",
        "number": "100-500",
        "sponsors": "нет"
    },
    {
        "id": "",
        "name": "Юбилей",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "Октябрь",
        "day": "10",
        "brand": "Антенна телесемь",
        "cluster": "curiosity",
        "department": "digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Beauty-девичник Woman.ru",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2024",
        "month": "июль",
        "day": "15",
        "brand": "Woman",
        "cluster": "Corporate",
        "department": "print",
        "direction": "Развлекательная",
        "number": "до 100",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Ужин в Каспийка",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "2",
        "brand": "theGirl",
        "cluster": "spirit",
        "department": "general",
        "direction": "Бизнес-форматы",
        "number": "100-500",
        "sponsors": "нет"
    },
    {
        "id": "",
        "name": "Юбилей",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "2",
        "brand": "Антенна телесемь",
        "cluster": "curiosity",
        "department": "digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Beauty-девичник Woman.ru",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "февраль",
        "day": "2",
        "brand": "Woman",
        "cluster": "Corporate",
        "department": "print",
        "direction": "Развлекательная",
        "number": "до 100",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Фестиваль Вокруг света: вокруг материков",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2024",
        "month": "сентябрь",
        "day": "2",
        "brand": "Вокруг света",
        "cluster": "spirit",
        "department": "general",
        "direction": "Бизнес-форматы",
        "number": "100-500",
        "sponsors": "нет"
    },
    {
        "id": "",
        "name": "Бизнес завтрак",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "2",
        "brand": "Доктор Питер",
        "cluster": "curiosity",
        "department": "digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Beauty-девичник Woman.ru",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "2",
        "brand": "Woman",
        "cluster": "Corporate",
        "department": "print",
        "direction": "Развлекательная",
        "number": "до 100",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Фестиваль Вокруг света: вокруг материков",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "5",
        "brand": "Вокруг света",
        "cluster": "spirit",
        "department": "general",
        "direction": "Бизнес-форматы",
        "number": "100-500",
        "sponsors": "нет"
    },
    {
        "id": "",
        "name": "Юбилей",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "5",
        "brand": "Антенна телесемь",
        "cluster": "curiosity",
        "department": "digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Beauty-девичник Woman.ru",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "5",
        "brand": "Woman",
        "cluster": "Corporate",
        "department": "print",
        "direction": "Развлекательная",
        "number": "до 100",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Конференция Территория свободной мысли",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "25",
        "brand": "Marie Claire",
        "cluster": "Corporate",
        "department": "print",
        "direction": "Развлекательная",
        "number": "до 100",
        "sponsors": "нет"
    },
    {
        "id": "",
        "name": "Фестиваль Вокруг света: вокруг материков",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "6",
        "brand": "Вокруг света",
        "cluster": "spirit",
        "department": "general",
        "direction": "Бизнес-форматы",
        "number": "100-500",
        "sponsors": "нет"
    },
    {
        "id": "",
        "name": "Юбилей",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "6",
        "brand": "Антенна телесемь",
        "cluster": "curiosity",
        "department": "digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Beauty-девичник Woman.ru",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "6",
        "brand": "Woman",
        "cluster": "Corporate",
        "department": "print",
        "direction": "Развлекательная",
        "number": "до 100",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Фестиваль Вокруг света: вокруг материков",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "27",
        "brand": "Вокруг света",
        "cluster": "spirit",
        "department": "general",
        "direction": "Бизнес-форматы",
        "number": "100-500",
        "sponsors": "нет"
    },
    {
        "id": "",
        "name": "Юбилей",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "7",
        "brand": "Антенна телесемь",
        "cluster": "curiosity",
        "department": "digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Beauty-девичник Woman.ru",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "7",
        "brand": "Woman",
        "cluster": "Corporate",
        "department": "print",
        "direction": "Развлекательная",
        "number": "до 100",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Фестиваль Вокруг света: вокруг материков",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "8",
        "brand": "Вокруг света",
        "cluster": "spirit",
        "department": "general",
        "direction": "Бизнес-форматы",
        "number": "100-500",
        "sponsors": "нет"
    },
    {
        "id": "",
        "name": "Юбилей",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "8",
        "brand": "Антенна телесемь",
        "cluster": "curiosity",
        "department": "digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Beauty-девичник Woman.ru",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "8",
        "brand": "Woman",
        "cluster": "Corporate",
        "department": "print",
        "direction": "Развлекательная",
        "number": "до 100",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Beauty-девичник Woman.ru",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "11",
        "brand": "Woman",
        "cluster": "Corporate",
        "department": "print",
        "direction": "Развлекательная",
        "number": "до 100",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Юбилей",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "12",
        "brand": "Антенна телесемь",
        "cluster": "curiosity",
        "department": "digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Мероприятие Maxim",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "февраль",
        "day": "25",
        "brand": "Maxim",
        "cluster": "Corporate",
        "department": "print",
        "direction": "Развлекательная",
        "number": "до 100",
        "sponsors": "нет"
    },
    {
        "id": "",
        "name": "Мероприятие myDecor",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "февраль",
        "day": "2",
        "brand": "myDecor",
        "cluster": "Corporate",
        "department": "print",
        "direction": "Развлекательная",
        "number": "до 100",
        "sponsors": "нет"
    },
    {
        "id": "",
        "name": "Мероприятие Parents",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "февраль",
        "day": "2",
        "brand": "Parents",
        "cluster": "Corporate",
        "department": "print",
        "direction": "Развлекательная",
        "number": "до 100",
        "sponsors": "нет"
    },
    {
        "id": "",
        "name": "Мероприятие Psychologies",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "февраль",
        "day": "2",
        "brand": "Psychologies",
        "cluster": "Corporate",
        "department": "general",
        "direction": "Развлекательная",
        "number": "100-500",
        "sponsors": "нет"
    },
    {
        "id": "",
        "name": "Мероприятие SMH",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "февраль",
        "day": "20",
        "brand": "SMH",
        "cluster": "Corporate",
        "department": "general",
        "direction": "Развлекательная",
        "number": "500-1000",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Marie Claire x Gloria Jeans Wellness Day",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "февраль",
        "day": "20",
        "brand": "StarHit",
        "cluster": "Corporate",
        "department": "general",
        "direction": "Развлекательная",
        "number": "100-500",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Marie Claire x Gloria Jeans Wellness Day",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "май",
        "day": "20",
        "brand": "StarHit",
        "cluster": "Corporate",
        "department": "general",
        "direction": "Развлекательная",
        "number": "100-500",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Мероприятие Wday",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "февраль",
        "day": "20",
        "brand": "Wday",
        "cluster": "Corporate",
        "department": "general",
        "direction": "Развлекательная",
        "number": "100-500",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Beauty-девичник Woman.ru",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "февраль",
        "day": "12",
        "brand": "Woman",
        "cluster": "Corporate",
        "department": "print",
        "direction": "Развлекательная",
        "number": "до 100",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Бизнес завтрак",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "13",
        "brand": "Доктор Питер",
        "cluster": "curiosity",
        "department": "digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Юбилей",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "13",
        "brand": "Антенна телесемь",
        "cluster": "curiosity",
        "department": "digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Beauty-девичник Woman.ru",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "12",
        "brand": "Woman",
        "cluster": "Corporate",
        "department": "print",
        "direction": "Познав.-образов-льная",
        "number": "свыше 1000",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Бизнес завтрак",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "",
        "brand": "Доктор Питер",
        "cluster": "curiosity",
        "department": "digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Юбилей",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "",
        "brand": "Антенна телесемь",
        "cluster": "curiosity",
        "department": "digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Beauty-девичник Woman.ru",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "октябрь",
        "day": "",
        "brand": "Woman",
        "cluster": "Corporate",
        "department": "print",
        "direction": "Познав.-образов-льная",
        "number": "до 100",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Бизнес завтрак",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "февраль",
        "day": "13",
        "brand": "Доктор Питер",
        "cluster": "curiosity",
        "department": "digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Ужин в Каспийка",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2023",
        "month": "февраль",
        "day": "13",
        "brand": "theGirl",
        "cluster": "curiosity",
        "department": "digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Доктор Питер",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2024",
        "month": "май",
        "day": "5",
        "brand": "Доктор Питер",
        "cluster": "curiosity",
        "department": "digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Доктор Питер",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2024",
        "month": "март",
        "day": "5",
        "brand": "Доктор Питер",
        "cluster": "curiosity",
        "department": "digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Юбилей",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2024",
        "month": "апрель",
        "day": "5",
        "brand": "Антенна телесемь",
        "cluster": "curiosity",
        "department": "Print/Digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Юбилей",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2024",
        "month": "февраль",
        "day": "5",
        "brand": "Антенна телесемь",
        "cluster": "curiosity",
        "department": "Print/Digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Юбилей",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2024",
        "month": "июнь",
        "day": "5",
        "brand": "Антенна телесемь",
        "cluster": "curiosity",
        "department": "Print/Digital",
        "direction": "имиджевая",
        "number": "до 50",
        "sponsors": "да"
    },
    {
        "id": "",
        "name": "Beauty-девичник Woman.ru",
        "text": "И вот сегодня Курбан наконец-то опубликовал видео со свадьбы. Бизнесмен и его избранница Валерия расписались в одном из столичных загсов. Невеста была безупречна в белом платье и вышагивала словно королева. <br>Счастливый Омаров в свою очередь гордо держал свидетельство о браке.",
        "year": "2024",
        "month": "июль",
        "day": "5",
        "brand": "Woman",
        "cluster": "Corporate",
        "department": "print",
        "direction": "Развлекательная",
        "number": "до 100",
        "sponsors": "да"
    }
]`

// месяцы по номерам
const monthsNumbers = {
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

// склонение месяцев
const monthsDeclination = {
    "январь": "января",
    "февраль": "февраля",
    "март": "марта",
    "апрель": "апреля",
    "май": "мая",
    "июнь": "июня",
    "июль": "июля",
    "август": "августа",
    "сентябрь": "сентября",
    "октябрь": "октября",
    "ноябрь": "ноября",
    "декабрь": "декабря",
}

//классы брендов
const brandsClasses = {
    "Антенна телесемь": "at7",
    "Вокруг света": "around-world",
    "Доктор Питер": "doctor-piter",
    "Marie Claire": "marie-claire",
    "Maxim": "maxim",
    "myDecor": "mydecor",
    "Parents": "parents",
    "Psychologies": "psychologies",
    "SMH": "smh",
    "StarHit": "starhit",
    "theGirl": "thegirl",
    "Wday": "wday",
    "Woman": "woman"
}

// Разметка пустого результата фильтрации
const notFoundTemplate = `
                            <div class="empty-filter-message">
                                <div class="empty-filter-message__title">Мероприятия не найдены!</div>
                                <div class="empty-filter-message__text">Попробуйте изменить настройки фильтра.</div>
                            <div>
                        `

//склонение числительных
function numWord(value, words) {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num == 1) return words[0];
    return words[2];
}

// запрещет отправку формы
function submitFilterform(e) {
    e.preventDefault();
    return false;
}

//формирует шаблон месяца
function getMonthTemplate(year, month, header) {
    let template = ''
    let isCurrentMonth = false;
    let date = new Date()
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    let currentDate = date.getDate();

    if(year == currentYear && parseInt(month) == currentMonth) {
        isCurrentMonth = true;
    }

    //первый день месяца
    let monthFirstDay = new Date(year + "-" + month + "-01").getDay();
    if(monthFirstDay === 0) {
        monthFirstDay = 7;
    }

    //количество дней в месяце
    let monthLength = new Date(year, month, 0).getDate();

    //количество строк месяца
    let monthRowsNumber = Math.ceil((monthLength + monthFirstDay - 1) / 7)

    let beginningSpaces = monthFirstDay - 1;
    let endSpaces = (monthRowsNumber * 7) - (monthLength + monthFirstDay - 1);

    for(let i = 1; i <= monthRowsNumber; i++) {
        let currentCells = '';

        for(let j = 1; j <= 7; j++) {
            if((i == 1 && j <= beginningSpaces) || (i == monthRowsNumber && j > 7 - endSpaces)) {
                currentCells += `
                                    <div class="calendar-table__cell calendar-cell calendar-cell--empty"></div> 
                                `
            }  else {
                let currentDay = ((i - 1) * 7 - beginningSpaces) + j
                let isCurrentDate = false

                if(isCurrentMonth && currentDay == currentDate) {
                    isCurrentDate = true
                }

                currentCells += `
                                    <div class="calendar-table__cell calendar-cell">
                                        <div class="calendar-cell__day ${isCurrentDate ? 'calendar-cell__day--current' : ''}">${currentDay}</div>
                                        <div class="calendar-cell__events has-scroll" data-date="${year + "-" + month + "-" + currentDay}"></div>
                                    </div>
                                `
            }              
        }

        template += `
                        <div class="calendar-table__row">
                            ${currentCells}
                        </div>
                    `
    }

    return header + template
}

function showMore(currentViewBlock) {

    let hiddenMonths = currentViewBlock.querySelectorAll(".month.hidden");
    let hiddenYears = currentViewBlock.querySelectorAll(".year.hidden");
    let showMoreBtn = currentViewBlock.querySelector('[data-js="showMoreBtn"]');

    console.log(hiddenMonths)

    console.log(hiddenYears)

    if(hiddenMonths.length < 4) {
        //showMoreBtn.classList.add('hidden')
    }

    for(let i = hiddenMonths.length; i < hiddenMonths.length - 3; i--) {
        hiddenMonths[i - 1].classList.remove("hidden")
    }

    hiddenYears.forEach(year => {
        if(year.querySelectorAll('.month').length !== year.querySelectorAll('.month.hidden').length) {
            year.classList.remove("hidden")
        }
    })
}

/*function calendarCellsScroll() {

    const block = document.getElementById('block');
    const hasVerScroll= block.scrollHeight > block.clientHeight;
    const hasHorScroll= block.scrollWidth > block.clientWidth;

    var total = scroll.scrollTop + scroll.clientHeight;

    if(total == content.clientHeight)
        alert('Reached bottom!');
}*/