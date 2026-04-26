fetch('https://docs.google.com/spreadsheets/d/17y-2OAHVNqEOV7QvZWOMvXze-hn3faRnTJZbbQpy1wE/gviz/tq?tqx=out:json')
    .then(res => res.text())
    .then(text => {

        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows;

        const data = rows.map(r => ({
            sistema: r.c[0]?.v || "",
            juego: r.c[1]?.v || ""
        }));

        init(data);
    });

function init(data) {

    const list = document.getElementById('list');
    const search = document.getElementById('search');

    function render(items) {
        document.getElementById('count').textContent = `${items.length} juegos`;
        list.innerHTML = '';

        const grouped = {};
        items.forEach(i => {
            if (!grouped[i.sistema]) grouped[i.sistema] = [];
            grouped[i.sistema].push(i.juego);
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
                .sort((a, b) => a.localeCompare(b))
                .forEach(game => {

                    const card = document.createElement('div');
                    card.className = 'card';

                    card.textContent = game;

                    grid.appendChild(card);
                });

            section.appendChild(grid);
            list.appendChild(section);
        });
    }

    render(data);

    search.addEventListener('input', () => {
        const q = search.value.toLowerCase();

        const filtered = data.filter(i =>
            i.juego.toLowerCase().includes(q) ||
            i.sistema.toLowerCase().includes(q)
        );

        render(filtered);
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
