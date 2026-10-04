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
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bindThemeButtons);
    } else {
        bindThemeButtons();
    }
})();