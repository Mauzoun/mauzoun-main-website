import React from 'react';
import {
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoInstagram,
  IoMdStopwatch,
} from 'react-icons/io';
import { useIntl, createIntl, createIntlCache } from 'react-intl';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { isIOS } from 'react-device-detect';
import { useEffect } from 'react';
import Router from 'next/router';
import styles from '../styles/menu.module.scss';
import * as locales from '../content/locale';
import formatJsxMessage from '../utils/formatJsxMessage';

import gsap from 'gsap';

const intlCache = createIntlCache();

export default function Menu({
  backgroundColor,
  textAnimationControls,
  isNavOpen,
  handleOpenNav,
}) {
  const router = useRouter();
  const { locale, pathname, asPath } = router;

  const otherLocale = locale === 'en-US' ? 'ar' : 'en-US';

  const intl = useIntl();
  const [otherIntl, setOtherIntl] = React.useState();

  React.useEffect(() => {
    router.prefetch(`/${otherLocale}${pathname}`);
  }, []);

  React.useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      gsap.fromTo('.navigation', { opacity: 0 }, { opacity: 1, delay: 0.3 });
    }
  }, []);

  React.useEffect(() => {
    const localeCopy = locales[otherLocale];
    setOtherIntl(
      createIntl(
        {
          locale: otherLocale,
          messages: Object.assign(localeCopy['shared'], localeCopy[pathname]),
        },
        intlCache
      )
    );
  }, [locale]);

  const f = (id, options) =>
    formatJsxMessage(intl, locale, id, {
      shouldFade: true,
      animationControls: textAnimationControls,
      ...options,
    });
  const otherF = (id, options) =>
    formatJsxMessage(otherIntl, otherLocale, id, {
      shouldFade: true,
      animationControls: textAnimationControls,
      ...options,
    });

  const handleAnchorClick = (event) => {
    // 👇️ use event.preventDefault() if you want to
    // prevent navigation
    // event.preventDefault();

    console.log('Anchor element clicked');

    // 👇️ refers to the link element
    console.log(event.currentTarget);
  };

  const [hoveredLink, setHoveredLink] = React.useState('');

  const buildTiltedSquare = (linkName) => {
    let filter;
    if (router.pathname === '/story' || router.pathname === '/')
      filter =
        'invert(30%) sepia(10%) saturate(3580%) hue-rotate(220deg) brightness(98%) contrast(85%)';
    else if (router.pathname === '/team')
      filter =
        'invert(25%) sepia(91%) saturate(1730%) hue-rotate(352deg) brightness(94%) contrast(78%)';
    else if (router.pathname === '/culture')
      filter =
        'invert(83%) sepia(27%) saturate(4335%) hue-rotate(356deg) brightness(85%) contrast(92%)';
    else if (router.pathname === '/method')
      filter =
        'invert(73%) sepia(92%) saturate(308%) hue-rotate(359deg) brightness(104%) contrast(93%)';
    else if (router.pathname === '/contentwriting')
      filter =
        'invert(58%) sepia(29%) saturate(790%) hue-rotate(132deg) brightness(92%) contrast(88%)';
    else if (router.pathname === '/services')
      filter =
        'invert(58%) sepia(29%) saturate(790%) hue-rotate(132deg) brightness(92%) contrast(88%)';
    else if (router.pathname === '/bookcommissions')
      filter =
        'invert(80%) sepia(37%) saturate(164%) hue-rotate(116deg) brightness(89%) contrast(88%)';
    else if (router.pathname === '/boutiquepublishing') {
      filter =
        'invert(30%) sepia(10%) saturate(3580%) hue-rotate(220deg) brightness(98%) contrast(85%)';
    } else if (router.pathname === '/portfolio') {
      filter =
        'invert(25%) sepia(91%) saturate(1730%) hue-rotate(352deg) brightness(94%) contrast(78%)';
    } else if (router.pathname === '/portfolio') {
      filter =
        'invert(25%) sepia(91%) saturate(1730%) hue-rotate(352deg) brightness(94%) contrast(78%)';
    } else if (router.pathname === '/mauj') {
      filter =
        'invert(25%) sepia(91%) saturate(1730%) hue-rotate(352deg) brightness(94%) contrast(78%)';
    } else if (router.pathname === '/shafra') {
      filter =
        'invert(25%) sepia(91%) saturate(1730%) hue-rotate(352deg) brightness(94%) contrast(78%)';
    } else if (router.pathname === '/musaandpalm') {
      filter =
        'invert(25%) sepia(91%) saturate(1730%) hue-rotate(352deg) brightness(94%) contrast(78%)';
    } else if (router.pathname === '/sta') {
      filter =
        'invert(25%) sepia(91%) saturate(1730%) hue-rotate(352deg) brightness(94%) contrast(78%)';
    }
    {
      /*if (router.pathname === "/services" || router.pathname === "/blog")
      filter = "invert(92%) sepia(72%) saturate(682%) hue-rotate(329deg) brightness(96%) contrast(103%)";
  else filter = "invert(99%) sepia(59%) saturate(426%) hue-rotate(169deg) brightness(112%) contrast(100%)";*/
    }

    return (
      <object
        data="/Tilted Square.svg"
        className={styles.tiltedSquare}
        style={{ filter }}
        hidden={hoveredLink !== linkName && `/${linkName}` !== router.pathname}
      />
    );
  };

  const removeAndReturnBgColor = () => {
    gsap.to('.container-background .navigation', {
      backgroundColor: 'transparent',
      duration: 0,
    });

    gsap.to('.navigation', { backgroundColor: 'transparent', duration: 0 });

    gsap.from('.container-background .navigation', {
      backgroundColor: 'transparent',
      duration: 0,
      delay: 0.6,
    });

    gsap.from('.navigation', {
      backgroundColor: 'transparent',
      duration: 0,
      delay: 0.6,
    });
  };

  const removeAndReturnContent = () => {
    gsap.to('.container-content container', { opacity: 0, duration: 0.3 });

    gsap.to('.animationFade ', { opacity: 0, duration: 0.3 });

    gsap.to(`.container-content`, { opacity: 1, duration: 0.3, delay: 0.6 });
    gsap.to(`.container`, { opacity: 1, duration: 0.3, delay: 0.6 });
    gsap.to(`.animationFade`, { opacity: 1, duration: 0.3, delay: 0.6 });
  };

  const hideContactBtnContent = () => {
    gsap.to(`.contact-button`, {
      opacity: 0,
      duration: 0.15,
      delay: 0,
    });
    gsap.to(`.contact-button`, {
      opacity: 1,
      duration: 0.3,
      delay: 0.6,
    });
  };

  const handleAnimationFadeIn = React.useCallback((locale, callback) => {
    const isFromLeftToRight = !locale || locale.includes('en-US');

    removeAndReturnBgColor();
    removeAndReturnContent();
    hideContactBtnContent();

    gsap.to(`.header-mobile`, {
      opacity: 0,
      duration: 0.3,
      delay: 0,
    });

    gsap.to(`.header-mobile`, {
      opacity: 1,
      duration: 0.3,
      delay: 0.3,
    });

    gsap.to(`.background-animation`, {
      left: isFromLeftToRight ? '25%' : '0',
      duration: 0.3,
      delay: 0.3,
      clear: 'all',
      onStart: callback,
    });

    gsap.to(`.contact-button`, {
      opacity: 1,
      duration: 0.3,
      delay: 0.6,
    });
  }, []);

  return (
    <div
      className={`${isNavOpen ? styles.open : ''} ${styles.sidenav} navigation`}
      style={{ backgroundColor: isNavOpen ? null : backgroundColor }}
      // layout='position'
    >
      {' '}
      <div className="animationFade">
        {isNavOpen ? null : (
          <>
            <div
              className={styles.motionLogoBGui}
              style={{ backgroundColor }}
            ></div>
            <Link href="/">
              <motion.img
                src="https://i.ibb.co/28W6QH5/mainLogo.png"
                alt="Mauzoun logo"
                className={styles.logo}
                transition={{ duration: 0.5 }}
                layoutId="logo"
                style={{ opacity: 0, zIndex: -9 }}
              />
            </Link>
          </>
        )}

        <div className={styles.menu}>
          <div>
            {['story', 'team', 'culture', 'method', 'services', 'blog'].map(
              (e, i) => {
                const otherText = otherF(e + 'Link');

                return (
                  <div key={e}>
                    {!(i % 2) && buildTiltedSquare(e)}

                    {/* Corrected Link usage */}
                    <Link href={`/${e}`} passHref>
                      <div
                        className={styles.navLink}
                        onMouseEnter={() => setHoveredLink(e)}
                        onMouseLeave={() => setHoveredLink('')}
                        onClick={() => isNavOpen && handleOpenNav?.('instant')}
                      >
                        <div
                          className={`${styles.itemTitle} heading`}
                          style={{
                            fontWeight: locale === 'en-US' ? '500' : 'bold',
                          }}
                        >
                          {f(e + 'Link')}
                          {i % 2 ? buildTiltedSquare(e) : null}
                        </div>
                        <span
                          className={`${styles.otherLocaleLink} ${otherLocale} lighter`}
                        >
                          {otherText ? (
                            otherText
                          ) : (
                            <p>
                              <span> </span>
                            </p>
                          )}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              }
            )}
          </div>
          <div className={styles.languageSwitch}>
            <p className={locale}>
              <b>{locale === 'en-US' ? 'English' : 'العربية'}</b>
            </p>

            {/* Adjusted for proper Link usage */}
            <a
              onClick={(e) => {
                e.preventDefault();
                isNavOpen && handleOpenNav?.('instant');
                handleAnimationFadeIn(locale, () => {
                  Cookies.set('NEXT_LOCALE', otherLocale);
                  router.push(pathname, pathname, { locale: otherLocale });
                });
              }}
            >
              <label className={styles.switch}>
                <input type="checkbox" checked={locale === 'ar'} readOnly />
                <span className={styles.slider}></span>
              </label>
            </a>

            <p className={otherLocale}>
              {locale === 'ar' ? 'English' : 'العربية'}
            </p>
          </div>
          <div className={styles.complementaryInfo}>
            <div className={styles.bottomNavIcons}>
              <div className={styles.bottomNavIcons}>
                <Link href="https://twitter.com/mauzoun_?lang=en" passHref>
                  <IoLogoTwitter size="30px" />
                </Link>
                <Link href="https://www.instagram.com/mauzoun/?hl=en" passHref>
                  <IoLogoInstagram size="30px" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/mauzoun/about/"
                  passHref
                >
                  <IoLogoLinkedin size="30px" />
                </Link>
              </div>
            </div>
            <span className="email">{f('email')}</span>
            <span className="bolder">{f('location')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
