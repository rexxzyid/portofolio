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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    closeMenu()
    menuButton.focus()
  }
})

const linkById = new Map()
navigationLinks.forEach((link) => {
  const id = link.getAttribute("href")
  if (id && id.startsWith("#")) linkById.set(id.slice(1), link)
})

const sections = document.querySelectorAll("main section[id]")

if ("IntersectionObserver" in window && sections.length) {
  const setActive = (id) => {
    navigationLinks.forEach((link) => {
      const active = link === linkById.get(id)
      link.classList.toggle("is-active", active)
      if (active) link.setAttribute("aria-current", "true")
      else link.removeAttribute("aria-current")
    })
  }

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
    if (visible.length) setActive(visible[0].target.id)
  }, { rootMargin: "-42% 0px -52% 0px", threshold: 0 })

  sections.forEach((section) => observer.observe(section))
}
