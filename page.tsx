"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "Полнофункциональная платформа электронной коммерции с корзиной покупок, обработкой платежей и панелью администратора.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/placeholder.svg?height=200&width=300",
      github: "https://github.com/username/ecommerce",
      demo: "https://demo-ecommerce.com",
    },
    {
      title: "Task Management App",
      description:
        "Приложение для управления задачами с функциями перетаскивания, совместной работы в реальном времени и аналитикой.",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      image: "/placeholder.svg?height=200&width=300",
      github: "https://github.com/username/task-app",
      demo: "https://demo-tasks.com",
    },
    {
      title: "Weather Dashboard",
      description: "Интерактивная панель погоды с прогнозами, картами и персонализированными уведомлениями.",
      technologies: ["Vue.js", "Express", "OpenWeather API", "Chart.js"],
      image: "/placeholder.svg?height=200&width=300",
      github: "https://github.com/username/weather-app",
      demo: "https://demo-weather.com",
    },
  ]

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "AWS",
    "Git",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold">Портфолио</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {section === "home"
                    ? "Главная"
                    : section === "about"
                      ? "Обо мне"
                      : section === "projects"
                        ? "Проекты"
                        : "Контакты"}
                </button>
              ))}
            </div>

            {/* Mobile Navigation Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              {["home", "about", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left py-2 capitalize text-muted-foreground hover:text-foreground"
                >
                  {section === "home"
                    ? "Главная"
                    : section === "about"
                      ? "Обо мне"
                      : section === "projects"
                        ? "Проекты"
                        : "Контакты"}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="mb-8">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Profile"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-6 border-4 border-primary/20"
              />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Привет, я <span className="text-primary">Разработчик</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Создаю современные веб-приложения с фокусом на пользовательский опыт и производительность
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection("projects")}>
                Посмотреть проекты
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollToSection("contact")}>
                Связаться со мной
              </Button>
            </div>
            <div className="flex justify-center space-x-6 mt-8">
              <Link href="https://github.com" className="text-muted-foreground hover:text-foreground">
                <Github className="w-6 h-6" />
              </Link>
              <Link href="https://linkedin.com" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href="mailto:your@email.com" className="text-muted-foreground hover:text-foreground">
                <Mail className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <div className="text-center">
            <ChevronDown className="w-8 h-8 mx-auto text-muted-foreground animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Обо мне</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Страстный разработчик с опытом создания масштабируемых веб-приложений
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Мой путь</h3>
              <p className="text-muted-foreground mb-6">
                Я разработчик с более чем 3-летним опытом создания веб-приложений. Специализируюсь на современных
                JavaScript фреймворках и люблю решать сложные технические задачи.
              </p>
              <p className="text-muted-foreground mb-6">
                Постоянно изучаю новые технологии и следую лучшим практикам разработки. Верю в важность чистого кода,
                тестирования и пользовательского опыта.
              </p>
              <Button variant="outline">Скачать резюме</Button>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Навыки</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Мои проекты</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Вот некоторые из проектов, над которыми я работал</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {project.title}
                    <div className="flex space-x-2">
                      <Link href={project.github} className="text-muted-foreground hover:text-foreground">
                        <Github className="w-4 h-4" />
                      </Link>
                      <Link href={project.demo} className="text-muted-foreground hover:text-foreground">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Свяжитесь со мной</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Готов обсудить новые возможности и интересные проекты
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Имя</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Сообщение</label>
                    <textarea
                      rows={5}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none"
                      placeholder="Расскажите о вашем проекте..."
                    />
                  </div>
                  <Button className="w-full">Отправить сообщение</Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-6 mt-8">
              <Link
                href="https://github.com"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </Link>
              <Link
                href="mailto:your@email.com"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 Мое Портфолио. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}
