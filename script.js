//Tạo tên biến cho id="theme_btn"
const theme_btn = document.getElementById("theme_btn");

//Kiểm tra localStorage khi tải trang
if (localStorage.getItem("theme") == "dark-theme") {
  document.body.classList.add("dark-theme");
  theme_btn.querySelector(".icon-light").style.display = "none";
  theme_btn.querySelector(".icon-dark").style.display = "block";
} else {
  document.body.classList.remove("dark-theme");
  theme_btn.querySelector(".icon-light").style.display = "block";
  theme_btn.querySelector(".icon-dark").style.display = "none";
}

//Tạo click cho id="theme_btn"
theme_btn.addEventListener("click", () => {
  //Tạo class dark-theme
  document.body.classList.toggle("dark-theme");
  
  //Lưu vào localStorage và cập nhật icon
  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark-theme");
    theme_btn.querySelector(".icon-light").style.display = "none";
    theme_btn.querySelector(".icon-dark").style.display = "block";
  } else {
    localStorage.setItem("theme", "light-theme");
    theme_btn.querySelector(".icon-light").style.display = "block";
    theme_btn.querySelector(".icon-dark").style.display = "none";
  }
});
