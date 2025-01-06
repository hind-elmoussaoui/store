// Gestion du panier
const panier = {};
const boutonOuvrir = document.getElementById("ouvrirPanier");
const boutonFermer = document.getElementById("fermerPanier");
const panierDiv = document.getElementById("panier");
const contenuPanier = document.getElementById("contenuPanier");
const totalPrix = document.getElementById("totalPrix");

// Ouvrir le panier
boutonOuvrir.addEventListener("click", () => {
    panierDiv.classList.add("visible");
});

// Fermer le panier
boutonFermer.addEventListener("click", () => {
    console.log("Bouton fermer cliqué");
    panierDiv.classList.remove("visible");
});

// Ajouter un produit au panier via l'icône
document.querySelectorAll(".icon-ajouter").forEach((icon) => {
    icon.addEventListener("click", (e) => {
        const produit = e.target.dataset.produit;
        const prix = parseFloat(e.target.dataset.prix);
        const image = e.target.dataset.image;

        if (panier[produit]) {
            panier[produit].quantite += 1;
        } else {
            panier[produit] = { prix: prix, quantite: 1, image: image };
        }

        afficherPanier();

        // Afficher la notification après avoir ajouté le produit
        ajouterAuPanier();
    });
});

// Afficher le contenu du panier
function afficherPanier() {
    contenuPanier.innerHTML = ""; 
    let total = 0;

    for (const produit in panier) {
        const { prix, quantite, image } = panier[produit];
        total += prix * quantite;

        // Créer un élément pour chaque produit
        const produitElement = document.createElement("div");
        produitElement.classList.add("article-panier");
        produitElement.innerHTML = `
            <img src="${image}" alt="${produit}" class="image-panier" />
            <div class="details-produit">
                <p><strong>${produit}</strong></p>
                <p>${prix} MAD x ${quantite}</p>
                <div>
                    <button class="btn-augmenter" data-produit="${produit}">+</button>
                    <button class="btn-diminuer" data-produit="${produit}">-</button>
                </div>
            </div>
        `;
        contenuPanier.appendChild(produitElement);
    }

    totalPrix.textContent = `Total : ${total} MAD`;

    // Ajouter des événements pour augmenter ou diminuer la quantité
    document.querySelectorAll(".btn-augmenter").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const produit = e.target.dataset.produit;
            panier[produit].quantite += 1;
            afficherPanier();
        });
    });

    document.querySelectorAll(".btn-diminuer").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const produit = e.target.dataset.produit;
            if (panier[produit].quantite > 1) {
                panier[produit].quantite -= 1;
            } else {
                delete panier[produit];
            }
            afficherPanier();
        });
    });
}

window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY; 
    panierDiv.style.top = `${scrollPosition + 10}px`; 
});

// Fonction qui affiche la notification de produit ajouté
function ajouterAuPanier() {
    var message = document.getElementById('message-panier');
    message.style.display = 'block';

    setTimeout(function() {
        message.style.display = 'none';
    }, 2000);
}

