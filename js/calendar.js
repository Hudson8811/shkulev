document.addEventListener("DOMContentLoaded", () => {
    tabsInit()
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