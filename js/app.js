let clickToShowSkill = document.querySelector(".skillsshow");
let bars = document.querySelectorAll(".bar")
let skills = document.querySelectorAll(".skillsname");
let aboutbtn = document.querySelector("#aboutbtn");
// prendre le text content
// si textcontent alors rjouter bar+textcontent a chaque bar 


let skillArray = [];

aboutbtn.addEventListener("click", function(){
    skills.forEach(skill => {
        skillArray.push(skill.textContent)
    });
    console.log(skillArray)
    bars[0].classList.add(`bar${skillArray[0]}`)
    bars[1].classList.add(`bar${skillArray[1]}`)
    bars[2].classList.add(`bar${skillArray[2]}`)
    bars[3].classList.add(`bar${skillArray[3]}`)
    bars[4].classList.add(`bar${skillArray[4]}`)
});
