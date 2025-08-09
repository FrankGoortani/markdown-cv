
/* Minimal terminal with command router. */
(function(){
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));
  const out = $("#out");
  const input = $("#cmd");

  const links = {
    resume_pdf: "https://goortani.com/media/Frank%20Goortani%20Resume--solution-architect-2024.pdf",
    short: "./short/",
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
  const write = (s="") => { out.insertAdjacentHTML("beforeend", s + "\n"); out.scrollTop = out.scrollHeight; };
  const line = (s="") => write(s.replace(/\n+$/,"")+"\n");
  const hr = () => write("────────────────────────────────────────────────────────");

  // content cache
  const cache = {};
  // Resolve content paths relative to site root, regardless of current page location
  function resolvePath(contentPath) {
    const currentPath = window.location.pathname;
    const isInSubdirectory = currentPath.includes('/short/');

    if (isInSubdirectory) {
      // From /short/ page, need to go up one level to reach content
      return '../' + contentPath.replace('./', '');
    } else {
      // From root page, use path as-is
      return contentPath;
    }
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
        "AVAILABLE COMMANDS",
        "  help            show this help",
        "  about           summary profile",
        "  cv              full CV (loads content/cv-full.html)",
        "  short           short CV (loads content/cv-short.html)",
        "  skills          quick list of skills",
        "  projects        highlights",
        "  links           all important hyperlinks",
        "  contact         email + schedule",
        "  blog            open Medium profile",
        "  pdf             open resume PDF",
        "  ls              list available commands (directory style)",
        "  search <query>  search CV content for keywords",
        "  clear           clear screen"
      ].join("\n"));
    },
    ls(){
      line([
        "DIRECTORY LISTING",
        "drwxr-xr-x  frank  staff    about/",
        "drwxr-xr-x  frank  staff    cv/",
        "drwxr-xr-x  frank  staff    short/",
        "drwxr-xr-x  frank  staff    skills/",
        "drwxr-xr-x  frank  staff    projects/",
        "drwxr-xr-x  frank  staff    links/",
        "drwxr-xr-x  frank  staff    contact/",
        "-rwxr-xr-x  frank  staff    blog*",
        "-rwxr-xr-x  frank  staff    pdf*",
        "-rwxr-xr-x  frank  staff    search*",
        "-rwxr-xr-x  frank  staff    clear*",
        "-rwxr-xr-x  frank  staff    help*",
        "",
        "Total: 12 items | Use command names to execute"
      ].join("\n"));
    },
    async cv(){
      line("Loading full CV…");
      const html = await load("./content/cv-full.html");
      write(html);
      hr();
    },
    async short(){
      line("Loading short CV…");
      const html = await load("./content/cv-short.html");
      write(html);
      hr();
    },
    about(){
      line("FRANK GOORTANI — Technology Leader & AI Strategist (TOGAF, PMP)");
      line("Focus: Generative AI (LLMs, agents), distributed systems, cloud-native, and mobile.");
      line("Email: "+links.email.replace("mailto:",""));
      line("Type `cv` for full resume or `short` for concise version.");
    },
    skills(){
      // intentionally concise; full list lives in cv pages
      line([
        "SKILLS SNAPSHOT",
        "- GenAI (LLMs, agents, RAG), Python, Go, Java, TypeScript",
        "- Systems: APIs, microservices, event streams (Kafka)",
        "- Cloud/DevOps: GCP, AWS, Kubernetes, CI/CD",
        "- Frontend/mobile: React, Angular, Native iOS/Android"
      ].join("\n"));
    },
    projects(){
      line([
        "PROJECT HIGHLIGHTS",
        "- Uber ELLE: AI decision engine for privacy/security reviews (award-winning)",
        "- Canada Life NEST: enterprise component library",
        "- Persian Points: loyalty platform architecture"
      ].join("\n"));
    },
    links(){
      const rows = [
        ["Download PDF", links.resume_pdf],
        ["Short Version", links.short],
        ["Blog", links.blog],
        ["LinkedIn", links.linkedin],
        ["Twitter", links.twitter],
        ["GitHub", links.github],
        ["ProductHunt", links.producthunt],
        ["Calendly", links.calendly],
        ["Architect Solutions", links.architect_solutions],
        ["VisionzLab", links.visionzlab]
      ];
      write("<strong>LINKS</strong>");
      rows.forEach(([label, href]) => {
        write(`• <a href="${href}" target="_blank" rel="noopener">${label}</a>`);
      });
      hr();
    },
    contact(){
      line("Email: " + links.email.replace("mailto:", ""));
      line("Schedule: " + links.calendly);
      line("Use `links` to see everything.");
    },
    pdf(){
      window.open(links.resume_pdf, "_blank");
    },
    async search(query){
      if(!query || query.trim() === ""){
        line("Usage: search <query>");
        line("Example: search \"AI\" or search \"python\"");
        return;
      }

      line("Searching CV content for: \"" + query + "\"");

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
        const lowerContent = textContent.toLowerCase();

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
        line("No matches found for: \"" + query + "\"");
        line("Try broader terms or check spelling.");
      } else {
        line("Found " + results.reduce((total, r) => total + r.matches.length, 0) + " match(es):");
        line("");

        results.forEach(result => {
          write(`<strong>${result.source}:</strong>`);
          result.matches.forEach(match => {
            write(`  • ...${match.snippet}...`);
          });
          line("");
        });

        line("Use 'cv' or 'short' commands to view full content.");
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
    const fn = commands[cmd.toLowerCase()];
    write(`<span class="glow">$ ${cmdline}</span>`);
    if(!fn){
      line("Command not found. Type `help`.");
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
  });

  // Boot message
  write("┌────────────────────────────────────────────────────────────┐");
  write("│  GOORTANI//TERMINAL  v1.99  ::  HomeBrew Edition           │");
  write("│  Type `help` to get started.                               │");
  write("└────────────────────────────────────────────────────────────┘\n");
  // show quick links
  commands.links();
})();
