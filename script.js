const menuButton = document.querySelector(".menu-button")
const navigation = document.querySelector(".nav")
const navigationLinks = document.querySelectorAll(".nav a")

const closeMenu = () => {
  navigation.classList.remove("open")
  document.body.classList.remove("menu-open")
  menuButton.setAttribute("aria-expanded", "false")
}

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open")
  document.body.classList.toggle("menu-open", isOpen)
  menuButton.setAttribute("aria-expanded", String(isOpen))
})

navigationLinks.forEach(link => link.addEventListener("click", closeMenu))
