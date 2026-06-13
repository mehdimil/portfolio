'use client';
import dynamic from 'next/dynamic';
import ScrollAnimations from './components/ScrollAnimations';
import Nav from './components/Nav';
import Cursor from './components/Cursor';

const ThreeScene = dynamic(() => import('./components/ThreeScene'), { ssr: false });

const skills = [
  {
    icon: '🔐',
    name: 'Cybersecurity',
    desc: 'Network defense and penetration testing , some knowledge in security tools.',
    tags: ['Wireshark', 'Nmap', 'Metasploit', 'kaspersky', 'IDS/IPS'],
  },
  {
    icon: '☁️',
    name: 'Cloud & DevOps',
    desc: 'Designing and deploying scalable infrastructure on AWS and Azure with CI/CD pipelines and containerization.',
    tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
  },
  {
    icon: '💻',
    name: 'Full-Stack Dev',
    desc: 'Building websites and modern applications',
    tags: ['React', 'Next.js', 'Node.js', 'Firebase', 'Flutter'],
  },
  {
    icon: '🛠️',
    name: 'IT Infrastructure',
    desc: 'Managing enterprise networks, Active Directory, helpdesk systems, and on-premise server environments.',
    tags: ['Active Directory', 'VMware', 'Linux', 'Windows Server', 'GLPI'],
  },
  {
    icon: '📊',
    name: 'Data Engineering',
    desc: 'Building data pipelines, analytics dashboards, data warehouses, data bases management, and ML-ready data architectures at scale.',
    tags: ['MySQL', 'Pandas', 'Power BI', 'NoSQL', 'ETL', 'SSMS', 'Data Warehousing','CRM'],
  },
  {
    icon: '🤖',
    name: 'AI & Automation',
    desc: 'Scripting intelligent automation, integrating LLM APIs, and deploying lightweight ML models in production.',
    tags: ['Python', 'TensorFlow', 'LangChain', 'Bash', 'APIs'],
  },
];

const projects = [
  {
    title: 'health AI app , website and admin dashboard',
    desc: 'a mental health app based on real data and research, to help users track their mood, identify triggers, and access coping strategies. The admin dashboard allows mental health professionals to monitor user progress, manage content, and analyze engagement metrics.',
    tags: ['React', 'Node.js', 'Flutter', 'Firebase', 'AI Integration', 'Supabase'],
    links: [{ label: '→ View Demo', href: 'https://sakinapath.onrender.com/' }, { label: '→ GitHub', href: '#' }],
  },
  {
    title: 'backplace',
    desc: 'a ui tiktok based app for books and audiobooks, give the user the ability to share and discover books, and audiobooks.',
    tags: ['Flutter', 'Firebase', 'Supabase'],
    links: [{ label: '→ View Demo', href: '#' }, { label: '→ GitHub', href: '#' }],
  },
  
];

const experience = [
  {
    period: '2026',
    role: 'IT Intern DSI',
    company: 'Condor Electronics, Bordj Bou Arréridj',
    desc: 'Managing enterprise network infrastructure, system administration, maintaining Active Directory, and developing internal systems. Contributed to cybersecurity audits and IT documentation.',
  },
  {
    period: '2026',
    role: 'full Stack Developer',
    company: 'Self-employed / Startup Project',
    desc: 'creating an AI based app for menatal health , using flutter , node.js ..etc',
  },
 
];

export default function Home() {
  return (
    <>
      <Cursor />
      <ThreeScene />
      <ScrollAnimations />
      <Nav />

      <div className="content">
        <section className="hero" id="home">
          <p className="hero-eyebrow mono">// IT Engineer & Data science Specialist</p>
          <h1 className="hero-title">
            <span className="line">Mehdi<span className="accent"> Miloudi</span></span>
            <span className="line"><span className="accent-gold">IT</span> Engineer</span>
          </h1>
          <p className="hero-sub">
            IT Engineer specializing in Data Science, Software Development, and System Administration, with experience in data analysis, application development, server management, network administration, and IT infrastructure support.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">View Work →</a>
            <a href="#contact" className="btn-ghost">Let's Talk</a>
          </div>
          <div className="scroll-indicator">
            <div className="scroll-line" />
            <span className="scroll-text mono">scroll to explore</span>
          </div>
        </section>

        <section id="about" style={{ paddingTop: '10rem' }}>
          <p className="section-eyebrow">01 / about me</p>
          <h2 className="section-title">Engineer by trade,<br /><span style={{ color: 'var(--cyan)' }}>hacker</span> by mindset.</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>I'm a final-year IT Engineering student completing an internship at Condor Electronics within the DSI (Direction des Systèmes d'Information), where I've been hands-on with enterprise cybersecurity, network infrastructure, and internal software systems.</p>
              <p>Based in Bourdj bou Arréridj, Algeria. Open to remote roles and international opportunities.</p>
              <div className="about-stats">
                {[['3+','Years Coding'],['B2','english level'],['B2','French level'],['B1','deutsch level']].map(([num,label])=>(
                  <div key={label} className="stat-card">
                    <div className="stat-num mono">{num}</div>
                    <div className="stat-label">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-visual">
              <div className="orbit-container">
                {[100,160,220,280].map((size,i)=>(
                  <div key={i} className="orbit-ring" style={{
                    width:size,height:size,
                    top:`calc(50% - ${size/2}px)`,
                    left:`calc(50% - ${size/2}px)`,
                    animationDuration: `${8+i*6}s`,
                    animationName:'orbit-spin',
                    animationTimingFunction:'linear',
                    animationIterationCount:'infinite',
                    animationDirection: i%2===1?'reverse':'normal',
                  }}>
                    {i===1&&<div className="orbit-dot orbit-dot-gold"/>}
                    {i===2&&<div className="orbit-dot"/>}
                  </div>
                ))}
                <div className="core-badge">
                  <span className="big mono">AK</span>
                  <span className="small">IT ENGINEER</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills">
          <p className="section-eyebrow">02 / skills &amp; tools</p>
          <h2 className="section-title">What I bring<br />to the table.</h2>
          <div className="skills-grid">
            {skills.map(s=>(
              <div key={s.name} className="skill-card">
                <div className="skill-icon">{s.icon}</div>
                <div className="skill-name">{s.name}</div>
                <div className="skill-desc">{s.desc}</div>
                <div className="skill-tags">{s.tags.map(t=><span key={t} className="tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects">
          <p className="section-eyebrow">03 / selected projects</p>
          <h2 className="section-title">Things I've<br />built &amp; shipped.</h2>
          <div className="projects-list">
            {projects.map((p,i)=>(
              <div key={p.title} className="project-card">
                <div className="project-num mono">0{i+1}</div>
                <div>
                  <div className="project-title">{p.title}</div>
                  <div className="project-desc">{p.desc}</div>
                  <div className="project-meta">{p.tags.map(t=><span key={t} className="tag">{t}</span>)}</div>
                </div>
                <div className="project-link">{p.links.map(l=><a key={l.label} href={l.href}>{l.label}</a>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience">
          <p className="section-eyebrow">04 / experience</p>
          <h2 className="section-title">Where I've<br />made impact.</h2>
          <div className="timeline">
            {experience.map(e=>(
              <div key={e.role} className="timeline-item">
                <div className="timeline-dot"/>
                <div className="timeline-period mono">{e.period}</div>
                <div className="timeline-role">{e.role}</div>
                <div className="timeline-company">{e.company}</div>
                <div className="timeline-desc">{e.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact">
          <p className="section-eyebrow">05 / contact</p>
          <h2 className="section-title">Let's build<br />something together.</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <p>Whether you're looking for an IT engineer, a cybersecurity specialist, or a developer who can wear multiple hats — I'm currently open to new opportunities, internships, and freelance projects.</p>
              <div className="contact-links">
                {[
                  {icon:'📧',label:'Email',value:'mahdimilou79@gmail.com',href:'mailto:mahdimilou79@gmail.com'},
                  {icon:'💼',label:'LinkedIn',value:'linkedin.com/in/mehdi miloudi',href:'#'},
                  {icon:'🐙',label:'GitHub',value:'github.com/mehdimil',href:'https://github.com/mehdimil'},
                  {icon:'📍',label:'Location',value:'Bourdj bou Arréridj, Algeria (Remote OK)',href:'#'},
                ].map(c=>(
                  <a key={c.label} href={c.href} className="contact-link">
                    <span className="contact-link-icon">{c.icon}</span>
                    <div>
                      <div className="contact-link-label mono">{c.label}</div>
                      <div className="contact-link-value">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <form className="contact-form" onSubmit={e=>e.preventDefault()}>
              <div className="form-group"><label>Name</label><input type="text" placeholder="Your name"/></div>
              <div className="form-group"><label>Email</label><input type="email" placeholder="your@email.com"/></div>
              <div className="form-group"><label>Message</label><textarea placeholder="Tell me about your project..."/></div>
              <button type="submit" className="btn-primary" style={{alignSelf:'flex-start'}}>Send Message →</button>
            </form>
          </div>
        </section>

        <footer>
          <span className="mono" style={{color:'var(--muted)'}}>© 2026 <span style={{color:'var(--cyan)'}}>Mehdi Miloudi</span>. Built with Next.js + Three.js + GSAP.</span>
          <span className="mono" style={{color:'var(--muted)'}}>Bourdj bou Arréridj, Algeria 🇩🇿</span>
        </footer>
      </div>
    </>
  );
}
