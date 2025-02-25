// Light-Dark Mode Switch
const themeToggler = document.querySelector(".theme-toggler");

themeToggler.addEventListener("click",()=>{
     document.body.classList.toggle("dark-theme-variables")
     themeToggler.querySelector("span:nth-child(1)").classList.toggle("active")
     themeToggler.querySelector("span:nth-child(2)").classList.toggle("active")
})

// Current Date Display
let now = new Date().toLocaleDateString("en-GB", { timeZone: "Europe/London" });

  let [day, month, year] = now.split("/");
  let formattedDate = `${day}<span class="slash">/</span>${month}<span class="slash">/</span>${year}`;

  document.getElementById("current-date").innerHTML = formattedDate;

// Show or Hidden aside Text
function asideText() {
     const slogan = document.querySelector("#slogan");
     const sidebar = document.querySelector("#sidebar")
     const aside = document.querySelector("aside");
     const arrow = document.querySelector(".show-text .material-symbols-sharp");
     const container = document.querySelector(".container");
   
     // Toggle the text
     aside.classList.toggle('hide-text');
     sidebar.classList.toggle('hide-text');
     slogan.classList.toggle('hide-slogan');
   
     // Change arrow direction
     if (aside.classList.contains("hide-text")) {
       arrow.textContent = "arrow_forward_ios"; // Arrow points left
       container.style.gridTemplateColumns = "6rem auto 16rem";
     } else {
       arrow.textContent = "arrow_back_ios_new"; // Arrow points right
       container.style.gridTemplateColumns = "13rem auto 16rem";
     }
   }