function displayDetails(passedItem) {
    let clickedPart = passedItem.className;
    let existingElementAbout = document.querySelector(".Details-Class-about");
    let existingElementContact = document.querySelector(".Details-Class-contact");

    switch (clickedPart) {
        case "about":
            if (existingElementContact) {
                existingElementContact.remove();
            }
            if (existingElementAbout) {
                existingElementAbout.remove();
            } else {
                let elementCreated = document.createElement("div");
                elementCreated.className = "Details-Class-about";
                elementCreated.innerHTML = `
                            <p>
                                The Memory Game is a fun and challenging test of concentration and recall.
                                The game consists of a set of flipped cards, each hiding a unique shape.
                                When the game begins, all cards are briefly revealed for a second before
                                flipping back to their hidden state. The challenge is to memorize the locations
                                of matching shapes and uncover them in pairs. The game enhances memory, attention,
                                and pattern recognition skills, making it both entertaining and educational.
                                Can you match all the pairs before time runs out?
                                Test your memory and see how well you can remember! 🧠✨
                            </p>
                        `;
                document.body.appendChild(elementCreated);

            }
            break;


        case "contact":
            if (existingElementAbout) {
                existingElementAbout.remove();
            }
            if (existingElementContact) {
                existingElementContact.remove();
            } else {
                let elementCreated = document.createElement("div");
                elementCreated.className = "Details-Class-contact";
                elementCreated.innerHTML = `
                        <p>📩 <strong>Get in Touch!</strong></p>
                        <ul>
                            <li><i class="fab fa-linkedin"></i> <a href="https://www.linkedin.com/in/gaber-raafat?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BfLg9U7dqSdSEyFoQ4TkcLg%3D%3D" target="_blank">LinkedIn</a></li>
                            <li><i class="fab fa-facebook"></i> <a href="https://www.facebook.com/abdalla.gaber.520" target="_blank">Facebook</a></li>
                            <li><i class="fas fa-envelope"></i> <a href="mailto:gaberraffat8@gmail.com">Contact Via Email</a></li>
                        </ul>
                    `;

                document.body.appendChild(elementCreated);
            }
            break;

    }
}
