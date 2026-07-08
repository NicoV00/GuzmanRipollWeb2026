import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Send } from 'lucide-react';
import { TurnstileWidget } from './TurnstileWidget.jsx';

const LABEL = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: '18px',
  fontWeight: 600,
  letterSpacing: '-0.045em',
  color: '#050505',
  lineHeight: 1,
  textAlign: 'left',
};

const VALUE = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: '24px',
  fontWeight: 500,
  letterSpacing: '-0.06em',
  lineHeight: 1.08,
  color: '#050505',
  textDecoration: 'none',
  textAlign: 'left',
};

export function ContactSection({ id }) {
  const rootRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const token = e.target.elements['cf-turnstile-response']?.value;
    if (!token) {
      setStatus('error');
      setErrorMsg('Confirmá la verificación anti-bot antes de enviar.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, token }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'No se pudo enviar el mensaje.');
      }

      setStatus('sent');
      setFormData({ firstName: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'No se pudo enviar el mensaje. Intentá de nuevo.');
    } finally {
      if (window.turnstile) window.turnstile.reset();
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const titleLines = root.querySelectorAll('.contact-title-line');
      const revealItems = root.querySelectorAll('[data-reveal]');
      const imageWraps = root.querySelectorAll('.contact-image-wrap img');

      gsap.set(titleLines, {
        yPercent: 110,
        opacity: 0,
      });

      gsap.set(revealItems, {
        y: 26,
        opacity: 0,
        filter: 'blur(8px)',
      });

      gsap.set(imageWraps, {
        scale: 1.08,
      });

      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
      });

      tl.to(titleLines, {
        yPercent: 0,
        opacity: 1,
        duration: 1.08,
        stagger: 0.1,
      })
        .to(
          revealItems,
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            stagger: 0.075,
          },
          '-=0.65'
        )
        .to(
          imageWraps,
          {
            scale: 1.025,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.05,
          },
          '-=0.95'
        );
    }, root);

    return () => ctx.revert();
  }, []);

  const renderFormCard = (suffix = '', extraClass = '') => (
    <div data-reveal className={`contact-form-wrapper ${extraClass}`}>
      <h3 className="contact-form-title">
        Cirugía estética especializada<br />
        y resultados naturales
      </h3>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="contact-form-field">
          <label htmlFor={`firstName${suffix}`}>Tu nombre</label>
          <input
            type="text"
            id={`firstName${suffix}`}
            name="firstName"
            placeholder="Tu nombre"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="contact-form-field">
          <label htmlFor={`phone${suffix}`}>Teléfono</label>
          <input
            type="tel"
            id={`phone${suffix}`}
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="contact-form-field">
          <label htmlFor={`email${suffix}`}>Correo electrónico</label>
          <input
            type="email"
            id={`email${suffix}`}
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="contact-form-field contact-form-message">
          <label htmlFor={`message${suffix}`}>Mensaje</label>
          <textarea
            id={`message${suffix}`}
            name="message"
            placeholder="Contanos cómo podemos ayudarte, con el mayor detalle posible."
            value={formData.message}
            onChange={handleInputChange}
            rows="5"
            required
          />
          <button
            type="submit"
            className="contact-form-submit"
            aria-label="Enviar mensaje"
            disabled={status === 'sending'}
          >
            <Send size={19} strokeWidth={1.8} />
          </button>
        </div>

        <TurnstileWidget />

        {status === 'sent' && (
          <p className="contact-form-status contact-form-status-ok" role="status">
            ¡Gracias! Recibimos tu consulta y te contactaremos a la brevedad.
          </p>
        )}
        {status === 'error' && (
          <p className="contact-form-status contact-form-status-error" role="alert">
            {errorMsg}
          </p>
        )}
      </form>
    </div>
  );

  return (
    <section id={id} ref={rootRef} className="contact-section">
      {/* DESKTOP */}
      <div className="contact-desktop">
        <div className="contact-left">
          {renderFormCard('')}
        </div>

        <div className="contact-right">
          <div className="contact-info">
            <div data-reveal className="contact-row">
              <span style={LABEL}>CONSULTAS</span>
              <a href="mailto:info@guzmanripoll.com" style={VALUE}>
                info@guzmanripoll.com
              </a>
            </div>

            <div data-reveal className="contact-row">
              <span style={LABEL}>TELÉFONO</span>
              <a href="tel:+59892566656" style={VALUE}>
                +598 92 566 656
              </a>
            </div>
          </div>

          <div data-reveal className="contact-bottom">
            <div className="contact-address">
              <span style={LABEL}>CLÍNICA</span>

              <p>
                Clínica Select
                <br />
                Av. Roosevelt, 20100
                <br />
                Maldonado, Uruguay.
              </p>
            </div>

            <div className="contact-image-wrap">
              <img
                src="/images/cloinica.png"
                alt="Clínica Guzmán Ripoll"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="contact-mobile">
        <h2
          className="contact-title contact-title-mobile"
          aria-label="Medicina estética especializada."
        >
          <span className="contact-title-mask">
            <span className="contact-title-line">
              Medicina estética especializada.
            </span>
          </span>
        </h2>

        {renderFormCard('-m', 'contact-form-wrapper-mobile')}

        <div data-reveal className="contact-image-wrap contact-image-wrap-mobile">
          <img
            src="/images/cloinica.png"
            alt="Clínica Guzmán Ripoll"
          />
        </div>

        <div className="contact-mobile-info">
          <div data-reveal className="contact-mobile-row">
            <span style={LABEL}>CONSULTAS</span>
            <a href="mailto:info@guzmanripoll.com" style={VALUE}>
              info@guzmanripoll.com
            </a>
          </div>

          <div data-reveal className="contact-mobile-row">
            <span style={LABEL}>TELÉFONO</span>
            <a href="tel:+59892566656" style={VALUE}>
              +598 92 566 656
            </a>
          </div>

          <div data-reveal className="contact-mobile-row">
            <span style={LABEL}>CLÍNICA</span>
            <p className="contact-mobile-address">
              Clínica Select
              <br />
              Av. Roosevelt, 20100
              <br />
              Maldonado, Uruguay.
            </p>
          </div>
        </div>

        <div data-reveal className="contact-socials contact-socials-mobile">
          <a href="https://www.instagram.com/clinicaripoll/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>

      <style>{`
        .contact-section {
          width: 100%;
          min-height: 100dvh;
          position: relative;
          isolation: isolate;
          background: #d4d3d0;
          color: #050505;
          overflow: hidden;
          box-sizing: border-box;
        }

        /* =========================
           DESKTOP
        ========================= */
        .contact-desktop {
          height: 100dvh;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          column-gap: 24px;
          padding: 132px 64px 64px;
          box-sizing: border-box;
          overflow: hidden;
          position: relative;
          z-index: 1;
          align-items: center;
        }

        .contact-left {
          grid-column: 1 / 7;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          height: 100%;
          /* ═══ AJUSTA ESTE VALOR PARA SUBIR/BAJAR TODO EL BLOQUE IZQUIERDO ═══ */
          padding-top: 8%;  /* Aumenta para bajar, disminuye para subir */
        }

        .contact-right {
          grid-column: 8 / 13;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          height: 100%;
          gap: 44px;
          padding-top: 8%;
        }

        .contact-title {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          font-size: clamp(58px, 4.7vw, 84px);
          line-height: 0.92;
          letter-spacing: -0.078em;
          font-weight: 500;
          color: #050505;
          text-align: left;
          max-width: 1040px;
        }

        .contact-title-mask {
          display: block;
          overflow: hidden;
          padding-bottom: 0.075em;
        }

        .contact-title-line {
          display: block;
          will-change: transform, opacity;
        }

        .contact-socials {
          display: flex;
          gap: 4px;
          align-items: center;
          justify-content: flex-start;
          will-change: transform, opacity, filter;
        }

        .contact-socials a {
          font-family: 'Poppins', sans-serif;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: -0.06em;
          line-height: 1;
          color: #050505;
          text-decoration: none;
          transition: opacity 0.25s ease;
        }

        .contact-socials a:hover {
          opacity: 0.55;
        }

        .contact-socials a:not(:last-child)::after {
          content: ',';
        }

        .contact-info {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          column-gap: 24px;
          row-gap: 44px;
        }

        .contact-row {
          grid-column: 1 / 6;
          display: grid;
          grid-template-columns: 2fr 3fr;
          column-gap: 24px;
          align-items: start;
          text-align: left;
          will-change: transform, opacity, filter;
        }

        .contact-row a {
          transition: opacity 0.25s ease;
        }

        .contact-row a:hover {
          opacity: 0.58;
        }

        .contact-bottom {
          display: grid;
          grid-template-columns: 2fr 3fr;
          column-gap: 24px;
          align-items: end;  /* Alinea al fondo */
          width: 100%;
          height: 400px;
          will-change: transform, opacity, filter;
          margin-bottom: 40px;  /* Margen inferior - ajusta aquí */
        }

        .contact-address {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-self: stretch;
          text-align: left;
        }

        .contact-address p {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          font-size: 24px;
          font-weight: 500;
          line-height: 1.25;
          letter-spacing: -0.07em;
          color: #050505;
          text-align: left;
        }

        .contact-address span {
          display: block;
          margin-bottom: 0;
        }

        .contact-image-wrap {
          width: 100%;
          height: calc(100% - 70px);
          margin-top: 70px;  /* Baja la imagen */
          overflow: hidden;
          background: #bdbdb9;
          align-self: stretch;
        }

        .contact-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.78) contrast(0.94) brightness(0.97);
          transform: scale(1.025);
          will-change: transform;
        }

        /* =========================
           FORMULARIO
        ========================= */
        .contact-form-wrapper {
          width: 100%;
          max-width: 760px;
          will-change: transform, opacity, filter;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          height: 100%;
        }

        .contact-form-title {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          /* ═══ TAMAÑOS DE INTROHOME ═══ */
          font-size: clamp(40px, 5vw, 52px);  /* Reducido para que entre en 2 líneas */
          font-weight: 500;  /* Bold */
          line-height: 1.1;
          letter-spacing: -2px;
          color: #050505;
          text-align: left;
          /* ═══ ANCHO AUMENTADO PARA 2 LÍNEAS ═══ */
          max-width: none;  /* Sin límite de ancho */
          width: 100%;
          /* ═══ AJUSTA ESTA SEPARACIÓN ENTRE TÍTULO Y CAMPOS ═══ */
          margin-bottom: 40px;  /* Cambia este valor: menos = más cerca, más = más lejos */
          text-shadow: none;
        }

        .contact-form {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 6px;
          /* ═══ SUBIDOS LOS CAMPOS ═══ */
          margin-top: 90px;  /* Ajusta: menos = más arriba, más = más abajo */
        }

        .contact-form-field {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .contact-form-field label {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .contact-form-field input,
        .contact-form-field textarea {
          width: 100%;
          border: 2px solid rgba(122, 122, 122, 0.55);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: inset 0 1px 4px rgba(255, 255, 255, 0.55), 0 1px 3px rgba(0, 0, 0, 0.16);
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #3e3e3e;
          outline: none;
          transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          box-sizing: border-box;
        }

        .contact-form-field input {
          height: 66px;
          padding: 0 18px;
        }

        .contact-form-field input::placeholder,
        .contact-form-field textarea::placeholder {
          color: #777;
          opacity: 1;
        }

        .contact-form-field input:focus,
        .contact-form-field textarea:focus {
          background: rgba(255, 255, 255, 0.98);
          border-color: rgba(53, 53, 53, 0.7);
          box-shadow: inset 0 1px 4px rgba(255, 255, 255, 0.6), 0 0 0 3px rgba(255, 255, 255, 0.18);
        }

        .contact-form-message {
          grid-column: 1 / -1;
          position: relative;
        }

        .contact-turnstile {
          grid-column: 1 / -1;
          min-height: 65px;
        }

        .contact-form-status {
          grid-column: 1 / -1;
          margin: 0;
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.02em;
          text-align: left;
        }

        .contact-form-status-ok {
          color: #1d6b3a;
        }

        .contact-form-status-error {
          color: #a4302c;
        }

        .contact-form-submit:disabled {
          opacity: 0.55;
          cursor: wait;
          transform: none;
        }

        .contact-form-field textarea {
          resize: none;
          min-height: 134px;
          padding: 22px 72px 22px 18px;
          line-height: 1.45;
        }

        .contact-form-submit {
          position: absolute;
          right: 17px;
          bottom: 17px;
          width: 38px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          background: linear-gradient(135deg, #5C9DFF 0%, #4a7ecc 100%);
          color: #ffffff;
          border: 1px solid rgba(92, 157, 255, 0.3);
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 2px 6px rgba(92, 157, 255, 0.25);
        }

        .contact-form-submit:hover {
          background: linear-gradient(135deg, #6aaeff 0%, #5c9dff 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(92, 157, 255, 0.35);
        }

        /* =========================
           MOBILE
        ========================= */
        .contact-mobile {
          display: none;
        }

        .contact-mobile-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          gap: 26px;
          text-align: left;
        }

        .contact-mobile-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          gap: 8px;
          text-align: left;
          will-change: transform, opacity, filter;
        }

        .contact-mobile-row span,
        .contact-mobile-row a,
        .contact-mobile-row p {
          text-align: left !important;
        }

        .contact-mobile-address {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          font-size: 20px;
          font-weight: 500;
          letter-spacing: -0.055em;
          line-height: 1.13;
          color: #050505;
          text-align: left;
        }

        @media (max-width: 1100px) {
          .contact-desktop {
            display: none;
          }

          .contact-mobile {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            min-height: 100dvh;
            width: 100%;
            padding: 156px 28px 108px;
            box-sizing: border-box;
            gap: 34px;
            text-align: left;
            position: relative;
            z-index: 1;
          }

          /* ── Formulario en mobile ── */
          .contact-form-wrapper-mobile {
            width: 100%;
            max-width: 100%;
            height: auto;
          }

          .contact-form-wrapper-mobile .contact-form-title {
            font-size: clamp(36px, 8.8vw, 52px);
            line-height: 0.98;
            letter-spacing: -0.075em;
            margin-bottom: 24px;
          }

          .contact-form-wrapper-mobile .contact-form {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 0;
            width: 100%;
          }

          .contact-form-wrapper-mobile .contact-form-field input {
            height: 56px;
          }

          .contact-form-wrapper-mobile .contact-form-message {
            grid-column: auto;
          }

          .contact-form-wrapper-mobile .contact-form-field textarea {
            min-height: 120px;
          }

          .contact-title-mobile {
            display: none;
            font-size: clamp(36px, 8.8vw, 52px);
            line-height: 0.98;
            letter-spacing: -0.075em;
            max-width: 100%;
            width: 100%;
            text-align: left;
          }

          .contact-image-wrap-mobile {
            width: 100%;
            height: auto;
            margin-top: 0;  /* En mobile la imagen no se baja */
            aspect-ratio: 4 / 5;
          }

          .contact-mobile-row span {
            font-size: 15px !important;
            line-height: 1;
          }

          .contact-mobile-row a {
            font-size: 20px !important;
            line-height: 1.08 !important;
            transition: opacity 0.25s ease;
            max-width: 100%;
            overflow-wrap: anywhere;
          }

          .contact-mobile-row a:hover {
            opacity: 0.58;
          }

          .contact-mobile-address {
            font-size: 20px !important;
            line-height: 1.12;
            letter-spacing: -0.055em;
          }

          .contact-socials-mobile {
            margin-top: auto;
            padding-top: 12px;
            flex-wrap: wrap;
            width: 100%;
            justify-content: flex-start;
            align-items: center;
            text-align: left;
          }

          .contact-socials-mobile a {
            font-size: 16px;
          }
        }

        @media (max-width: 520px) {
          .contact-mobile {
            padding: 148px 24px 108px;
            gap: 32px;
          }

          .contact-title-mobile {
            font-size: clamp(34px, 9.8vw, 44px);
            line-height: 1;
          }

          .contact-form-wrapper-mobile .contact-form-title {
            font-size: clamp(34px, 9.8vw, 44px);
            line-height: 1;
          }

          .contact-image-wrap-mobile {
            aspect-ratio: 1 / 1.06;
          }

          .contact-mobile-row span {
            font-size: 14px !important;
          }

          .contact-mobile-row a,
          .contact-mobile-address {
            font-size: 19px !important;
          }

          .contact-socials-mobile a {
            font-size: 15px;
          }
        }

        @media (max-width: 390px) {
          .contact-mobile {
            padding: 140px 22px 104px;
            gap: 30px;
          }

          .contact-title-mobile {
            font-size: clamp(31px, 9.2vw, 38px);
            line-height: 1.01;
          }

          .contact-form-wrapper-mobile .contact-form-title {
            font-size: clamp(31px, 9.2vw, 38px);
            line-height: 1.01;
          }

          .contact-mobile-row a,
          .contact-mobile-address {
            font-size: 18px !important;
          }

          .contact-mobile-row span {
            font-size: 13px !important;
          }
        }
      `}</style>
    </section>
  );
}
