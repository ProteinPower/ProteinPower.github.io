// Global state
let currentTheme = localStorage.getItem("theme") || "light"
let currentLang = localStorage.getItem("language") || "ru"

// Добавляем эти переменные после currentTheme
const moonIcon = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
</svg>`;

const sunIcon = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
</svg>`;

const globeIcon = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>`;

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme()
  initializeLanguage()
  initializeNavigation()
  initializeAnimations()
  initializeMobileMenu()
  setActiveNavLink()
})

// Theme Management
function initializeTheme() {
  document.body.setAttribute("data-theme", currentTheme)
  updateThemeToggleButton()
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light"
  document.body.setAttribute("data-theme", currentTheme)
  localStorage.setItem("theme", currentTheme)
  updateThemeToggleButton()
  updateNavbarBackground()
}

function updateThemeToggleButton() {
  const themeButtons = document.querySelectorAll(".theme-toggle")
  themeButtons.forEach((button) => {
    button.innerHTML = currentTheme === "light" ? moonIcon : sunIcon
    button.setAttribute("aria-label", `Switch to ${currentTheme === "light" ? "dark" : "light"} theme`)
  })
}
updateThemeToggleButton();

//function updateThemeToggleButton() {
//  const themeButtons = document.querySelectorAll(".theme-toggle")
//  themeButtons.forEach((button) => {
//    button.textContent = currentTheme === "light" ? "🌙" : "☀️"
//    button.setAttribute("aria-label", `Switch to ${currentTheme === "light" ? "dark" : "light"} theme`)
//  })
//}

// Language Management
function initializeLanguage() {
  document.body.setAttribute("data-lang", currentLang)
  updateLanguageToggleButton()
  updatePageTitle()
}

function toggleLanguage() {
  currentLang = currentLang === "ru" ? "en" : "ru"
  document.body.setAttribute("data-lang", currentLang)
  localStorage.setItem("language", currentLang)
  updateLanguageToggleButton()
  updatePageTitle()
}

function updateLanguageToggleButton() {
  const langButtons = document.querySelectorAll(".lang-toggle")
  langButtons.forEach((button) => {
    //button.textContent = currentLang === "ru" ? "EN" : "RU"
     const langText = currentLang === "ru" ? "EN" : "RU";
    button.innerHTML = globeIcon + langText
    button.setAttribute("aria-label", `Switch to ${currentLang === "ru" ? "English" : "Russian"}`)
  })
}
updateThemeToggleButton();

function updatePageTitle() {
  const titles = {
    ru: "Влад Тараканов — Продуктовый дизайнер",
    en: "Vlad Tarakanov — Product Designer",
  }
  document.title = titles[currentLang]
}

// Navigation Management
function initializeNavigation() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 80 // Account for fixed header
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
        closeMobileMenu()
      }
    })
  })

  // Navbar background on scroll
  let lastScrollY = window.scrollY
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    const currentScrollY = window.scrollY

    updateNavbarBackground()

    // Hide/show navbar on scroll (optional)
    //if (currentScrollY > lastScrollY && currentScrollY > 200) {
    //  navbar.style.transform = "translateY(-100%)"
    //} else {
    //  navbar.style.transform = "translateY(0)"
    //}

    //lastScrollY = currentScrollY
    //updateActiveNavLink()
  })
}

function updateNavbarBackground() {
  const navbar = document.querySelector(".navbar")
  const currentScrollY = window.scrollY

  if (currentScrollY > 100) {
    navbar.style.background = currentTheme === "light" ? "rgba(255, 255, 255, 0.98)" : "rgba(10, 10, 10, 0.98)"
  } else {
    navbar.style.background = currentTheme === "light" ? "rgba(255, 255, 255, 0.95)" : "rgba(10, 10, 10, 0.95)"
  }
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    const href = link.getAttribute("href")

    if (
      href === currentPage ||
      (currentPage === "index.html" && href === "#home") ||
      (currentPage === "" && href === "#home")
    ) {
      link.classList.add("active")
    }
  })
}

function updateActiveNavLink() {
  // Update active nav link based on scroll position
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]')
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link[href^="#"]')

  let currentSection = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id")
    }
  })

  // Обновляем активные ссылки в десктопном меню
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })

  // Обновляем активные ссылки в мобильном меню
  mobileNavLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })
}

// Mobile Menu Management
function initializeMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu)
  }

  // Close menu when clicking on mobile nav links
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  mobileNavLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      // Проверяем, что это не ссылка на внешнюю страницу
      const href = link.getAttribute("href")
      if (href && !href.startsWith("http") && !href.startsWith("mailto:")) {
        e.preventDefault()
        closeMobileMenu()
        
        // Плавная прокрутка к секции
        const targetId = href.split("#")[1]
        if (targetId) {
          const targetElement = document.getElementById(targetId)
          if (targetElement) {
            setTimeout(() => {
              targetElement.scrollIntoView({ 
                behavior: "smooth",
                block: "start"
              })
            }, 300) // Небольшая задержка для закрытия меню
          }
        }
      }
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    const mobileMenu = document.getElementById("mobileMenu")
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")

    if (
      mobileMenu &&
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      closeMobileMenu()
    }
  })

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileMenu()
    }
  })

  // Close menu on window resize (если экран стал больше)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu()
    }
  })
}
//////////
// Глобальная функция для вызова из HTML
 function toggleMobileMenu() {
  console.log("Кнопка нажата!") //fff
  const mobileMenu = document.getElementById("mobileMenu")
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")

  if (mobileMenu) {
    const isActive = mobileMenu.classList.contains("active")
    
    if (isActive) {
      closeMobileMenu()
    } else {
      openMobileMenu()
    }
  }
}


/////////



function openMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")

  if (mobileMenu && mobileMenuBtn) {
    mobileMenu.classList.add("active")
    mobileMenuBtn.classList.add("active")
    mobileMenuBtn.textContent = "✕"
    document.body.style.overflow = "hidden"
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")

  if (mobileMenu && mobileMenuBtn) {
    mobileMenu.classList.remove("active")
    mobileMenuBtn.classList.remove("active")
    mobileMenuBtn.textContent = "☰"
    document.body.style.overflow = ""
  }
}

// Animation Management
function initializeAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
        // Optional: Stop observing after animation
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".card, .case-study, .expertise-card")

  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Performance optimization for scroll events
const debouncedScroll = debounce(() => {
  updateActiveNavLink()
}, 10)

window.addEventListener("scroll", debouncedScroll)

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Add keyboard shortcuts if needed
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "k":
        e.preventDefault()
        // Could add search functionality here
        break
    }
  }
})

// Error handling for missing elements
function safeQuerySelector(selector) {
  const element = document.querySelector(selector)
  if (!element) {
    console.warn(`Element not found: ${selector}`)
  }
  return element
}

// Initialize tooltips or other interactive elements
function initializeInteractiveElements() {
  // Add any additional interactive functionality here
  const skillTags = document.querySelectorAll(".skill-tag")
  skillTags.forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })

    tag.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
}

// Call after DOM is loaded
document.addEventListener("DOMContentLoaded", initializeInteractiveElements)

window.toggleMobileMenu = toggleMobileMenu
window.toggleTheme = toggleTheme
window.toggleLanguage = toggleLanguage
