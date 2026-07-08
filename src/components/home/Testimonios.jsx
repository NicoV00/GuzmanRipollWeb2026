import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TestimoniosCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const [cardsToShow, setCardsToShow] = useState(3);
  const sectionRef = useRef(null);
  const isMobile = window.innerWidth < 768;

  // GSAP Animation setup
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(".testimonios-header", 
        { 
          opacity: 0, 
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".testimonios-header",
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate carousel
      gsap.fromTo(".testimonios-carousel", 
        { 
          opacity: 0, 
          y: 60 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".testimonios-carousel",
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate progress bar
      gsap.fromTo(".testimonios-progress", 
        { 
          opacity: 0, 
          y: 30 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".testimonios-progress",
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonios = [
    {
      author: "Ignacio Espeche",
      testimonio: "Excelente el Dr. Ripoll, en todo momento me hizo sentir seguro, explicándome paso a paso. El equipo del Dr. dando apoyo en el pre y postoperatorio, muy atentos y cuidadosos."
    },
    {
      author: "María González",
      testimonio: "La atención del Dr. Ripoll fue excepcional. Me explicó cada detalle del procedimiento y el resultado superó todas mis expectativas. Su equipo es muy profesional."
    },
    {
      author: "Carlos Mendoza",
      testimonio: "Increíble experiencia con el Dr. Ripoll. Su técnica y dedicación son incomparables. Me sentí en las mejores manos desde el primer día hasta la recuperación completa."
    },
    {
      author: "Ana Patricia Silva",
      testimonio: "Recomiendo al Dr. Ripoll sin dudarlo. Su profesionalismo y calidez humana hacen que te sientas cómodo y confiado durante todo el proceso quirúrgico."
    },
    {
      author: "Roberto Fernández",
      testimonio: "El Dr. Ripoll cambió mi vida. Su expertise y el cuidado de todo su equipo médico fueron fundamentales para obtener los resultados que siempre había soñado."
    },
    {
      author: "Laura Martínez",
      testimonio: "Estoy muy agradecida con el Dr. Ripoll. Su atención personalizada y seguimiento post-operatorio demuestran su verdadero compromiso con cada paciente."
    },
    {
      author: "Diego Herrera",
      testimonio: "La precisión y el arte del Dr. Ripoll son extraordinarios. Cada consulta fue educativa y el resultado final superó todas mis expectativas por completo."
    },
    {
      author: "Valentina Ramos",
      testimonio: "El Dr. Ripoll es un cirujano excepcional. Su dedicación, experiencia y el trato humano que recibí durante todo el proceso fueron realmente únicos."
    },
    {
      author: "Sebastián Torres",
      testimonio: "Elegir al Dr. Ripoll fue la mejor decisión. Su profesionalismo, técnica avanzada y el cuidado integral que ofrece son verdaderamente incomparables."
    }
  ];

  // Responsive cards to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure currentIndex stays within bounds when cardsToShow or testimonios change
  useEffect(() => {
    const newMax = Math.max(0, testimonios.length - cardsToShow);
    setCurrentIndex(prev => Math.min(prev, newMax));
  }, [cardsToShow, testimonios.length]);

  const maxIndex = Math.max(0, testimonios.length - cardsToShow);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
    setDragOffset(0);
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    setDragOffset(0);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100;
    // Invertido: arrastrar a la derecha (dragOffset > 0) mueve a la tarjeta anterior
    if (dragOffset > threshold && currentIndex > 0) {
      handlePrevious();
    } else if (dragOffset < -threshold && currentIndex < maxIndex) {
      handleNext();
    }
    setDragOffset(0);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 50;
    // Invertido: arrastrar a la derecha (dragOffset > 0) mueve a la tarjeta anterior
    if (dragOffset > threshold && currentIndex > 0) {
      handlePrevious();
    } else if (dragOffset < -threshold && currentIndex < maxIndex) {
      handleNext();
    }
    setDragOffset(0);
  };

  // Calculate the transform value
  const getTransformValue = () => {
    if (!containerRef.current) return 0;
    const containerWidth = containerRef.current.offsetWidth;
    // En móvil, el ancho de cada card incluye el margin de 16px
    const cardWidth = isMobile ? containerWidth + 16 : containerWidth / cardsToShow;
    // Calculate the desired offset based on currentIndex and drag
    const desired = (currentIndex * cardWidth) - dragOffset;

    // Calculate bounds: minDesired is 0 (start), maxDesired is the maximum scrollable offset
    const maxOffset = Math.max(0, (testimonios.length * cardWidth) - containerWidth);
    // desired corresponds to positive scroll to the right; clamp between 0 and maxOffset
    const clamped = Math.max(0, Math.min(desired, maxOffset));

    return -clamped;
  };

  // Progress bar calculation - ultra smooth and perfect loading
  const getProgressWidth = () => {
    const totalSlides = maxIndex + 1;
    const currentProgress = currentIndex / Math.max(totalSlides - 1, 1);
    return Math.min(currentProgress * 100, 100);
  };
  
  const progress = getProgressWidth();

  return (
    <Box
      ref={sectionRef}
      sx={{
        padding: { xs: '80px 0 40px 0', md: '80px 0' },
        width: '100%',
        backgroundColor: '#FAFFFF'
      }}
    >
      <div style={{
        maxWidth: '1920px',
        margin: '0 auto',
        paddingLeft: isMobile ? '20px' : '70px',
        paddingRight: isMobile ? '20px' : '70px'
      }}>
        {/* Header */}
        <Box
          className="testimonios-header"
          sx={{
            display: 'flex',
            width: { xs: '100%', md: '50%' },
            textAlign: 'start',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: { xs: '60px', md: '64px' }
          }}
        >
          {/* Eyebrow numerado — consistente con el resto de la home */}
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '10px', mb: { xs: '20px', md: '24px' } }}>
            <Typography component="span" sx={{
              fontFamily: "Poppins, sans-serif", fontSize: { xs: "16px", md: "18px" },
              fontWeight: 600, color: "rgba(0,0,0,0.42)", lineHeight: 1,
            }}>
              04
            </Typography>
            <Typography component="span" sx={{
              fontFamily: "Poppins, sans-serif", fontSize: { xs: "16px", md: "18px" }, fontWeight: 500,
              textTransform: "uppercase", color: "#000000", letterSpacing: "0.03em", lineHeight: 1,
            }}>
              Testimonios
            </Typography>
          </Box>
          <Typography
            color="#1F2937"
            fontFamily={'Poppins'}
            fontSize={{ xs: '45px', md: '45px', xl: '70px' }}
            sx={{ 
              width: '100%', 
              lineHeight: { xs: '1.2', md: '1.1' },
              letterSpacing: { xs: '-0.5px', md: '-1px' },
              fontWeight: 400,
              marginBottom: '16px'
            }}
          >
            <Typography 
              component="span" 
              fontFamily={'Poppins'} 
              fontSize={{ xs: '45px', md: '45px', xl: '70px' }} 
              sx={{ 
                color: 'textAccent', 
                letterSpacing: { xs: '-0.5px', md: '-1px' },
                fontWeight: 400
              }}
            >
              Confianza {" "}
            </Typography>
            en cada proceso
          </Typography>
       
          
          <Typography sx={{ 
            width: '100%', 
            fontSize: { xs: '16px', md: '18px' },
            lineHeight: '1.6',
            color: '#6B7280',
            fontWeight: 500,
            maxWidth: '400px'
          }}>
            Cercanía y profesionalismo en cada etapa.
          </Typography>
        </Box>

        {/* Carousel Container */}
        <div className="testimonios-carousel" style={{ position: 'relative', marginBottom: '48px' }}>
          <div 
            ref={containerRef}
            style={{ 
              overflow: 'hidden',
              position: 'relative',
              width: '100%'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={carouselRef}
              style={{
                display: 'flex',
                transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `translateX(${getTransformValue()}px)`,
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                paddingInline: isMobile ? '0' : '0',
                marginInline: isMobile ? '0' : '0',
              }}
            >
              {testimonios.map((testimonio, index) => (
                <div
                  key={index}
                  style={{
                    width: isMobile ? '100%' : `${100 / cardsToShow}%`,
                    flex: 'none',
                    minHeight: '310px',
                    padding: isMobile ? '0' : '0 12px',
                    boxSizing: 'border-box',
                    marginRight: isMobile && index < testimonios.length - 1 ? '16px' : '0'
                  }}
                >
                  <div
                    style={{
                      height: 'auto',
                      minHeight: window.innerWidth < 768 ? '340px' : '280px',
                      borderRadius: '16px',
                      padding: window.innerWidth < 768 ? '28px' : '32px',
                      display: 'flex',
                      textAlign: 'left',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      backgroundColor: '#EBEDEF',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      border: '1px solid rgba(229, 231, 235, 0.3)',
                      maxWidth: isMobile ? 'none' : '500px',
                      width: '100%',
                      maxHeight: window.innerWidth < 768 ? 'none' : '280px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    {/* Quote */}
                    <div style={{ marginBottom: '24px' }}>
                      <p style={{
                        fontSize: window.innerWidth < 768 ? '16px' : '16px',
                        color: '#374151',
                        lineHeight: '1.7',
                        margin: 0,
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        letterSpacing: '0.01em'
                      }}>
                        "{testimonio.testimonio}"
                      </p>
                    </div>
                    
                    {/* Author */}
                    <div style={{ 
                      textAlign: 'left',
                      borderTop: '1px solid #F3F4F6',
                      paddingTop: '20px'
                    }}>
                      <p style={{ 
                        fontWeight: '500',
                        fontSize: window.innerWidth < 768 ? '14px' : '15px',
                        color: '#75909F',
                        margin: 0,
                        fontFamily: 'Poppins',
                        letterSpacing: '0.02em'
                      }}>
                        {testimonio.author}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="testimonios-progress"
        style={{
          width: '100%',
          padding: isMobile ? '0 20px' : '0 70px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <span style={{ 
          color: '#000000',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          fontFamily: 'Poppins',
          fontSize: '14px'
        }}>
          {testimonios.length} Testimonios
        </span>
        <div style={{ 
          flex: 1,
          height: '3px',
          backgroundColor: '#E5E7EB',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div 
            style={{ 
              height: '100%',
              background: '#000000',
              borderRadius: '2px',
              width: `${progress}%`,
              transition: 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          />
        </div>
      </div>
    </Box>
  );
};

export default TestimoniosCarousel;
