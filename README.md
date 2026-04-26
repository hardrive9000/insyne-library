# 🎮 INSYNE Library

A curated, minimal and responsive video game catalog.
Built as an interactive showcase on GitHub Pages, with real-time data synced from Google Sheets.

---

## ✨ Features

* 📊 Centralized data source via Google Sheets
* 🔄 Automatic sync (no manual deploy required)
* 🔍 Real-time search
* 🎮 Grouping by system
* 🔢 Total and per-system counters
* 📱 Fully responsive (mobile-first)
* ⚡ No frameworks, no build tools, no dependencies

---

## 🧠 Architecture

The project follows a simple and robust philosophy:

```bash
/index.html          # Structure
/assets/
  /css/
    styles.css       # Styling
  /js/
    app.js           # Logic + rendering
```

### Data flow

```text
Google Sheets → JSON (gviz) → fetch() → render()
```

* Google Sheets acts as the database
* The frontend consumes and transforms the data
* No backend, no local persistence

---

## 🔗 Data Source

The catalog is powered by a public Google Sheets document using:

```
https://docs.google.com/spreadsheets/d/{ID}/gviz/tq?tqx=out:json
```

The parsing logic in `app.js` converts Google's response into usable JSON.

---

## 🚀 Deployment

The site is deployed via GitHub Pages:

1. Repository → Settings
2. Pages → Deploy from branch
3. Branch: `main`
4. Folder: `/ (root)`

No build step required.

---

## 🎯 Philosophy

INSYNE Library is not just a list:

* It is **curated**
* It is **minimal yet functional**
* It is **frictionless by design**

> Less tooling. More control.

---

## 🔮 Roadmap (optional)

* ⭐ Persistent favorites
* 🎨 Game cover images
* 🔗 URL-based filters
* 📊 Advanced statistics

---

## 🧑‍💻 Author

Personal project focused on simplicity, control, and aesthetics.

---

## ⚡ Stack

* HTML
* CSS (Grid + responsive design)
* Vanilla JavaScript
* Google Sheets (as backend)
* GitHub Pages (hosting)

---

## 🧩 License

This project is released under **The Unlicense**.

You are free to use, modify, distribute, and do whatever you want with this code, without restriction.

For more information, see: https://unlicense.org/
