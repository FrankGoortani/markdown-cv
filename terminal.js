
/* Minimal terminal with command router. */
(function(){
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));
  const out = $("#out");
  const input = $("#cmd");

  // Command history for arrow key navigation
  const commandHistory = [];
  let historyIndex = -1;

  // determine base path relative to site root for subdirectory pages
  const rootPath = (() => {
    const depth = window.location.pathname.split("/").filter(Boolean).length;
    return depth ? "../".repeat(depth) : "./";
  })();

  const links = {
    resume_pdf: rootPath + "resume/",
    short: rootPath + "short/",
    blog: "https://medium.com/@FrankGoortani",
    linkedin: "https://www.linkedin.com/in/frankgoortani/",
    stackoverflow: "https://stackoverflow.com/users/1136641/frank-goortani",
    twitter: "https://twitter.com/FrankGoortani",
    github: "https://github.com/FrankGoortani",
    producthunt: "https://www.producthunt.com/@frankgoortani",
    calendly: "https://calendly.com/frankgoortani",
    architect_solutions: "https://architect.solutions",
    visionzlab: "https://visionzlab.com",
    email: "mailto:frank@goortani.com"
  };

  // print helpers
  const write = (s="") => {
    out.insertAdjacentHTML("beforeend", s + "\n");
    out.scrollTop = out.scrollHeight;
    // Also scroll the page to show the prompt
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };
  const line = (s="") => write(s.replace(/\n+$/,"")+"\n");

  // Responsive terminal width calculation
  const getTerminalWidth = () => {
    const outputEl = $("#out");
    if (!outputEl) return 60; // fallback

    // Create a test element to measure character width
    const testEl = document.createElement('span');
    testEl.style.visibility = 'hidden';
    testEl.style.position = 'absolute';
    testEl.style.fontFamily = getComputedStyle(outputEl).fontFamily;
    testEl.style.fontSize = getComputedStyle(outputEl).fontSize;
    testEl.textContent = 'M'; // Use 'M' as it's typically the widest character
    outputEl.appendChild(testEl);

    const charWidth = testEl.getBoundingClientRect().width;
    const availableWidth = outputEl.getBoundingClientRect().width - 40; // Account for padding

    outputEl.removeChild(testEl);

    const terminalWidth = Math.max(40, Math.min(60, Math.floor(availableWidth / charWidth)));
    return terminalWidth;
  };

  // Responsive horizontal rule — ASCII only
  const hr = () => {
    const width = getTerminalWidth();
    write("=".repeat(width));
  };

  // Responsive box creation — ASCII box characters
  const createBox = (content) => {
    const width = getTerminalWidth();
    const lines = Array.isArray(content) ? content : [content];

    // Top border
    write("+" + "-".repeat(width - 2) + "+");

    // Content lines
    lines.forEach(line => {
      const paddedLine = line.length > width - 4
        ? line.substring(0, width - 7) + "..."
        : line + " ".repeat(width - 4 - line.length);
      write("| " + paddedLine + " |");
    });

    // Bottom border
    write("+" + "-".repeat(width - 2) + "+");
  };

  // content cache
  const cache = {};
  // Resolve content paths relative to site root, regardless of current page location
  function resolvePath(contentPath) {
    const depth = window.location.pathname.split("/").filter(Boolean).length;
    if (depth === 0) return contentPath;
    return "../".repeat(depth) + contentPath.replace("./", "");
  }

  async function load(path){
    const resolvedPath = resolvePath(path);
    if(cache[resolvedPath]) return cache[resolvedPath];

    const res = await fetch(resolvedPath, {cache:"no-store"});
    if(!res.ok) throw new Error("Failed to load "+resolvedPath+" (Status: "+res.status+")");
    const txt = await res.text();
    cache[resolvedPath] = txt;
    return txt;
  }

  const commands = {
    help(){
      line([
        "AVAILABLE COMMANDS:",
        "---------------------------------------",
        "  HELP            SHOW THIS HELP",
        "  ABOUT           SUMMARY PROFILE",
        "  CV              FULL CV",
        "  SHORT           SHORT CV",
        "  FASTEROUTCOMES  CURRENT CTO ROLE",
        "  SKILLS          SKILLS LIST",
        "  PROJECTS        PROJECT HIGHLIGHTS",
        "  LINKS           ALL HYPERLINKS",
        "  CONTACT         EMAIL + SCHEDULE",
        "  BLOG            OPEN MEDIUM PROFILE",
        "  PDF             OPEN RESUME PDF",
        "  LS              DIRECTORY LISTING",
        "  SEARCH <QUERY>  SEARCH CV CONTENT",
        "  CLEAR           CLEAR SCREEN",
        "---------------------------------------",
        "TAB=AUTOCOMPLETE  ARROWS=HISTORY"
      ].join("\n"));
    },
    ls(){
      line([
        "DIRECTORY LISTING:",
        "---------------------------------------",
        "DRWXR-XR-X  FRANK  STAFF    ABOUT/",
        "DRWXR-XR-X  FRANK  STAFF    CV/",
        "DRWXR-XR-X  FRANK  STAFF    SHORT/",
        "DRWXR-XR-X  FRANK  STAFF    FASTEROUTCOMES/",
        "DRWXR-XR-X  FRANK  STAFF    SKILLS/",
        "DRWXR-XR-X  FRANK  STAFF    PROJECTS/",
        "DRWXR-XR-X  FRANK  STAFF    LINKS/",
        "DRWXR-XR-X  FRANK  STAFF    CONTACT/",
        "-RWXR-XR-X  FRANK  STAFF    BLOG*",
        "-RWXR-XR-X  FRANK  STAFF    PDF*",
        "-RWXR-XR-X  FRANK  STAFF    SEARCH*",
        "-RWXR-XR-X  FRANK  STAFF    CLEAR*",
        "-RWXR-XR-X  FRANK  STAFF    HELP*",
        "---------------------------------------",
        "TOTAL: 13 ITEMS"
      ].join("\n"));
    },
    async cv(){
      line("LOADING FULL CV...");
      const html = await load("./content/cv-full.html");
      write(html);
      hr();
    },
    async short(){
      line("LOADING SHORT CV...");
      const html = await load("./content/cv-short.html");
      write(html);
      hr();
    },
    about(){
      hr();
      line("FRANK GOORTANI");
      line("=======================================");
      line("");
      line("ROLE:  CHIEF TECHNOLOGY OFFICER");
      line("ORG:   FASTEROUTCOMES (AI LEGAL TECH)");
      line("STAGE: 0 -> 1 -> SERIES A");
      line("");
      line("25+ YEARS SCALING AI SYSTEMS AND");
      line("ENGINEERING TEAMS. CURRENTLY BUILDING");
      line("PRODUCTION LLM SYSTEMS. PREVIOUSLY");
      line("SOLUTION ARCHITECT AT UBER.");
      line("");
      line("EXPERTISE:");
      line("  - PRODUCTION AI/LLM SYSTEMS");
      line("  - ENGINEERING LEADERSHIP");
      line("  - 0->1 PRODUCT DEVELOPMENT");
      line("  - TECHNICAL STRATEGY");
      line("");
      line("EDUCATION:");
      line("  M.SC. MANAGEMENT (AMIRKABIR UNIV.)");
      line("  B.SC. SOFTWARE ENG. (AMIRKABIR UNIV.)");
      line("  TOGAF 9.1 | PMP CERTIFIED");
      hr();
    },
    fasteroutcomes(){
      hr();
      line("=======================================");
      line("  FASTEROUTCOMES | CTO ROLE");
      line("=======================================");
      line("");
      line("COMPANY:  FASTEROUTCOMES (AI LEGAL TECH)");
      line("ROLE:     CHIEF TECHNOLOGY OFFICER");
      line("TIMELINE: PT (MAR 2024) -> FT (JAN 2026)");
      line("STAGE:    0 -> 1 -> SERIES A PREP");
      line("");
      line("KEY ACHIEVEMENTS:");
      line("---------------------------------------");
      line("* MVP IN 12 WEEKS (LANGGRAPH, RAG, AI)");
      line("* POC -> PRODUCTION (ENTERPRISE)");
      line("* TECHNICAL ARCH + ENG CULTURE");
      line("* PRODUCT ROADMAP + TECH STRATEGY");
      line("");
      line("TECH STACK:");
      line("---------------------------------------");
      line("* AI:    LANGCHAIN, LANGGRAPH, RAG");
      line("* BE:    PYTHON, FASTAPI, LANGFX");
      line("* FE:    REACT 18, TYPESCRIPT, NEXTJS");
      line("* CLOUD: FIREBASE, GCP, VERCEL");
      line("* DATA:  OPENSEARCH, FIRESTORE");
      line("");
      line("STATUS: FULL-TIME / SERIES A FOCUS");
      line("NOT SEEKING OTHER OPPORTUNITIES.");
      line("");
      line(">> https://fasteroutcomes.com");
      line(">> https://linkedin.com/in/frankgoortani");
      hr();
    },
    skills(){
      line([
        "SKILLS SNAPSHOT:",
        "---------------------------------------",
        "* AGENTIC: CLAUDE CODE, CURSOR, COPILOT",
        "* AI/ML:   LLMS, AGENTS, RAG, LANGCHAIN",
        "* LANG:    PYTHON, GO, JAVA, TYPESCRIPT",
        "* SYSTEMS: APIS, MICROSERVICES, KAFKA",
        "* CLOUD:   GCP, AWS, K8S, CI/CD",
        "* FE:      REACT, ANGULAR, IOS/ANDROID"
      ].join("\n"));
    },
    projects(){
      line([
        "PROJECT HIGHLIGHTS:",
        "---------------------------------------",
        "* UBER ELLE: AI DECISION ENGINE FOR",
        "  PRIVACY/SECURITY REVIEWS (AWARD)",
        "* CANADA LIFE NEST: ENTERPRISE",
        "  COMPONENT LIBRARY",
        "* PERSIAN POINTS: LOYALTY PLATFORM",
        "  ARCHITECTURE"
      ].join("\n"));
    },
    links(){
      const rows = [
        ["DOWNLOAD PDF", links.resume_pdf],
        ["SHORT VERSION", links.short],
        ["BLOG", links.blog],
        ["LINKEDIN", links.linkedin],
        ["TWITTER", links.twitter],
        ["GITHUB", links.github],
        ["PRODUCTHUNT", links.producthunt],
        ["CALENDLY", links.calendly],
        ["ARCHITECT.SOLUTIONS", links.architect_solutions],
        ["VISIONZLAB", links.visionzlab]
      ];
      write("<strong>LINKS:</strong>");
      rows.forEach(([label, href]) => {
        write(`  >> <a href="${href}" target="_blank" rel="noopener">${label}</a>`);
      });
      hr();
    },
    contact(){
      line("EMAIL:    " + links.email.replace("mailto:", ""));
      line("SCHEDULE: " + links.calendly);
      line("");
      line("TYPE 'LINKS' FOR ALL CONTACT METHODS.");
    },
    pdf(){
      window.open(links.resume_pdf, "_blank");
    },
    async search(query){
      if(!query || query.trim() === ""){
        line("USAGE: SEARCH <QUERY>");
        line("EXAMPLE: SEARCH AI");
        return;
      }

      line("SEARCHING FOR: \"" + query.toUpperCase() + "\"...");

      const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
      const results = [];

      // Search in cached content first, then load if needed
      const contentSources = [
        {name: "Full CV", path: "./content/cv-full.html", content: cache[resolvePath("./content/cv-full.html")]},
        {name: "Short CV", path: "./content/cv-short.html", content: cache[resolvePath("./content/cv-short.html")]}
      ];

      for(const source of contentSources){
        let content = source.content;
        if(!content){
          try {
            content = await load(source.path);
          } catch(e) {
            continue; // Skip if content can't be loaded
          }
        }

        // Remove HTML tags and convert to text
        const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

        // Find matches
        const matches = [];
        searchTerms.forEach(term => {
          const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
          const termMatches = [...textContent.matchAll(regex)];
          termMatches.forEach(match => {
            const start = Math.max(0, match.index - 50);
            const end = Math.min(textContent.length, match.index + match[0].length + 50);
            const snippet = textContent.substring(start, end).trim();
            matches.push({
              term: match[0],
              snippet: snippet,
              position: match.index
            });
          });
        });

        if(matches.length > 0){
          results.push({
            source: source.name,
            matches: matches.slice(0, 3) // Limit to 3 matches per source
          });
        }
      }

      if(results.length === 0){
        line("NO MATCHES FOUND FOR: \"" + query.toUpperCase() + "\"");
        line("TRY BROADER TERMS OR CHECK SPELLING.");
      } else {
        line("FOUND " + results.reduce((total, r) => total + r.matches.length, 0) + " MATCH(ES):");
        line("");

        results.forEach(result => {
          write(`<strong>${result.source}:</strong>`);
          result.matches.forEach(match => {
            write(`  • ...${match.snippet}...`);
          });
          line("");
        });

        line("TYPE 'CV' OR 'SHORT' TO VIEW FULL CONTENT.");
      }
    },
    clear(){
      out.innerHTML = "";
    }
  };

  function run(cmdline){
    const parts = cmdline.trim().split(/\s+/);
    const [cmd, ...args] = parts;
    if(!cmd) return;

    // Add to command history
    if(cmdline.trim() !== "") {
      commandHistory.push(cmdline.trim());
      historyIndex = -1; // Reset position
    }

    const fn = commands[cmd.toLowerCase()];
    write(`<span class="glow">$ ${cmdline}</span>`);
    if(!fn){
      line("COMMAND NOT FOUND. TYPE 'HELP'.");
      return;
    }
    // Pass arguments to command function
    const query = args.join(' ');
    Promise.resolve(fn(query)).catch(e => line("Error: "+e.message));
  }

  input.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
      const value = input.value;
      input.value = "";
      run(value);
    }
    else if(e.key === "Tab"){
      e.preventDefault();
      const currentInput = input.value.trim().toLowerCase();

      // Get matching commands
      const possibleCommands = Object.keys(commands).filter(cmd =>
        cmd.startsWith(currentInput)
      );

      if(possibleCommands.length === 1){
        // Single match - auto-complete
        input.value = possibleCommands[0] + " ";
        // Move cursor to end
        input.setSelectionRange(input.value.length, input.value.length);
      } else if(possibleCommands.length > 1){
        // Multiple matches - show suggestions
        line(`\nSuggestions: ${possibleCommands.join(', ')}`);
      }
    }
    else if(e.key === "ArrowUp"){
      e.preventDefault();
      if(commandHistory.length > 0 && historyIndex < commandHistory.length - 1){
        historyIndex++;
        input.value = commandHistory[commandHistory.length - 1 - historyIndex];
      }
    }
    else if(e.key === "ArrowDown"){
      e.preventDefault();
      if(historyIndex > 0){
        historyIndex--;
        input.value = commandHistory[commandHistory.length - 1 - historyIndex];
      } else if(historyIndex === 0){
        historyIndex = -1;
        input.value = "";
      }
    }
  });

  // Mobile command button handlers
  document.querySelectorAll('.cmd-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const command = btn.getAttribute('data-command');
      input.value = command;
      input.focus();
      run(command);
    });
  });

  // Boot sequence
  write("BIOS POST... OK");
  write("MEM TEST: 640K RAM... OK");
  write("LOADING GOORTANI//TERMINAL v1.99...");
  write("");
  createBox([
    "GOORTANI//TERMINAL  v1.99",
    "(C) 2025 FRANK GOORTANI",
    "TYPE 'HELP' FOR COMMANDS"
  ]);
  write("");
  commands.links();
})();
