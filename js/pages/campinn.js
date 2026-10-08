/* ============================================================
   SANIA SAJU — CAMPINN CASE STUDY

   Responsibilities
   ------------------------------------------------------------
   - Make shared navbar links return to the homepage
   - Detect when the Case Study has settled below the navbar
   - Enable internal Case Study scrolling only after settling
   - Release scrolling back to the page at the content edges
   - Highlight the active Contents item
   - Navigate through the Contents
   - Route sidebar wheel movement to the right content panel
============================================================ */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* ====================================================
           ELEMENTS
        ==================================================== */

        const navbar =
            document.querySelector(
                ".campinn-page__navbar"
            );


        const study =
            document.querySelector(
                ".campinn-study"
            );


        const workspace =
            document.querySelector(
                ".campinn-study__workspace"
            );


        const content =
            document.querySelector(
                ".campinn-study__content"
            );


        const tocLinks =
            Array.from(
                document.querySelectorAll(
                    ".campinn-study__toc-link"
                )
            );


        const sections =
            Array.from(
                document.querySelectorAll(
                    "[data-study-section]"
                )
            );


        if (
            !study ||
            !workspace ||
            !content
        ) {
            return;
        }



        /* ====================================================
           CASE-STUDY NAVBAR LINKS

           The shared navbar uses homepage hashes.

           Because CampInn lives inside /pages/,
           these links need to return to index.html.
        ==================================================== */

        const homepageTargets =
            new Map([
                ["#home", "../index.html#home"],
                ["#work", "../index.html#work"],
                ["#pixels", "../index.html#pixels"],
                ["#about", "../index.html#about"],
                ["#contact", "../index.html#contact"]
            ]);


        if (navbar) {

            navbar
                .querySelectorAll(
                    "a[href]"
                )
                .forEach(
                    link => {

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            href &&
                            homepageTargets.has(
                                href
                            )
                        ) {

                            link.setAttribute(
                                "href",
                                homepageTargets.get(
                                    href
                                )
                            );

                        }

                    }
                );

        }



        /* ====================================================
           REDUCED MOTION
        ==================================================== */

        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );



        /* ====================================================
           STATE
        ==================================================== */

        let isSettled =
            false;


        let pageRafId =
            null;


        let contentRafId =
            null;



        /* ====================================================
           HELPERS
        ==================================================== */

        const getNavbarHeight =
            () => {

                return navbar
                    ? navbar
                        .getBoundingClientRect()
                        .height
                    : 0;

            };



        /* ====================================================
           CASE STUDY SETTLED STATE

           The Case Study settles directly below
           the sticky navbar.

           Only after it reaches this position
           does the right-side content become
           internally scrollable.
        ==================================================== */

        const updateStudyState =
            () => {


                pageRafId =
                    null;


                const studyRect =
                    study
                        .getBoundingClientRect();


                const navbarHeight =
                    getNavbarHeight();


                const shouldSettle =
                    studyRect.top <=
                    navbarHeight + 2;



                /* =================================================
                   NO STATE CHANGE
                ================================================= */

                if (
                    shouldSettle ===
                    isSettled
                ) {
                    return;
                }



                /* =================================================
                   UPDATE STATE
                ================================================= */

                isSettled =
                    shouldSettle;


                study.classList.toggle(
                    "is-settled",
                    isSettled
                );

            };



        /* ====================================================
           REQUEST STUDY UPDATE
        ==================================================== */

        const requestStudyUpdate =
            () => {


                if (pageRafId) {
                    return;
                }


                pageRafId =
                    requestAnimationFrame(
                        updateStudyState
                    );

            };



        /* ====================================================
           PAGE SCROLL

           Before settling:

           Hero
             ↓
           Case Study rises
             ↓
           Case Study reaches navbar
             ↓
           Inner content becomes scrollable
        ==================================================== */

        window.addEventListener(
            "scroll",
            requestStudyUpdate,
            {
                passive: true
            }
        );


        window.addEventListener(
            "resize",
            requestStudyUpdate
        );



        /* ====================================================
           ACTIVE CONTENTS ITEM
        ==================================================== */

        const setActiveSection =
            id => {


                tocLinks.forEach(
                    link => {


                        const isActive =
                            link.getAttribute(
                                "href"
                            ) ===
                            `#${id}`;



                        /* ==========================================
                           ACTIVE CLASS
                        ========================================== */

                        link.classList.toggle(
                            "is-active",
                            isActive
                        );



                        /* ==========================================
                           ACCESSIBILITY
                        ========================================== */

                        if (isActive) {

                            link.setAttribute(
                                "aria-current",
                                "true"
                            );

                        }

                        else {

                            link.removeAttribute(
                                "aria-current"
                            );

                        }

                    }
                );

            };



        /* ====================================================
           DETECT ACTIVE SECTION

           A marker 96px below the top of the
           case-study viewport determines which
           section is active.
        ==================================================== */

        const updateActiveSection =
            () => {


                contentRafId =
                    null;


                if (
                    sections.length === 0
                ) {
                    return;
                }



                const contentRect =
                    content
                        .getBoundingClientRect();


                const markerY =
                    contentRect.top +
                    96;


                let activeSection =
                    sections[0];



                sections.forEach(
                    section => {


                        const sectionRect =
                            section
                                .getBoundingClientRect();


                        if (
                            sectionRect.top <=
                            markerY
                        ) {

                            activeSection =
                                section;

                        }

                    }
                );



                setActiveSection(
                    activeSection.id
                );

            };



        /* ====================================================
           REQUEST ACTIVE SECTION UPDATE
        ==================================================== */

        const requestActiveUpdate =
            () => {


                if (contentRafId) {
                    return;
                }


                contentRafId =
                    requestAnimationFrame(
                        updateActiveSection
                    );

            };



        /* ====================================================
           INNER CONTENT SCROLL
        ==================================================== */

        content.addEventListener(
            "scroll",
            requestActiveUpdate,
            {
                passive: true
            }
        );



        /* ====================================================
           CONTENTS NAVIGATION
        ==================================================== */

        tocLinks.forEach(
            link => {


                link.addEventListener(
                    "click",
                    event => {


                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !href ||
                            !href.startsWith("#")
                        ) {
                            return;
                        }



                        const target =
                            document.querySelector(
                                href
                            );


                        if (!target) {
                            return;
                        }



                        event.preventDefault();



                        /* ==========================================
                           TARGET POSITION INSIDE INNER SCROLLER
                        ========================================== */

                        const contentRect =
                            content
                                .getBoundingClientRect();


                        const targetRect =
                            target
                                .getBoundingClientRect();


                        const targetTop =
                            content.scrollTop +
                            (
                                targetRect.top -
                                contentRect.top
                            );



                        /* ==========================================
                           SCROLL
                        ========================================== */

                        content.scrollTo({

                            top:
                                targetTop,

                            behavior:
                                prefersReducedMotion.matches
                                    ? "auto"
                                    : "smooth"

                        });



                        /* ==========================================
                           ACTIVE STATE
                        ========================================== */

                        setActiveSection(
                            target.id
                        );



                        /* ==========================================
                           UPDATE HASH
                        ========================================== */

                        history.replaceState(
                            null,
                            "",
                            href
                        );

                    }
                );

            }
        );



        /* ====================================================
           SIDEBAR WHEEL ROUTING

           Once the case study has settled,
           scrolling over the stationary Contents
           column should continue moving the
           right-side case study.

           Scrolling directly over the right content
           stays native.
        ==================================================== */

        workspace.addEventListener(
            "wheel",
            event => {


                /* =================================================
                   BEFORE SETTLING

                   Allow normal page scrolling.
                ================================================= */

                if (!isSettled) {
                    return;
                }



                /* =================================================
                   POINTER ALREADY OVER CONTENT

                   Native overflow scrolling handles this.
                ================================================= */

                if (
                    event.target.closest(
                        ".campinn-study__content"
                    )
                ) {
                    return;
                }



                const delta =
                    event.deltaY;


                const atTop =
                    content.scrollTop <= 1;


                const atBottom =
                    content.scrollTop +
                    content.clientHeight >=
                    content.scrollHeight - 1;



                /* =================================================
                   RELEASE UPWARD

                   If the internal content is already
                   at the beginning, allow the outer page
                   to scroll upward and reveal the Hero.
                ================================================= */

                if (
                    delta < 0 &&
                    atTop
                ) {
                    return;
                }



                /* =================================================
                   RELEASE DOWNWARD

                   If content reaches the end,
                   allow normal page scrolling again.
                ================================================= */

                if (
                    delta > 0 &&
                    atBottom
                ) {
                    return;
                }



                /* =================================================
                   ROUTE WHEEL TO INNER CONTENT
                ================================================= */

                event.preventDefault();


                content.scrollBy({

                    top:
                        delta,

                    behavior:
                        "auto"

                });

            },
            {
                passive: false
            }
        );



        /* ====================================================
           HASH ON INITIAL PAGE LOAD

           Example:

           campinn.html#user-flow

           01. Move outer page until case study settles.
           02. Scroll inner content to requested section.
        ==================================================== */

        const initialHash =
            window.location.hash;


        if (initialHash) {


            const target =
                document.querySelector(
                    initialHash
                );


            if (
                target &&
                target.matches(
                    "[data-study-section]"
                )
            ) {


                requestAnimationFrame(
                    () => {


                        const studyRect =
                            study
                                .getBoundingClientRect();


                        const navbarHeight =
                            getNavbarHeight();



                        /* ==========================================
                           OUTER PAGE POSITION
                        ========================================== */

                        const destination =
                            window.scrollY +
                            studyRect.top -
                            navbarHeight;


                        window.scrollTo({

                            top:
                                Math.max(
                                    destination,
                                    0
                                ),

                            behavior:
                                "auto"

                        });



                        /* ==========================================
                           WAIT FOR POSITION UPDATE
                        ========================================== */

                        requestAnimationFrame(
                            () => {


                                updateStudyState();



                                const contentRect =
                                    content
                                        .getBoundingClientRect();


                                const targetRect =
                                    target
                                        .getBoundingClientRect();


                                const targetTop =
                                    content.scrollTop +
                                    (
                                        targetRect.top -
                                        contentRect.top
                                    );



                                /* ==================================
                                   INNER CONTENT POSITION
                                ================================== */

                                content.scrollTo({

                                    top:
                                        targetTop,

                                    behavior:
                                        "auto"

                                });



                                setActiveSection(
                                    target.id
                                );

                            }
                        );

                    }
                );

            }

        }



        /* ====================================================
           INITIAL STATE
        ==================================================== */

        updateStudyState();

        updateActiveSection();

    }
);