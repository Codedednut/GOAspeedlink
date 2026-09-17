/* =========================================
   GOA SPEEDLINK TECHNOLOGIES
   JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const hamburger =
    document.getElementById("hamburger");

const mobileNav =
    document.getElementById("mobileNav");


hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");

    mobileNav.classList.toggle("open");

    document.body.classList.toggle("menu-open");

    const isOpen =
        mobileNav.classList.contains("open");

    hamburger.setAttribute(
        "aria-expanded",
        isOpen
    );

});


/* Close mobile menu when link is clicked */

document
    .querySelectorAll(".mobile-nav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            hamburger.classList.remove("active");

            mobileNav.classList.remove("open");

            document.body.classList.remove("menu-open");

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });



/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();



/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section[id]");

const desktopLinks =
    document.querySelectorAll(
        ".desktop-nav a"
    );


function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    desktopLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);



/* =========================================
   EMAILJS
========================================= */

/*
    IMPORTANT:

    Replace these three values after creating
    your EmailJS account:

    YOUR_PUBLIC_KEY
    YOUR_SERVICE_ID
    YOUR_TEMPLATE_ID
*/


emailjs.init({

    publicKey:
        "YOUR_PUBLIC_KEY"

});


const contactForm =
    document.getElementById("contact-form");

const submitButton =
    document.getElementById("submitBtn");

const formStatus =
    document.getElementById("formStatus");


contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        submitButton.disabled = true;

        submitButton.querySelector("span")
            .textContent = "Sending...";


        formStatus.textContent = "";

        formStatus.className =
            "form-status";


        emailjs.sendForm(

            "YOUR_SERVICE_ID",

            "YOUR_TEMPLATE_ID",

            this

        )

        .then(() => {

            formStatus.textContent =
                "Message sent successfully. We will get back to you shortly.";

            formStatus.classList.add(
                "success"
            );


            contactForm.reset();


            submitButton
                .querySelector("span")
                .textContent =
                "Message Sent ✓";


            setTimeout(() => {

                submitButton
                    .querySelector("span")
                    .textContent =
                    "Send Message";

            }, 4000);

        })

        .catch(error => {

            console.error(
                "EmailJS error:",
                error
            );


            formStatus.textContent =
                "Something went wrong. Please try WhatsApp or email instead.";

            formStatus.classList.add(
                "error"
            );


            submitButton
                .querySelector("span")
                .textContent =
                "Try Again";

        })

        .finally(() => {

            submitButton.disabled = false;

        });

    }
);