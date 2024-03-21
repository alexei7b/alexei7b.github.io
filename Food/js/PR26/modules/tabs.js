function tabs(tabsSelector, tabContentSelector, tabParentSelector, activeClsass) {

    const tabs = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabContentSelector),
        tabParent = document.querySelector(tabParentSelector);

    function hideTabContent() {
        tabContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });
        tabs.forEach(item => {
            item.classList.remove('activeClsass');
        });
    }
    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('activeClsass');
    }

    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    });

}

export default tabs;