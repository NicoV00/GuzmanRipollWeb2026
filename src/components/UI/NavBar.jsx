import React from "react"
import { useState, useEffect, useRef } from "react"
import { useLocation, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useLenis } from "lenis/dist/lenis-react"
import { Box, useMediaQuery } from "@mui/material"
import { ArrowRight } from "lucide-react"

export default function NavBar() {
  const [timeParts, setTimeParts] = useState({ hour: "00", minute: "00", second: "00", period: "PDE" })
  const [isDarkBackground, setIsDarkBackground] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuEffectiveOpen, setIsMenuEffectiveOpen] = useState(false)
  const [isInHero, setIsInHero] = useState(false)
  const [isProcDropdownOpen, setIsProcDropdownOpen] = useState(false)
  const location = useLocation()
  const isMobile = useMediaQuery('(max-width:900px)')

  const getActivePage = () => {
    if (location.pathname === "/" || location.pathname === "/inicio") return "Inicio"
    if (location.pathname === "/clinica") return "Clínica"
    if (location.pathname === "/procedimientos" || location.pathname.startsWith("/procedimiento/")) return "Procedimientos"
    if (location.pathname === "/resultados") return "Resultados"
    // if (location.pathname === "/research") return "Research" // Research oculto temporalmente
    if (location.pathname === "/contacto") return "Contacto"
    return "Inicio"
  }

  const active = getActivePage()
  const navRef = useRef(null)
  const [underline, setUnderline] = useState({ width: 0, left: 0 })

  const menuLinks = [
    { name: "Clínica", path: "/clinica" },
    { name: "Procedimientos", path: "/procedimientos" },
    { name: "Resultados", path: "/resultados" },
    // { name: "Research", path: "/research" }, // Research oculto temporalmente
  ]

  const procedureSubLinks = [
    { name: "Cirugía Mamaria", path: "/procedimiento/01" },
    { name: "Lipoescultura VASER", path: "/procedimiento/02" },
    { name: "Abdominoplastia", path: "/procedimiento/03" },
    { name: "Blefaroplastia", path: "/procedimiento/04" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const timeString = now.toLocaleTimeString("es-UY", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "America/Montevideo",
      })
      const [hour, minute, second] = timeString.split(":")
      setTimeParts({ hour, minute, second, period: "PDE" })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const detectBackground = () => {
      const tempElement = document.createElement('div')
      tempElement.style.position = 'fixed'
      tempElement.style.top = '20px'
      tempElement.style.left = '50%'
      tempElement.style.width = '1px'
      tempElement.style.height = '1px'
      tempElement.style.pointerEvents = 'none'
      tempElement.style.zIndex = '-1'

      document.body.appendChild(tempElement)

      const computedStyle = window.getComputedStyle(tempElement)
      const bgColor = computedStyle.backgroundColor

      const rgb = bgColor.match(/\d+/g)
      if (rgb && rgb.length >= 3) {
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000
        setIsDarkBackground(brightness < 128)
      } else {
        setIsDarkBackground(window.scrollY > 200)
      }

      document.body.removeChild(tempElement)
    }

    const handleScroll = () => {
      detectBackground()
    }

    window.addEventListener('scroll', handleScroll)
    detectBackground()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detect if we're in the hero section on the home page
  useEffect(() => {
    const isHomePage = location.pathname === "/" || location.pathname === "/inicio"
    if (!isHomePage) {
      setIsInHero(false)
      return
    }

    const checkHero = () => {
      setIsInHero(window.scrollY < window.innerHeight * 0.85)
    }

    checkHero()
    window.addEventListener('scroll', checkHero)
    return () => window.removeEventListener('scroll', checkHero)
  }, [location.pathname])

  useEffect(() => {
    if (!isMobile) {
      if (active === "Contacto") {
        const contactEl = document.querySelector('[data-link="Contacto"]')
        if (contactEl) {
          setUnderline({
            width: contactEl.offsetWidth,
            left: contactEl.offsetLeft
          })
        }
      } else {
        const activeEl = navRef.current?.querySelector(`[data-link="${active}"]`)
        if (activeEl) {
          setUnderline({
            width: activeEl.offsetWidth,
            left: activeEl.offsetLeft
          })
        }
      }
    }
  }, [active, isMobile])

  const lenis = useLenis()
  const onNavClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      lenis?.scrollTo(href, { offset: -100, duration: 1.2 })
    }
    if (isMobile) {
      setIsMenuOpen(false)
    }
  }

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    zIndex: 9999,
    width: '100%',
    backgroundColor: 'transparent',
    mixBlendMode: (isMenuOpen && isMobile) || isInHero ? 'normal' : 'difference',
    color: 'white'
  }

  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden'
      lenis?.stop()
    } else {
      document.body.style.overflow = 'unset'
      lenis?.start()
    }

    return () => {
      document.body.style.overflow = 'unset'
      lenis?.start()
    }
  }, [isMenuOpen, isMobile, lenis])

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuEffectiveOpen(true)
    } else {
      const timer = setTimeout(() => {
        setIsMenuEffectiveOpen(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isMenuOpen])

  return (
    <>
      <header style={navbarStyle}>
        <Box component="nav" sx={{
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          alignItems: 'center',
          gap: '20px',
          paddingLeft: { xs: '20px', md: '70px' },
          paddingRight: { xs: '20px', md: '70px' },
          paddingTop: '30px',
          paddingBottom: '30px',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: '500',
          fontSize: '20px',
          lineHeight: '1.2',
          letterSpacing: '0px',
          textTransform: 'none'
        }}>
          {/* Logo */}
          <Box sx={{
            gridColumn: { xs: '1 / 7', md: '1 / 3' },
            display: 'flex',
            alignItems: 'center'
          }}>
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none'
            }}>
              <img
                src={
                  isMobile
                    ? (isMenuEffectiveOpen ? "/images/GR_9_Isologo.png" : (isDarkBackground ? "/images/GR_9_Isologo_Blanco.png" : "/images/GR_9_Isologo.png"))
                    : (isDarkBackground ? "/images/GR_6_Iso+Nombre_Blanco.png" : "/images/GR_6_Iso+Nombre.png")
                }
                alt="Guzmán Ripoll Logo"
                style={{
                  height: 'auto',
                  width: 'auto',
                  maxHeight: isMobile ? '40px' : '43px'
                }}
              />
            </Link>
          </Box>

          {/* Navegación Principal */}
          <Box sx={{
            gridColumn: '3 / 9',
            display: { xs: 'none', md: 'flex' },
            gap: '0px',
            alignItems: 'center',
            position: 'relative',
            justifyContent: 'flex-start'
          }}>
            <div ref={navRef} style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              {menuLinks.map((link, index) => {
                const isActive = active === link.name;
                const isHome = active === "Inicio";
                const opacity = isHome || isActive ? 1 : 0.5;

                return (
                  <React.Fragment key={link.name}>
                    <Link
                      to={link.path}
                      data-link={link.name}
                      onClick={(e) => onNavClick(e, link.path)}
                      style={{
                        color: 'inherit',
                        textDecoration: 'none',
                        position: 'relative',
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: '500',
                        fontSize: '18px',
                        lineHeight: '1.2',
                        letterSpacing: '0px',
                        textTransform: 'none',
                        transition: 'opacity 0.3s ease',
                        padding: '8px 0',
                        opacity: opacity
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.opacity = opacity;
                      }}
                    >
                      {link.name}
                    </Link>
                    {index < menuLinks.length - 1 && (
                      <span style={{ color: 'inherit', marginRight: '6px', marginLeft: '0px', opacity: isHome ? 1 : 0.5 }}>,</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </Box>

          {/* Hora y Ubicación */}
          <Box sx={{
            gridColumn: '10 / 12',
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '12px',
            paddingRight: '0px',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '18px',
            fontWeight: '500',
          }}>
            <Box component="span" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {timeParts.hour}
              <Box component="span" sx={{ animation: 'blinkColon 1s infinite', display: 'inline-block', margin: '0 2px' }}>:</Box>
              {timeParts.minute}
            </Box>
            <Box component="span" sx={{ color: 'white' }}>
              Punta del Este, UY
            </Box>
          </Box>

          {/* Contacto */}
          <Box sx={{
            gridColumn: '12 / 13',
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
            <Link
              to="/contacto"
              data-link="Contacto"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '500',
                fontSize: '18px',
                lineHeight: '1.2',
                letterSpacing: '0px',
                textTransform: 'none',
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.7';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1';
              }}
            >
              Contacto
            </Link>
          </Box>

          {/* Menu/Close Button - Mobile */}
          <Box sx={{
            gridColumn: '10 / 13',
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isMenuOpen ? 'black' : 'inherit',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '500',
                fontSize: '16px',
                letterSpacing: '0px',
                textTransform: 'none',
                position: 'relative',
                overflow: 'hidden',
                width: '60px',
                height: '30px'
              }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isMenuOpen ? 'close' : 'menu'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {isMenuOpen ? 'Cerrar' : 'Menú'}
                </motion.span>
              </AnimatePresence>
            </button>
          </Box>
        </Box>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1]
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100dvh',
              backgroundColor: 'rgb(203, 206, 203)', // Updated to requested color
              zIndex: 9998,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: '20px',
              paddingTop: '100px',
              paddingBottom: '40px',
              overflow: 'hidden',
              overscrollBehavior: 'none'
            }}
          >
            {/* Time - Top Left */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={{
                color: 'black',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                marginBottom: 'auto'
              }}
            >
              {`${timeParts.hour}:${timeParts.minute}:${timeParts.second} ${timeParts.period}`}
            </motion.div>

            {/* Navigation Links - Left Aligned */}
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '20px',
              width: '100%',
              textAlign: 'left'
            }}>
              {[...menuLinks, { name: "Contacto", path: "/contacto" }].map((link, index) => (
                <div key={link.name} style={{ overflow: 'hidden', width: '100%', textAlign: 'left' }}>
                  <motion.div
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.3 + index * 0.12, // More deliberate staggered timing
                      duration: 1, // Slower 'Lux' reveal
                      ease: [0.19, 1, 0.22, 1] // Apple/Porsche style ease
                    }}
                  >
                    {link.name === "Procedimientos" ? (
                      <>
                        <Box
                          onClick={() => setIsProcDropdownOpen(!isProcDropdownOpen)}
                          sx={{
                            color: 'black',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: '500',
                            fontSize: '40px',
                            letterSpacing: '-1px',
                            display: 'flex',
                            alignItems: 'baseline',
                            lineHeight: '1.1',
                            cursor: 'pointer',
                            userSelect: 'none',
                            textAlign: 'left',
                            position: 'relative'
                          }}
                        >
                          {link.name}
                          <Box component="span" sx={{
                            fontSize: '14px',
                            fontWeight: '600',
                            opacity: 0.3,
                            position: 'absolute',
                            top: '-8px',
                            right: '-16px',
                            fontFamily: 'Poppins, sans-serif',
                          }}>04</Box>
                          <motion.span
                            animate={{ rotate: isProcDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            style={{
                              marginLeft: '24px',
                              fontSize: '20px',
                              display: 'inline-block',
                              opacity: 0.35,
                            }}
                          >
                            ▾
                          </motion.span>
                        </Box>
                        <AnimatePresence>
                          {isProcDropdownOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                              style={{ overflow: 'hidden', paddingLeft: '4px', marginTop: '12px' }}
                            >
                              {procedureSubLinks.map((sub, subIndex) => (
                                <Link
                                  key={sub.path}
                                  to={sub.path}
                                  onClick={(e) => {
                                    onNavClick(e, sub.path)
                                    setIsProcDropdownOpen(false)
                                  }}
                                  style={{
                                    color: 'black',
                                    textDecoration: 'none',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: '400',
                                    fontSize: '18px',
                                    letterSpacing: '0px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    lineHeight: '1.2',
                                    padding: '8px 0',
                                    opacity: 0.6,
                                  }}
                                >
                                  <span style={{ fontSize: '12px', opacity: 0.4, fontWeight: 500 }}>0{subIndex + 1}</span>
                                  {sub.name}
                                </Link>
                              ))}
                              <Link
                                to="/procedimientos"
                                onClick={(e) => {
                                  onNavClick(e, '/procedimientos')
                                  setIsProcDropdownOpen(false)
                                }}
                                style={{
                                  color: 'black',
                                  textDecoration: 'none',
                                  fontFamily: 'Poppins, sans-serif',
                                  fontWeight: '500',
                                  fontSize: '13px',
                                  letterSpacing: '0.02em',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  lineHeight: '1.2',
                                  marginTop: '12px',
                                  padding: '12px',
                                  background: 'rgba(0, 0, 0, 0.04)',
                                  backdropFilter: 'blur(10px)',
                                  borderRadius: '12px',
                                  border: '1px solid rgba(0, 0, 0, 0.06)',
                                  transition: 'all 0.2s ease',
                                }}
                              >
                                Ver todos los procedimientos <ArrowRight size={14} strokeWidth={2} style={{ marginLeft: "6px" }} />
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={(e) => onNavClick(e, link.path)}
                        style={{
                          color: 'black',
                          textDecoration: 'none',
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: '500',
                          fontSize: '40px',
                          letterSpacing: '-1px',
                          display: 'block',
                          lineHeight: '1.1',
                          textAlign: 'left'
                        }}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                </div>
              ))}
            </nav>

            {/* Social Links - Bottom Left */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '5px',
              marginTop: 'auto',
              alignItems: 'center'
            }}>
              {['Instagram', 'LinkedIn'].map((social, index) => (
                <div key={social} style={{ overflow: 'hidden' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                  >
                    <a
                      href={`https://www.${social.toLowerCase()}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'black',
                        textDecoration: 'none',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '16px',
                        fontWeight: '500',
                      }}
                    >
                      {social}{index === 0 ? ',' : ''}
                    </a>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
