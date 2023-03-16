// Круг при повторном нажатии на луну не убирается
navigator.geolocation.getCurrentPosition(function(position){
    latitude  = position.coords.latitude; // широта
    longitude = position.coords.longitude; // долгота
    let start = 0;
    let end = 0;
    let check = true;
    let sunrise;
    let display
    console.log(latitude, longitude);
    let iframe = document.querySelector('iframe')
    function forward() {
        anime({
            targets: '.burger',
            translateY: ['0', '-100%'],
            easing: 'easeInOutQuad',
            direction: 'alternate',
            duration: 1000,
            loop: false
            
        });
        anime({
            targets: '.header__burger',
            height: ['324px', '60px'],
            easing: 'easeInOutQuad',
            direction: 'alternate',
            duration: 1000,
            loop: false
        })
        setTimeout(function(){
            let scroll1 = document.querySelector('.burger__menu');
            scroll1.style.display = "none";
        },1000)
    }
    function backward() {
        anime({
            targets: '.burger',
            translateY: ['-100%', '0'],
            easing: 'easeInOutQuad',
            direction: 'alternate',
            duration: 1000,
            loop: false
        });
        anime({
            targets: '.header__burger',
            height: ['60px', '324px'],
            easing: 'easeInOutQuad',
            direction: 'alternate',
            duration: 1000,
            loop: false
        })
        setTimeout(function(){
            let scroll1 = document.querySelector('.burger__menu');
            scroll1.style.display = "block";
        },0)
    }
    let menu = document.querySelector('.burger__active');
    let condition = true;
    menu.addEventListener('click',function() {
        if (condition == true) { 
            condition = false;
            forward();
           } else {
            condition = true;
            backward();
           }
    })
    let parent = document.querySelector('.burger')
    parent.addEventListener('click',function(event) {
        if (event.target.classList.contains("menu__clouds")){
            remove_circle()
            event.target.classList.add("circle")
            iframe.src = "https://embed.windy.com/embed2.html?lat=" + latitude + "&lon=" + longitude + "&detailLat=" + latitude + "&detailLon=" + longitude + "&width=650&height=450&zoom=11&level=surface&overlay=clouds&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
            
        }
        if (event.target.classList.contains("menu__lighting")){
            remove_circle()
            event.target.classList.add("circle") 
            iframe.src = "https://www.lightpollutionmap.info/#zoom=14.21&" + latitude + "&" + longitude + "&layers=B0TFFFFFFFFFFFFFFFFFF"
        }
        if (event.target.classList.contains("menu__sattelite")){
            remove_circle()
            event.target.classList.add("circle")
            iframe.src = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1943.3677101879973!2d" + longitude + "!3d" + latitude + "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2sru!4v1666789401384!5m2!1sru!2sru"
        }  
        if (event.target.classList.contains("menu__moonphase")){
            remove_circle()
            event.target.classList.add("circle")
            iframe.src = "https://phasesmoon.com"
        }
  
        
        
    })
    function remove_circle(){
        let img = parent.querySelectorAll('img');
        for (let elem of img) {
            elem.classList.remove("circle");
        }
    }
    sunrise = document.querySelector(".menu__sunrise")
    display = document.querySelector(".main__calc")
    console.log(sunrise);
    sunrise.addEventListener('click',function() {
        if (check == true) { 
            check = false;
            display.style.display = "inline-block"
            sunrise.classList.add("circle2")
           } else {
            check = true;
            sunrise.classList.remove("circle2")
            display.style.display = "none"
           }
    })
        

    function remove_moon(){

    }
    //Восход и заход светила

    let form_lat = 0
    let form_dec = 0
    let timer_hours = 0
    let timer_minutes = 0
    let timer_seconds = 0
    let times_hours = 0
    let times_minutes = 0
    let times_seconds = 0
    let dec_hours = 0
    let dec_minutes = 0
    let dec_seconds = 0
    let button
    form_lat = document.querySelector('.form__lat')
    form_dec = document.querySelector('.form__dec')
    button = document.querySelector('.form__btn')
    button.addEventListener('click',function(){
        
        let res__rise = document.querySelector('.res__rise')
        let res__set = document.querySelector('.res__set')
        let res__timer = document.querySelector('.res__timer')
        let res__times = document.querySelector('.res__times')

        res__rise.value =  Number((Math.acos(( -Math.tan(-0.5063)) * (Math.tan(form_lat.value * (Math.PI / 180)))) / 15) * (180 / Math.PI) * 240)
        res__set.value =  Number((( Math.sin(-0.5063)) / (Math.cos(form_lat.value* (Math.PI / 180)))) / 15)

        timer_hours.value = Number((Math.floor((res__rise.value) / 3600) + 17)) 
        timer_minutes.value = Number((Math.floor((res__rise.value) / 60) % 60) + 45)
        timer_seconds.value = Number(((res__rise.value ) % 60) + 40.05)

        times_hours.value = Number(17 - (Math.floor((res__rise.value) / 3600))) 
        times_minutes.value = Number(45 - (Math.floor((res__rise.value) / 60) % 60))
        times_seconds.value = Number(40.05 - ((res__rise.value ) % 60))

        dec_hours.value = Number((Math.floor((form_dec.value * (Math.PI / 180)) / 3600))) 
        dec_minutes.value = Number((Math.floor((form_dec.value * (Math.PI / 180)) / 60) % 60))
        dec_seconds.value = Number(((form_dec.value * (Math.PI / 180)) % 60))

        res__timer.value = Number(((Math.floor((res__rise.value) / 3600) + 17)) + 1.00273790935 - ((Math.floor((form_dec.value * (Math.PI / 180)) / 3600))) * (366/365) % 24) + ":" + Number((((Math.floor((res__rise.value) / 60) % 60) + 45) + 1.00273790935 - ((Math.floor((form_dec.value * (Math.PI / 180)) / 60) % 60))) * (366/365) % 1440) + ":" + Number(((((res__rise.value ) % 60) + 40.05) + 1.00273790935 - (((form_dec.value * (Math.PI / 180)) % 60))) * (366/365) % 86400)
        res__times.value = Number(((17 - (Math.floor((res__rise.value) / 3600))) + 1.00273790935 - ((Math.floor((form_dec.value * (Math.PI / 180)) / 3600)))) * (366/365) % 24) + ":" + Number((45 - (Math.floor((res__rise.value) / 60) % 60)) + 1.00273790935 - ((Math.floor((form_dec.value * (Math.PI / 180)) / 60) % 60)) * (366/365) % 1440) + ":" + Number(((40.05 - ((res__rise.value ) % 60)) + 1.00273790935 - (((form_dec.value * (Math.PI / 180)) % 60))) * (366/365) % 86400)
    })
})
