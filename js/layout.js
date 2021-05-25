const createBtn = document.getElementById("create-btn");

createBtn.addEventListener("mouseover", function(){
    this.textContent = "+"
});

createBtn.addEventListener("mouseout", function(){
    this.textContent = ""
});