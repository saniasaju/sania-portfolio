/* ============================================================
   SANIA SAJU — PORTFOLIO
   PORTFOLIO NAVBAR COMPONENT

   Supports:
   - Homepage navigation
   - Case-study page navigation
   - Solid / transparent variants through CSS
============================================================ */


class PortfolioNavbar extends HTMLElement {


    /* ========================================================
       CONNECT
    ======================================================== */

    connectedCallback() {

        if (
            this.dataset.initialized ===
            "true"
        ) {
            return;
        }


        this.dataset.initialized =
            "true";


        this.render();

    }



    /* ========================================================
       GET LINKS

       Homepage:
       #home
       #work
       #pixels
       #about
       #contact

       Case-study pages:
       ../index.html#home
       ../index.html#work
       etc.
    ======================================================== */

    getNavigationLinks() {

        /*
           All case-study pages currently live
           inside /pages/.

           body.portfolio-page also gives us
           an explicit page-level check.
        */

        const isCaseStudyPage =
            document.body.classList.contains(
                "portfolio-page"
            ) ||
            window.location.pathname.includes(
                "/pages/"
            );


        const homePrefix =
            isCaseStudyPage
                ? "../index.html"
                : "";


        return {

            home:
                `${homePrefix}#home`,

            work:
                `${homePrefix}#work`,

            pixels:
                `${homePrefix}#pixels`,

            about:
                `${homePrefix}#about`,

            contact:
                `${homePrefix}#contact`

        };

    }



    /* ========================================================
       RENDER
    ======================================================== */

    render() {

        const links =
            this.getNavigationLinks();


        this.innerHTML = `

            <header class="portfolio-navbar">

                <nav
                    class="nav"
                    aria-label="Primary navigation"
                >

                    <div class="nav__links">


                        <!-- ==================================
                             HOME
                        =================================== -->

                        <a
                            class="nav__link"
                            href="${links.home}"
                            aria-label="Sania Saju — Home"
                        >
                            SANIA SAJU
                        </a>


                        <!-- ==================================
                             PROJECTS
                        =================================== -->

                        <a
                            class="nav__link"
                            href="${links.work}"
                        >
                            Projects
                        </a>


                        <!-- ==================================
                             PIXELS
                        =================================== -->

                        <a
                            class="nav__link"
                            href="${links.pixels}"
                        >
                            Pixels
                        </a>


                        <!-- ==================================
                             ABOUT
                        =================================== -->

                        <a
                            class="nav__link"
                            href="${links.about}"
                        >
                            About
                        </a>


                        <!-- ==================================
                             CONTACT
                        =================================== -->

                        <a
                            class="nav__link"
                            href="${links.contact}"
                        >
                            Contact
                        </a>


                    </div>

                </nav>

            </header>

        `;

    }

}



/* ============================================================
   REGISTER COMPONENT
============================================================ */

if (
    !customElements.get(
        "portfolio-navbar"
    )
) {

    customElements.define(
        "portfolio-navbar",
        PortfolioNavbar
    );

}