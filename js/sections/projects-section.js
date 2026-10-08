/* ============================================================
   SANIA SAJU — PORTFOLIO
   SELECTED PROJECTS COMPONENT
============================================================ */

class ProjectsSection extends HTMLElement {

    connectedCallback() {

        /* ======================================================
           PROJECT DATA
        ====================================================== */

        const projects = [

            /* ==================================================
               01. PORTFOLIO
            ================================================== */

            {
                number: "01",

                title: "Portfolio | Website",

                type: "Web Design + Development",

                description:
                    "A personal portfolio designed to bring my multidisciplinary background, design philosophy, and selected work into one cohesive digital experience—balancing usability, storytelling, and a distinct personal identity.",

                tags: [
                    "#personal branding",
                    "#web design",
                    "#UI/UX strategy"
                ],

                caseStudyLink: "./pages/portfolio.html",

                mediaLink: "#home",

                mediaLabel:
                    "View Portfolio Website",

                mediaType:
                    "placeholder",

                reverse:
                    false
            },



            /* ==================================================
               02. CAMPINN
            ================================================== */

            {
                number: "02",

                title: "CampInn | Mobile App",

                type: "UI/UX Design",

                description:
                    "A mobile camping experience designed to make discovering, comparing, and purchasing camping gear easier through clearer information, thoughtful interactions, and a streamlined shopping journey.",

                tags: [
                    "#UX research",
                    "#mobile app",
                    "#interaction design",
                    "#accessibility"
                ],

                caseStudyLink: "./pages/campinn.html",

                mediaLink: "https://www.figma.com/proto/VM7V1xW0wPRbogJqQdxUgA/CampInn?node-id=365-801&p=f&t=zGcuOza1cbdZY2n2-1&scaling=scale-down&content-scaling=fixed&page-id=208%3A422&starting-point-node-id=365%3A801",

                mediaLabel:
                    "View CampInn prototype",

                mediaType:
                    "mobile-video",

                reverse:
                    true,

                mockup:
                    "./assets/images/mockups/mobile.svg",

                video:
                    "./assets/videos/campinn.webm"
            },


            /* ==================================================
               03. ALPHONSIANS' GYM
            ================================================== */

            {
                number: "03",

                title:
                    "Alphonsians’ Gym | Website",

                type:
                    "Web Design + Development",

                description:
                    "A responsive fitness website for Alphonsa College designed to help students explore the gym, book equipment and time slots, access training and wellness resources, and use practical fitness calculators.",

                tags: [
                    "#web design",
                    "#UI/UX",
                    "#responsive design",
                    "#front-end development"
                ],

                caseStudyLink: "./pages/alphonsiansgym.html",

                mediaLink:
                    "https://saniasaju.github.io/alphonsians-gym/",

                mediaLabel:
                    "View the live Alphonsians' Gym website",

                mediaType:
                    "laptop-video",

                reverse:
                    false,

                mockup:
                    "./assets/images/mockups/laptop.svg",

                video:
                    "./assets/videos/alphonsians-gym.webm"
            }

        ];



        /* ======================================================
           RENDER MEDIA
        ====================================================== */

        const renderMedia = project => {

            /* ==================================================
               CAMPINN — MOBILE VIDEO
            ================================================== */

            if (
                project.mediaType ===
                "mobile-video"
            ) {

                return `

                    <a
                        class="
                            project__media-link
                            project__media-link--mobile
                        "
                        href="${project.mediaLink}"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="${project.mediaLabel}"
                    >

                        <div class="mobile-mockup">


                            <!-- ================================
                                 MOBILE SCREEN
                            ================================= -->

                            <div
                                class="mobile-mockup__screen"
                                aria-hidden="true"
                            >

                                <video
                                    class="
                                        mobile-mockup__video
                                        project__video
                                    "
                                    muted
                                    loop
                                    playsinline
                                    preload="metadata"
                                >

                                    <source
                                        src="${project.video}"
                                        type="video/webm"
                                    >

                                </video>

                            </div>



                            <!-- ================================
                                 MOBILE FRAME
                            ================================= -->

                            <img
                                class="mobile-mockup__frame"
                                src="${project.mockup}"
                                alt=""
                                aria-hidden="true"
                            >


                        </div>

                    </a>

                `;

            }



            /* ==================================================
               ALPHONSIANS' GYM — LAPTOP VIDEO
            ================================================== */

            if (
                project.mediaType ===
                "laptop-video"
            ) {

                return `

                    <a
                        class="
                            project__media-link
                            project__media-link--laptop
                        "
                        href="${project.mediaLink}"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="${project.mediaLabel}"
                    >

                        <div class="laptop-mockup">


                            <!-- ================================
                                 LAPTOP FRAME
                            ================================= -->

                            <img
                                class="laptop-mockup__frame"
                                src="${project.mockup}"
                                alt=""
                                aria-hidden="true"
                            >



                            <!-- ================================
                                 LAPTOP SCREEN
                            ================================= -->

                            <div
                                class="laptop-mockup__screen"
                                aria-hidden="true"
                            >

                                <video
                                    class="
                                        laptop-mockup__video
                                        project__video
                                    "
                                    muted
                                    loop
                                    playsinline
                                    preload="metadata"
                                >

                                    <source
                                        src="${project.video}"
                                        type="video/webm"
                                    >

                                </video>

                            </div>


                        </div>

                    </a>

                `;

            }



            /* ==================================================
               DEFAULT PLACEHOLDER
            ================================================== */

            return `

                <a
                    class="project__media-link"
                    href="${project.mediaLink}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="${project.mediaLabel}"
                >

                    <div
                        class="project__media-placeholder"
                        aria-hidden="true"
                    ></div>

                </a>

            `;

        };



        /* ======================================================
           RENDER PROJECT
        ====================================================== */

        const renderProject = project => {

            const tags =
                project.tags
                    .map(
                        tag => `
                            <span>
                                ${tag}
                            </span>
                        `
                    )
                    .join("");


            const reverseClass =
                project.reverse
                    ? "project--reverse"
                    : "";


            return `

                <article
                    class="
                        project
                        ${reverseClass}
                    "
                >


                    <!-- ========================================
                         PROJECT CONTENT
                    ========================================= -->

                    <div class="project__content">


                        <h3 class="project__title">

                            ${project.title}

                        </h3>


                        <p class="project__type">

                            ${project.type}

                        </p>


                        <p class="project__description">

                            ${project.description}

                        </p>


                        <div
                            class="project__tags"
                            aria-label="Project tags"
                        >

                            ${tags}

                        </div>


                        <a
                            class="project__cta"
                            href="${project.caseStudyLink}"
                        >

                            <span>
                                View Case Study
                            </span>


                            <portfolio-arrow
                                direction="right"
                            ></portfolio-arrow>

                        </a>


                    </div>



                    <!-- ========================================
                         PROJECT VISUAL
                    ========================================= -->

                    <div class="project__visual">

                        <div
                            class="project__rectangle"
                            aria-hidden="true"
                        ></div>

                        <span
                            class="project__number"
                            aria-hidden="true"
                        >
                            ${project.number}
                        </span>

                        ${renderMedia(project)}

                    </div>


                </article>

            `;

        };



        /* ======================================================
           BUILD PROJECTS
        ====================================================== */

        const projectsMarkup =
            projects
                .map(renderProject)
                .join("");



        /* ======================================================
           COMPONENT
        ====================================================== */

        this.innerHTML = `

            <section
                class="projects"
                aria-label="Selected projects"
            >

                <div
                    class="projects__inner"
                    id="work"
                >

                    ${projectsMarkup}

                </div>

            </section>

        `;



        /* ======================================================
           PROJECT ENTRANCE MOTION
        ====================================================== */

        this.setupProjectReveal();

    }



    /* ==========================================================
       ONE-TIME PROJECT REVEAL
    ========================================================== */

    setupProjectReveal() {

        const projects =
            Array.from(
                this.querySelectorAll(
                    ".project"
                )
            );


        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );



        /* ======================================================
           REDUCED MOTION

           Show everything immediately.
        ====================================================== */

        if (reducedMotion.matches) {

            projects.forEach(project => {

                project.classList.add(
                    "is-visible",
                    "is-revealed"
                );


                const video =
                    project.querySelector(
                        ".project__video"
                    );


                if (video) {

                    video
                        .play()
                        .catch(() => {});

                }

            });


            return;

        }



        /* ======================================================
           INTERSECTION OBSERVER
        ====================================================== */

        this.projectObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const project =
                            entry.target;



                        /* ======================================
                           ALREADY REVEALED

                           Never replay the entrance.
                        ====================================== */

                        if (
                            project.classList.contains(
                                "is-revealed"
                            )
                        ) {

                            this.projectObserver.unobserve(
                                project
                            );

                            return;

                        }



                        const rectangle =
                            project.querySelector(
                                ".project__rectangle"
                            );


                        const video =
                            project.querySelector(
                                ".project__video"
                            );


                        if (!rectangle) {

                            this.projectObserver.unobserve(
                                project
                            );

                            return;

                        }



                        /* ======================================
                           START ENTRANCE
                        ====================================== */

                        project.classList.add(
                            "is-visible"
                        );



                        /* ======================================
                           WAIT FOR VISUAL TO SETTLE
                        ====================================== */

                        const handleTransitionEnd =
                            event => {

                                if (
                                    event.target !== rectangle
                                ) {
                                    return;
                                }


                                if (
                                    event.propertyName !==
                                    "transform"
                                ) {
                                    return;
                                }



                                /* ==============================
                                   FINAL PERMANENT STATE
                                ============================== */

                                project.classList.add(
                                    "is-revealed"
                                );



                                /* ==============================
                                   START VIDEO

                                   Starts only when the mockup
                                   reaches its final position.
                                ============================== */

                                if (video) {

                                    video.currentTime = 0;


                                    video
                                        .play()
                                        .catch(() => {});

                                }



                                /* ==============================
                                   CLEANUP
                                ============================== */

                                rectangle.removeEventListener(
                                    "transitionend",
                                    handleTransitionEnd
                                );


                                this.projectObserver.unobserve(
                                    project
                                );

                            };


                        rectangle.addEventListener(
                            "transitionend",
                            handleTransitionEnd
                        );

                    });

                },

                {
                    threshold: 0.3
                }

            );



        /* ======================================================
           OBSERVE PROJECTS
        ====================================================== */

        projects.forEach(project => {

            this.projectObserver.observe(
                project
            );

        });

    }



    /* ==========================================================
       CLEANUP
    ========================================================== */

    disconnectedCallback() {

        if (this.projectObserver) {

            this.projectObserver.disconnect();

        }

    }

}



/* ============================================================
   REGISTER
============================================================ */

customElements.define(
    "projects-section",
    ProjectsSection
);