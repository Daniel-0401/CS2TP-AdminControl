const  sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu_bar');
const closeBtn = document.querySelector('#close_btn');


const themeToggler = document.querySelector('.theme-toggler');



menuBtn.addEventListener('click',()=>{
       sideMenu.style.display = "block"
})
closeBtn.addEventListener('click',()=>{
    sideMenu.style.display = "none"
})

themeToggler.addEventListener('click',()=>{
     document.body.classList.toggle('dark-theme-variables')
     themeToggler.querySelector('span:nth-child(1').classList.toggle('active')
     themeToggler.querySelector('span:nth-child(2').classList.toggle('active')
})


let now = new Date().toLocaleDateString("en-GB", { timeZone: "Europe/London" });

  let [day, month, year] = now.split("/");
  let formattedDate = `${day}<span class="slash">/</span>${month}<span class="slash">/</span>${year}`;

  document.getElementById("current-date").innerHTML = formattedDate;