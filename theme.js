(function () {
    var root = document.documentElement;
    var savedTheme = null;

    try {
        savedTheme = localStorage.getItem("theme");
    } catch (error) {}

    var theme = savedTheme === "dark" || savedTheme === "sombre"
        ? "dark"
        : savedTheme === "light" || savedTheme === "clair"
            ? "light"
            : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    function setTheme(nextTheme, persist) {
        root.setAttribute("data-theme", nextTheme);
        if (persist) {
            try {
                localStorage.setItem("theme", nextTheme);
            } catch (error) {}
        }

        document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
            var dark = nextTheme === "dark";
            var icon = button.querySelector("[data-theme-icon]");
            if (icon) icon.textContent = dark ? "☀" : "☾";
            button.setAttribute("title", dark ? "Passer au mode clair" : "Passer au mode sombre");
            button.setAttribute("aria-label", dark ? "Passer au mode clair" : "Passer au mode sombre");
            button.setAttribute("aria-pressed", String(dark));
        });
    }

    setTheme(theme, false);

    function bindThemeButtons() {
        document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
            button.addEventListener("click", function () {
                setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
            });
        });

        document.querySelectorAll(".mobile-menu-btn").forEach(function (button) {
            var navigation = document.getElementById(button.getAttribute("aria-controls"));
            if (!navigation) return;

            function setMenuOpen(isOpen) {
                navigation.classList.toggle("is-open", isOpen);
                button.setAttribute("aria-expanded", String(isOpen));
                button.setAttribute("aria-label", isOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation");
                var icon = button.querySelector("[aria-hidden='true']");
                if (icon) icon.textContent = isOpen ? "✕" : "☰";
            }

            button.addEventListener("click", function () {
                setMenuOpen(button.getAttribute("aria-expanded") !== "true");
            });

            navigation.querySelectorAll(".nav-link").forEach(function (link) {
                link.addEventListener("click", function () {
                    setMenuOpen(false);
                });
            });

            navigation.addEventListener("keydown", function (event) {
                if (event.key === "Escape") {
                    setMenuOpen(false);
                    button.focus();
                }
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bindThemeButtons);
    } else {
        bindThemeButtons();
    }
})();