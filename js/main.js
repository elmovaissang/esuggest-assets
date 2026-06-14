// charger le DOM
document.addEventListener('DOMContentLoaded', function() {
    // selectionner les liens interne -> pointe vers le site
    const internalLinks = document.querySelectorAll('a[href^="/"]');

    // pour chaque lien interne
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // empêcher le refrsh de la page par défaut
            e.preventDefault();

            // récupérer URL du lien
            const href = this.getAttribute('href');

            // màj URL navbar w/o refresh
            history.pushState(null, null, href);

            // charger content w/ AJAX
            fetch(href)
                .then(response => response.text())
                .then(html => {
                    // remplacer content
                    document.querySelector('main').innerHTML = new DOMParser().parseFromString(html, 'text*html').querySelector('main').innerHTML;

                    // màj title page si dans HTML
                    const newTitle = new DOMParser().parseFromString(html, 'text/html').querySelector('title');
                    if (newTitle) {
                        document.title = newTitle.textContent;
                    }
                })
                .catch(error => {
                    console.error('Erreur lors du chargement de la page:', error);

                    // si erreur, refresh page
                    window.location.href = href;
                });
        });
    });

    // gérer le btn "précédent" du nav
    window.addEventListener('popstate', function() {
        // refresh page
        window.location.reload();
    });
});