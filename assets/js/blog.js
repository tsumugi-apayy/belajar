/* ================= FANDOM SEARCH ================= */

const fandomSearch =
    document.getElementById("fandomSearch");

const fandomSearchResult =
    document.getElementById("fandomSearchResult");

if (fandomSearch) {

    const rows =
        document.querySelectorAll(".fandom-table tbody tr");

    fandomSearch.addEventListener("keyup", () => {

        const value =
            fandomSearch.value.toLowerCase();

        fandomSearchResult.innerHTML = "";

        if (value === "") {

            fandomSearchResult.style.display = "none";

            return;
        }

        let found = false;

        rows.forEach(row => {

            const img = row.querySelector("img");

            const alt = img.alt.toLowerCase();

            if (alt.includes(value)) {

                found = true;

                const item =
                    document.createElement("div");

                item.classList.add("search-item");

                item.textContent = img.alt;

                item.addEventListener("click", () => {

                    fandomSearchResult.style.display = "none";

                    fandomSearch.value = img.alt;

                    const navbarHeight = 100;

                    const y =
                        row.getBoundingClientRect().top +
                        window.pageYOffset -
                        navbarHeight;

                    window.scrollTo({
                        top: y,
                        behavior: "smooth"
                    });

                    row.classList.add("highlight-row");

                    setTimeout(() => {
                        row.classList.remove("highlight-row");
                    }, 2000);

                });

                fandomSearchResult.appendChild(item);

            }

        });

        fandomSearchResult.style.display =
            found ? "block" : "none";

    });

    document.addEventListener("click", (e) => {

        if (
            !e.target.closest(".nav-search")
        ) {

            fandomSearchResult.style.display = "none";

        }

    });

}