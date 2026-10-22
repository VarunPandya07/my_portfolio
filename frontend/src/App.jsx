
// import { useState } from "react";
import { useEffect, useState } from "react";
const skills = [
  { category: "Operating Systems", items: "Linux · Ubuntu · Fedora" },
  { category: "Containers", items: "Docker · Docker Compose" },
  { category: "Orchestration", items: "Kubernetes · Helm" },
  { category: "CI/CD", items: "Jenkins · Git · GitHub" },
  { category: "Web & Networking", items: "Nginx · HTTP · DNS" },
  { category: "Cloud & Automation", items: "AWS · Shell Scripting · Ansible" },
];

const services = [
  {
    name: "Linux Administration",
    description:
      "Linux setup, service troubleshooting, logs, permissions, and server maintenance.",
  },
  {
    name: "Docker & Kubernetes",
    description:
      "Containerize applications and deploy workloads using Kubernetes resources.",
  },
  {
    name: "CI/CD Automation",
    description:
      "Set up Jenkins pipelines for repeatable builds, tests, and deployments.",
  },
  {
    name: "Web Server Setup",
    description:
      "Configure Nginx, reverse proxy routing, and application hosting.",
  },
];

const commands = {
  help: "Available commands: about, skills, projects, services, contact, clear",
  about:
    "System Administrator and DevOps professional focused on Linux, containers, automation, and reliable deployments.",
  skills: "Linux | Docker | Kubernetes | Jenkins | AWS | Nginx | Git",
  projects:
    "Portfolio Platform, Kubernetes Deployment, CI/CD Automation. Explore the Projects section below.",
  services:
    "Linux Administration, Docker & Kubernetes, CI/CD Automation, Web Server Setup.",
  contact:
    "Email: YOUR_EMAIL@example.com | LinkedIn: YOUR_LINKEDIN_URL",
};

function SectionHeading({ number, children }) {
  return (
    <div className="section-heading">
      <span className="section-number">{number}</span>
      <h2>{children}</h2>
      <span className="heading-line" />
    </div>
  );
}

// function Terminal() {
//   const [input, setInput] = useState("");
//   const [history, setHistory] = useState([
//     { type: "output", text: "Welcome to VarunOS v1.0" },
//     { type: "output", text: 'Type "help" to list available commands.' },
//   ]);

//   function runCommand(event) {
//     event.preventDefault();
//     const command = input.trim().toLowerCase();
//     if (!command) return;

//     const response =
//       command === "clear"
//         ? null
//         : commands[command] || `Command not found: ${command}. Type "help".`;

//     setHistory((previous) =>
//       command === "clear"
//         ? []
//         : [
//             ...previous,
//             { type: "command", text: input },
//             { type: "output", text: response },
//           ]
//     );
//     setInput("");
//   }

//   return (
//     <div className="terminal-window">
//       <div className="terminal-titlebar">
//         <div className="window-dots">
//           <span />
//           <span />
//           <span />
//         </div>
//         <span>varun@portfolio: ~</span>
//         <span className="terminal-live">● LOCAL TERMINAL</span>
//       </div>

//       <div className="terminal-body">
//         <pre className="ascii-logo">{`  _   __
//  | | / /__  _______
//  | |/ / _ \\/ __/ _ \\
//  |___/\\___/_/  \\___/`}</pre>
//         <p className="terminal-muted">
//           SYSTEM ADMINISTRATOR / DEVOPS ENGINEER
//         </p>

//         {history.map((item, index) => (
//           <div key={`${index}-${item.text}`} className="terminal-line">
//             {item.type === "command" ? (
//               <p>
//                 <span className="prompt">varun@portfolio:~$</span>{" "}
//                 {item.text}
//               </p>
//             ) : (
//               <p className="terminal-output">{item.text}</p>
//             )}
//           </div>
//         ))}

//         <form onSubmit={runCommand} className="terminal-input-row">
//           <label htmlFor="terminal-command" className="prompt">
//             varun@portfolio:~$
//           </label>
//           <input
//             id="terminal-command"
//             value={input}
//             onChange={(event) => setInput(event.target.value)}
//             placeholder="type a command..."
//             autoComplete="off"
//             spellCheck="false"
//           />
//         </form>
//       </div>
//     </div>
//   );
// }


function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "output", text: "Welcome to VarunOS v1.0" },
    { type: "output", text: 'Type "help" to list available commands.' },
  ]);
  const [commandsRun, setCommandsRun] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const commandHelp = {
    help: "Available commands: help, whoami, about, skills, projects, services, contact, pwd, ls, date, clear, history",
    whoami: "Varun Pandya | System Administrator & DevOps Engineer",
    about:
      "I work with Linux systems, server services, containers, and deployment automation.",
    skills:
      "Linux | Docker | Kubernetes | Jenkins | Nginx | Git | AWS | Ansible",
    projects:
      "Project details and GitHub repository links will be added after the projects are completed.",
    services:
      "Linux Administration | Docker & Kubernetes | CI/CD Automation | Nginx Configuration",
    contact:
      "Use the Contact section on this page to reach me. Personal contact links will be configured before publishing.",
    pwd: "/home/varun/portfolio",
    ls: "about/  skills/  projects/  services/  experience/  certifications/  contact/",
    date: new Date().toLocaleDateString(),
  };

  function executeCommand(rawCommand) {
    const command = rawCommand.trim().toLowerCase();

    if (!command) return;

    setCommandsRun((previous) => [...previous, rawCommand]);
    setHistoryIndex(-1);

    if (command === "clear") {
      setHistory([]);
      return;
    }

    if (command === "history") {
      const output = commandsRun.length
        ? commandsRun.map((item, index) => `${index + 1}  ${item}`).join("\n")
        : "No previous commands.";

      setHistory((previous) => [
        ...previous,
        { type: "command", text: rawCommand },
        { type: "output", text: output },
      ]);
      return;
    }

    const output = commandHelp[command];

    setHistory((previous) => [
      ...previous,
      { type: "command", text: rawCommand },
      {
        type: "output",
        text: output ?? `Command not found: ${command}. Type "help" for commands.`,
      },
    ]);

    const sectionMap = {
      about: "about",
      skills: "skills",
      projects: "projects",
      services: "services",
      contact: "contact",
    };

    if (sectionMap[command]) {
      document.getElementById(sectionMap[command])?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    executeCommand(input);
    setInput("");
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!commandsRun.length) return;

      const nextIndex =
        historyIndex === -1
          ? commandsRun.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setInput(commandsRun[nextIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;

      if (nextIndex >= commandsRun.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandsRun[nextIndex]);
      }
    }
  }

  return (
    <div className="terminal-window">
      <div className="terminal-titlebar">
        <div className="window-dots">
          <span />
          <span />
          <span />
        </div>
        <span>varun@portfolio: ~</span>
        <span className="terminal-live">● LOCAL TERMINAL</span>
      </div>

      <div className="terminal-body">
        <pre className="ascii-logo">{`  _   __
 | | / /__  _______
 | |/ / _ \\/ __/ _ \\
 |___/\\___/_/  \\___/`}</pre>

        <p className="terminal-muted">
          SYSTEM ADMINISTRATOR / DEVOPS ENGINEER
        </p>

        <div className="terminal-output-area" aria-live="polite">
          {history.map((item, index) => (
            <div key={`${index}-${item.text}`} className="terminal-line">
              {item.type === "command" ? (
                <p>
                  <span className="prompt">varun@portfolio:~$</span>{" "}
                  {item.text}
                </p>
              ) : (
                <pre className="terminal-output">{item.text}</pre>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="terminal-input-row">
          <label htmlFor="terminal-command" className="prompt">
            varun@portfolio:~$
          </label>
          <input
            id="terminal-command"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command..."
            autoComplete="off"
            spellCheck="false"
            aria-label="Terminal command"
          />
        </form>
      </div>
    </div>
  );
}


function App() {
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");

  useEffect(() => {
    fetch("/api/v1/projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load projects");
        }
        return response.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => setProjectsError(error.message))
      .finally(() => setProjectsLoading(false));
  }, []);
  return (
    <div className="site-shell">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-symbol">&gt;_</span> varun.dev
        </a>

        <nav aria-label="Main navigation">
          <a href="#about">about</a>
          <a href="#skills">skills</a>
          <a href="#projects">projects</a>
          <a href="#services">services</a>
          <a href="#contact">contact</a>
        </nav>

        <div className="resume-button navbar-resume">
          <a
            href="/Varun_Pandya_Resume.pdf"
            download="Varun_Pandya_Resume.pdf"
            className="resume-button"
          >
            <span aria-hidden="true">↓</span>
            Download Resume
          </a>
        </div>

        <a className="availability" href="#contact">
          <span /> Available for opportunities
        </a>
      </header>

      <main>
        <section id="home" className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="prompt">$</span> whoami
            </p>
            <h1>
              Hi, I'm <span className="accent">Varun Pandya.</span>
            </h1>
            <h2>System Administrator &amp; DevOps Engineer</h2>
            <p className="hero-description">
              I work with Linux systems, containerized applications, and
              deployment automation. I'm building practical solutions that
              make infrastructure more reliable and deployments more repeatable.
            </p>


            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                View my projects <span>↗</span>
              </a>
              <a className="button button-secondary" href="#contact">
                Hire me
              </a>
            </div>

            <div className="hero-meta">
              <span><span className="meta-icon">⌘</span> Linux &amp; Automation</span>
              <span><span className="meta-icon">▣</span> Containers &amp; CI/CD</span>
            </div>
          </div>

          <div className="hero-terminal">
            <Terminal />
            <div className="terminal-caption">
              <span>●</span> Interactive terminal · Try `help`
            </div>
          </div>
        </section>

        <section id="about" className="section-wrap content-section">
          <SectionHeading number="01">About me</SectionHeading>
          <div className="about-grid">
            <div>
              <p className="section-lead">
                Infrastructure, automation, and a habit of understanding how
                things work.
              </p>
              <p className="body-copy">
                I'm a System Administrator working with server services,
                Linux environments, and application support. I'm expanding my
                hands-on DevOps skills through Docker, Kubernetes, Jenkins,
                and infrastructure automation.
              </p>
              <p className="body-copy">
                My goal is to build reliable deployment workflows and take
                projects from source code to a running application.
              </p>
            </div>
            <div className="info-panel">
              <p><span>name</span> Varun Pandya</p>
              <p><span>role</span> System Administrator / DevOps</p>
              <p><span>focus</span> Linux · Containers · CI/CD</p>
              <p><span>work_mode</span> Employment + Freelance</p>
              <p><span>location</span> Ahmedabad, India</p>
            </div>
          </div>
        </section>

        <section id="skills" className="section-wrap content-section">
          <SectionHeading number="02">Technical skills</SectionHeading>
          <p className="body-copy section-intro">
            Tools I use or am developing hands-on experience with.
          </p>
          <div className="skills-grid">
            {skills.map((skill) => (
              <article className="skill-card" key={skill.category}>
                <span className="card-index">// {skill.category}</span>
                <p>{skill.items}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section-wrap content-section">
          <SectionHeading number="03">Featured projects</SectionHeading>
          <p className="body-copy section-intro">
            Practical work focused on deployment, infrastructure, and automation.
          </p>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.name}>
                <div className="project-topline">
                  <span className="folder-icon">~/</span>
                  <span className="project-status">{project.status}</span>
                </div>
                <p className="card-index">PROJECT_0{index + 1}</p>
                <h3>{project.name}</h3>
                <p className="body-copy">{project.description}</p>
                <div className="tag-list">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="note">
            Project status is shown honestly. Planned work is not presented as
            a completed deployment.
          </p>
        </section>

        <section id="services" className="section-wrap content-section">
          <SectionHeading number="04">Freelance services</SectionHeading>
          <p className="body-copy section-intro">
            Practical technical help for small teams, developers, and businesses.
          </p>
          <div className="services-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.name}>
                <span className="service-number">0{index + 1}</span>
                <h3>{service.name}</h3>
                <p className="body-copy">{service.description}</p>
                <a href="#contact">Discuss a project ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section-wrap content-section">
          <SectionHeading number="05">Experience &amp; learning</SectionHeading>
          <div className="timeline-card">
            <span className="timeline-marker" />
            <div>
              <p className="card-index">PROFESSIONAL EXPERIENCE</p>
              <h3>System Administrator</h3>
              <p className="accent">Nupeak IT Services Pvt. Ltd.</p>
              <p className="body-copy">
                Supporting server services and application environments,
                checking service health, troubleshooting issues, and working
                with Kubernetes-based applications and automation tools.
              </p>
            </div>
          </div>
          <div className="timeline-card">
            <span className="timeline-marker" />
            <div>
              <p className="card-index">PROFESSIONAL EXPERIENCE</p>
              <h3>DevOps &amp; Platform Engineering</h3>
              <p className="accent">Improwised Technologies</p>
              <p className="body-copy">
                Developing practical skills in Docker, Kubernetes, golang,
                Jenkins pipelines, Nginx, Git, and Linux automation.
              </p>
            </div>
          </div>
        </section>

        <section id="certifications" className="section-wrap content-section">
          <SectionHeading number="06">Certifications &amp; training</SectionHeading>
          <div className="cert-list">
            <div><span>01</span><p>Linux for Professionals · Cloud Folks HUB</p></div>
            <div><span>02</span><p>DevOps Training Program · Grras IT Solution</p></div>
          </div>
          <p className="note">
            Update this list to match your completed courses and verified
            certificates before publishing.
          </p>
        </section>

        <section id="contact" className="section-wrap content-section contact-section">
          <SectionHeading number="07">Let's work together</SectionHeading>
          <p className="section-lead">
            Have an infrastructure issue or a project that needs deployment
            automation?
          </p>
          <p className="body-copy">
            Send me a message about your project, requirements, and timeline.
          </p>
          <div className="contact-actions">
            <a
              className="button button-primary"
              href="mailto:varunpandya3112@gmail.com?subject=Portfolio%20Inquiry"
            >
              Email me ↗
            </a>
            <a
              className="button button-secondary"
              href="https://github.com/VarunPandya07"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a
              className="button button-secondary"
              href="https://www.linkedin.com/in/varun-pandya-703751223/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span><span className="prompt">root@varun:</span>~# exit</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}

export default App;
