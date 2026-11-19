# ALGORITHM FIELDBOOK

**A simple interactive website for the Discrete Mathematics (SC612) algorithms assignment.**

Prepared by **Kirtan Mistry** (Student ID **202612004**). The academic material follows Kenneth H. Rosen, *Discrete Mathematics and Its Applications*, 8th edition, Chapter 3 (Sections 3.1–3.3). The updated notes PDF is bundled with the website, displaying the name Kirtan Mistry on its cover.

## The fastest way to get a link for your professor

**You do not need to install Python, Streamlit, Node.js, or any other software.**

1. Download `Algorithm_Fieldbook_Mathematical_Reasoning_Ready_To_Host.zip` and **extract** it into a new folder on your computer.
2. Open the extracted folder. Make sure you can see `index.html`, `assets`, and this `README.md` directly inside it.
3. Open **https://app.netlify.com/drop** in your browser.
4. Drag the **entire extracted folder** into the drop area (or choose the folder to upload). Netlify publishes the files as a static website.
5. Copy the website address Netlify gives you. It will usually look like `https://your-site-name.netlify.app/`.
6. **Claim or sign in to manage the site** so you can keep it, rename it, and update it later.
7. Open the site link in a private/incognito browser window and check **My Notes**, **Algorithm Visualizer**, **Growth of Functions**, and **Knowledge Check**.
8. Submit **that public web address** to your professor. **Do not submit `localhost` or a path to `index.html` on your computer.**

**Important:** This folder alone is not a live link. Publishing it through a hosting service creates the link. Since the hosted site is public, the PDF and any identifying details in it will also be visible to visitors with the link.

**Alternative:** Put all website files in a GitHub repository and enable **Settings → Pages → Deploy from a branch** with the root folder. GitHub Pages can host the same static site. You do not need a server, build step, or workflow.

## Using the website

| Page | What it does |
| --- | --- |
| Home | A clean starting point with one-click links to the key sections |
| Algorithm Fundamentals | Algorithm definition, properties, maximum trace |
| Algorithm Explorer | Search the algorithms and read pseudocode, Python code, and complexity |
| Algorithm Visualizer | Enter your own input; Start, Previous, Next, Run all, or Reset |
| Growth of Functions | Change the input size, scale, and functions plotted; explore O, Ω, Θ bounds |
| Complexity Lab | Change input sizes and inspect mathematically defined operation counts |
| Algorithm Comparison | Select algorithms and change the operation-count graph range and scale |
| Reasoning Studio | Predict the next step, find algorithm counterexamples, and order pseudocode lines |
| Mathematics Lab | Asymptotic proof witnesses, correctness invariants, operation counts, and probability experiments |
| Experiment Notebook | Save proofs and traces; download printable HTML reports or structured JSON |
| Knowledge Check | A 15-question quiz, answer feedback, final score, retry |
| My Notes | Read, open, or download your included 32-page assignment PDF |
| References | Rosen Chapter 3 and the companion notes |

### Quick instructions for the important controls

**Try an algorithm:** Go to **Algorithm Visualizer**, select the algorithm, edit the input, click **Start / update**, then click **Next step**. **Run all** jumps to the final algorithm state; **Reset** returns to the initial state. **Restore example** fills in a known working example.

**Change a graph:** Go to **Growth of Functions**, tick the functions you want to compare, move the input-size slider, and choose **Linear** or **Logarithmic** scale. The data table below shows example values. In **Algorithm Comparison**, you can also change the number of inputs and the scale.

**Read your notes:** Click **My notes** at the top right of any page. You can read the PDF inside the site, open it in a new tab, or download it.

## Technical details

The website uses ordinary HTML, CSS, and JavaScript with no backend, database, external AI API, account, or build process. Algorithm steps are calculated in the browser from the given inputs. Graphs are SVG charts calculated from explicit functions or operation counts; they do not represent measured program running times. All 15 quiz questions are predefined.

The full website was exercised using browser-rendered HTML/CSS/JavaScript with manually loaded local assets because direct local HTTP/file navigation is blocked in this environment. The Mathematics Lab, experiment exports, visualizer, notes navigation, growth chart, quiz navigation, and responsive layout were checked. The math-engine tests also passed 650+ independent assertions; the notebook executed all 15 code cells without errors. A public hosting deployment has not yet been performed. The included notes PDF has 32 pages and uses the shortened name Kirtan Mistry.

### Files

- `index.html` — the entry point the browser opens.
- `assets/styles.css` — styling and responsive layout.
- `assets/app.js` — pages, navigation, controls, charts and quiz.
- `assets/engine.js` — deterministic algorithm steps and input validation.
- `assets/data.js` — descriptions, pseudocode, Python samples and quiz questions.
- `assets/reasoning.js` — practice questions derived from algorithm traces and counterexample calculations.
- `assets/Algorithms_Analytical_Notes.pdf` — the included notes with the shortened name on the cover.
- `assets/mark.svg` — the website's mark.
- `.nojekyll` — useful when publishing to GitHub Pages.

When uploading updates, keep these paths and filenames intact so the notes button and all other features continue working.


## New: Reasoning Studio

The Reasoning Studio introduces active learning activities alongside the existing visualizers:

- **Predict the Next Step:** Ten short puzzles based on the same deterministic algorithm trace engine as the visualizer. The student chooses an answer before the trace reveals what actually happens, can request a hint, and receives a plain-language explanation. First-attempt progress stays in the current browser session only.
- **Find the Counterexample:** Three experiments use custom inputs to show when greedy coin change is not minimum, why binary search requires sorted values, and how an early-stop modification changes bubble sort's comparison count. The minimum-coin comparison is an explicitly identified supplementary check, not an algorithm attributed to Rosen Chapter 3.
- **Build the Pseudocode:** Four line-ordering exercises for maximum-finding, linear search, bubble sort, and insertion sort. Use accessible move-up/down buttons, check the line order, and reveal an explanation.

These additions run entirely in the browser and require no account or backend.

## New: Mathematical Reasoning Edition

- **Mathematics Lab**: An analytical Big-O/Ω/Θ witness checker (not a finite-graph guess); correctness arguments with initialization, maintenance and termination; operation counts with explicit counting conventions; and reproducible average-case linear search sampling.
- **Code-to-Execution Microscope**: The Visualizer also shows the Python teaching code and the statement associated with each trace event. Some introduction/termination events are conceptual summaries rather than individual Python executions.
- **Experiment Notebook**: Save a mathematical proof, experiment or full trace while browsing. Download the report as a printable HTML document (open and Print > Save as PDF) or JSON. Data remains on the local page until downloaded; there is no database or upload.
- **Updated Notes**: The final notes PDF includes a brief mathematical supplement and a reserved dashboard-link page. No public URL is fabricated.

### After publishing: attach the real URL to your notes

See `HOST_AND_LINK.md`. Publish this directory to Netlify or GitHub Pages to obtain the actual HTTPS URL. Use `python insert_dashboard_link.py https://your-real-site-url.netlify.app/` to create `Algorithms_Notes_With_Dashboard_Link.pdf` with a clickable link. Upload the updated PDF to `assets/Algorithms_Analytical_Notes.pdf` and republish the site if you want the embedded notes to contain the live link as well. Alternatively, send your actual live URL in the chat and request that PDF update.
