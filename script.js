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

const isMobile = matchMedia("(max-width: 720px)").matches || matchMedia("(pointer: coarse)").matches
const finePointer = matchMedia("(pointer: fine)").matches

if (window.CursAnimation && finePointer && !isMobile) {
  CursAnimation.init({
    cursor: "ring",
    color: "#f3f0e8",
    color2: "#ffd84d",
    size: 32,
    movement: "elastic",
    magnetic: { enabled: true, radius: 90, strength: 0.35 },
    swarm: { enabled: true, count: 10, radius: 150, speed: 0.9, avoid: 50, hideCursor: true },
    trail: { enabled: false },
    clickEffects: { enabled: true, ripple: true, particles: true, count: 6 },
    hoverEffects: true,
    hoverScale: 1.7,
    touch: "tap"
  });
}

if (window.CursAnimation) {
  CursAnimation.rebuild({
    selector: ".reveal",
    threshold: 0.14,
    duration: isMobile ? 300 : 440,
    agents: isMobile ? 1 : 2,
    color: "auto",
    autoDark: "#111111",
    autoLight: "#f3f0e8",
    colors: ["#f3f0e8", "#ffd84d", "#5cc8ff", "#8b7cff", "#ff9ec4"],
    label: false,
    stagger: isMobile ? 0 : 60,
    maxConcurrent: isMobile ? 1 : 2,
    typeText: true,
    typeSelector: isMobile ? "h1,h2" : "h1,h2,h3,h4,h5,h6,p,li,blockquote",
    charDelay: isMobile ? 4 : 9,
    maxTypeDuration: isMobile ? 420 : 980,
    pen: true,
    revealClass: "visible"
  });
}
