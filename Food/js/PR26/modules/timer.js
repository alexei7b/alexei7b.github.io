function timer(id, deadLine) {


    function getZero(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function getRemainingTime(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date);
        let days, hours, minutes, seconds;
        if (t < 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor(t / (1000 * 60 * 60) % 24);
            minutes = Math.floor(t / (1000 * 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }


        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock(selector, endTime) {
        const total = document.querySelector(selector);
        const days = total.querySelector('#days');
        const hours = total.querySelector('#hours');
        const minutes = total.querySelector('#minutes');
        const seconds = total.querySelector('#seconds');

        const timerID = setInterval(updateClock, 1000);

        updateClock();
        function updateClock() {
            const t = getRemainingTime(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t < 0) {
                clearInterval(timerID);
            }

        }

    }
    setClock(id, deadLine);
    console.log(getRemainingTime(deadLine));
    console.log('hello');
}

export default timer;