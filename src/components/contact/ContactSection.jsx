import { useEffect, useRef } from 'react';
import gsap from 'gsap';

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

  return (
    <section id={id} ref={rootRef} className="contact-section">
      {/* DESKTOP */}
      <div className="contact-desktop">
        <div className="contact-left">
          <h2
            className="contact-title"
            aria-label="Medicina estética especializada en Punta del Este."
          >
            <span className="contact-title-mask">
              <span className="contact-title-line">
                Medicina estética especializada
              </span>
            </span>

            <span className="contact-title-mask">
              <span className="contact-title-line">
                en Punta del Este.
              </span>
            </span>
          </h2>

          <div data-reveal className="contact-socials">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">LinkedIn</a>
          </div>
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
                src="/images/imagen5.jpg"
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
          aria-label="Medicina estética especializada en Punta del Este."
        >
          <span className="contact-title-mask">
            <span className="contact-title-line">
              Medicina estética especializada
            </span>
          </span>

          <span className="contact-title-mask">
            <span className="contact-title-line">
              en Punta del Este.
            </span>
          </span>
        </h2>

        <div data-reveal className="contact-image-wrap contact-image-wrap-mobile">
          <img
            src="/images/imagen5.jpg"
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
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>

      <style>{`
        .contact-section {
          width: 100%;
          min-height: 100dvh;
          background: #c9c9c6;
          color: #050505;
          overflow: hidden;
          box-sizing: border-box;
        }

        /* =========================
           DESKTOP
        ========================= */
        .contact-desktop {
          min-height: 100dvh;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          column-gap: 24px;
          padding: 198px 64px 36px;
          box-sizing: border-box;
        }

        .contact-left {
          grid-column: 1 / 7;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          min-height: calc(100dvh - 234px);
        }

        .contact-right {
          grid-column: 8 / 13;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: stretch;
          min-height: calc(100dvh - 234px);
          padding-top: 2px;
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
          align-items: stretch;
          width: 100%;
          height: clamp(430px, 44dvh, 520px);
          will-change: transform, opacity, filter;
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
          height: 100%;
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
          }

          .contact-title-mobile {
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