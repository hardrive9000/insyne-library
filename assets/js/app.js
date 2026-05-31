fetch('https://docs.google.com/spreadsheets/d/17y-2OAHVNqEOV7QvZWOMvXze-hn3faRnTJZbbQpy1wE/gviz/tq?tqx=out:json')
    .then(res => res.text())
    .then(text => {

        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows;

        const data = rows.map(r => ({
            sistema: r.c[0]?.v || "",
            juego: r.c[1]?.v || "",
            link: r.c[2]?.v || ""
        }));

        init(data);
    });

function animateCount(target) {

    const counter = document.getElementById('count');

    const duration = 1500;
    const start = performance.now();

    counter.style.opacity = "0.7";
    counter.style.transform = "scale(1.08)";

    function update(now) {

        const progress = Math.min((now - start) / duration, 1);

        const current = Math.floor(progress * target);

        counter.textContent = `${current} juegos`;

        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            counter.textContent = `${target} juegos`;

            counter.style.opacity = "1";
            counter.style.transform = "scale(1)";
        }
    }

    requestAnimationFrame(update);
}

function init(data) {

    const list = document.getElementById('list');
    const search = document.getElementById('search');
    const clearBtn = document.getElementById('clear-search');

    function render(items, animate = false) {

        if (animate) {
            animateCount(items.length);
        } else {
            document.getElementById('count').textContent = `${items.length} juegos`;
        }

        list.innerHTML = '';

        const grouped = {};
        items.forEach(i => {
            if (!grouped[i.sistema]) grouped[i.sistema] = [];
            grouped[i.sistema].push(i);
        });

        Object.keys(grouped).sort().forEach(system => {

            const section = document.createElement('div');

            const title = document.createElement('h2');
            title.style.cursor = "pointer";

            title.onclick = () => {
                const filtered = data.filter(i => i.sistema === system);
                render(filtered);
            };
            const count = grouped[system].length;
            title.textContent = `${system} (${count})`;
            section.appendChild(title);

            const grid = document.createElement('div');
            grid.className = 'grid';

            grouped[system]
                .sort((a, b) => a.juego.localeCompare(b.juego))
                .forEach(item => {

                    const card = document.createElement('div');
                    card.className = 'card';

                    card.textContent = item.link
                        ? `${item.juego} ⬇`
                        : item.juego;

                    if (item.link) {

                        card.style.border = "1px solid #38bdf8";

                        card.onclick = () => {
                            window.open(item.link, '_blank');
                        };
                    }

                    grid.appendChild(card);
                });

            section.appendChild(grid);
            list.appendChild(section);
        });
    }

    render(data, true);

    search.addEventListener('input', () => {

        const q = search.value.toLowerCase();

        search.classList.toggle('has-value', q.length > 0);

        clearBtn.classList.toggle('visible', q.length > 0);

        const filtered = data.filter(i =>
            i.juego.toLowerCase().includes(q) ||
            i.sistema.toLowerCase().includes(q)
        );

        render(filtered);
    });

    clearBtn.addEventListener('click', () => {

        search.value = '';
        search.classList.remove('has-value');
        clearBtn.classList.remove('visible');

        render(data);

        search.focus();
    });
}

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");

    document.querySelectorAll(".carousel img").forEach(img => {

        img.style.cursor = "zoom-in";

        img.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImg.src = img.src;
        });

    });

    document.addEventListener("click", (e) => {
        if (e.target.id === "close") {
            modal.style.display = "none";
        }
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

});
