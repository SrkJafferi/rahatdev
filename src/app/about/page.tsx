import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Building2, CalendarDays, Check, CircleCheck, Compass, Construction, Eye, House, Layers, MapPin, MessageSquareText, UserRound, Leaf, Store, Target, UsersRound } from 'lucide-react';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { FloatingContact } from '@/components/site/floating-contact';
import { OfficeLocationSection } from '@/components/site/office-location-section';
import { BeforeYouInvest } from '@/components/site/before-you-invest';
import { ProjectButton } from '@/components/site/dialogs';
import { Reveal } from '@/components/motion/reveal';
import { services } from '@/data/projects';
import { aboutPrinciples, aboutProjects } from '@/data/about';
import styles from './page.module.css';

const leaders = [
  {
    name: 'Syed Amir Ali Shah',
    role: 'Founder & Chief Executive Officer',
    photo: 'managing-director',
    bio: [
      'Syed Amir Ali Shah led Rahat Associates from its beginnings in brokerage into real estate development. He guides strategic planning, market analysis and relationships with investors, partners and other stakeholders.',
      'His approach combines integrity, innovation and attention to what clients need, with a focus on creating places that serve residents and communities over time.',
    ],
  },
  {
    name: 'Mudasar Hussain Shah',
    role: 'Managing Director',
    photo: 'founder',
    bio: [
      'Mudasar Hussain Shah brings an ACCA qualification and banking and finance experience in the United Arab Emirates to Rahat Associates.',
      'He leads project design, finishing and sales, drawing on international practices to improve build quality, design and the customer experience.',
    ],
  },
];

const journeyProjects = [
  { title: 'Completed Developments', icon: CircleCheck, projects: ['Rahat Arcade', 'Rahat Heights', 'Rahat Homes', 'Rahat Villa', 'Hunza Home'] },
  { title: 'Under Construction', icon: Construction, projects: ['Smart One Heights II', 'Rahat Heights II', 'Lake View Apartments'] },
];

const journeyStats = [
  { label: 'Founded', value: 2012, icon: CalendarDays },
  { label: 'Development transition', value: 2017, icon: Layers },
  { label: 'Completed developments', value: journeyProjects[0].projects.length, icon: Building2 },
  { label: 'Developments under construction', value: journeyProjects[1].projects.length, icon: Construction },
];

const companyPhotos = [
  ['groundbreaking', 'Groundbreaking'],
  ['inauguration', 'Rahat Heights inaugural ceremony'],
  ['office-team', 'Office and team'],
  ['community', 'Community gathering'],
  ['project-launch', 'Project launch'],
  ['sports', 'Sports and team spirit'],
  ['company-gathering', 'Company gathering'],
  ['office-opening', 'Office opening'],
];

const title = 'About Rahat Associates | Estate & Builders';
const description = 'Learn about Rahat Associates, our approach to residential and commercial developments, and our projects in Islamabad and Kharian.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    title, description, url: '/about', type: 'website', siteName: 'Rahat Associates', locale: 'en_PK',
    images: [{ url: '/og-image.jpg', width: 1200, height: 675, alt: 'Rahat Associates Estate & Builders' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] },
};

const expertise = services.filter((service) => service.id !== 'real-estate-development');
const expertiseIcons = { home: House, commercial: Store, enquiry: UsersRound, consultation: Compass, development: Building2 };
const approach = [
  { title: 'Listen', subtitle: 'Understand your needs', copy: 'We begin by understanding what matters to you, whether it is a home, a shop or a place for your business.', icon: MessageSquareText },
  { title: 'Plan', subtitle: 'Think through the details', copy: 'We design practical layouts, choose prime locations and plan every detail with a focus on long-term value.', icon: UserRound },
  { title: 'Develop', subtitle: 'Bring plans to life', copy: 'We create residential and commercial spaces with quality construction and attention to detail.', icon: Building2 },
  { title: 'Connect', subtitle: 'Support your journey', copy: 'We stay with you for clear communication and helpful guidance, from enquiry to handover.', icon: UsersRound },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header internalPage />
      <main id="main">
        <section className={styles.hero} id="home" aria-labelledby="about-title">
          <div className={styles.heroArt} aria-hidden="true">
            <Image src="/media/about-hero.webp" alt="" fill sizes="100vw" quality={90} loading="eager" fetchPriority="high" />
          </div>
          <div className={styles.heroVeil} aria-hidden="true" />
          <div className={styles.heroOutline} aria-hidden="true" />
          <div className={styles.heroInner}>
            <div aria-hidden="true" style={{ height: 22 }} />
            <p className={styles.heroEyebrow}>About Rahat Associates</p>
            <h1 className={styles.heroTitle} id="about-title">
              <span className={styles.heroLine}><span>Building More Than</span></span>
              <span className={styles.heroLine}><span><em>Just Properties</em>.</span></span>
            </h1>
            <p className={styles.heroCopy}>At Rahat Associates, we create modern residential and commercial spaces that bring people, businesses and communities closer to a better tomorrow.</p>
            <ul className={styles.heroFeatures} aria-label="The Rahat Associates perspective">
              <li><Building2 aria-hidden="true" /><span>Residential &amp;<br /> Commercial</span></li>
              <li><MapPin aria-hidden="true" /><span>Prime Locations<small>Islamabad &amp; Kharian</small></span></li>
              <li><UsersRound aria-hidden="true" /><span>People Focused<small>Communities</small></span></li>
            </ul>
          </div>
          <a className={styles.scrollLink} href="#story" aria-label="Discover who we are"><ArrowDown size={15} /><span>Discover our story</span></a>
        </section>

        <section className={styles.story} id="story" aria-labelledby="story-title">
          <div className={styles.container}>
            <div className={styles.storyGrid}>
              <div className={styles.storyCopy}>
                <p className={styles.kicker}>Our story</p>
                <h2 className={styles.sectionTitle} id="story-title">From trusted brokerage to <em>modern development.</em></h2>
                <p>Syed Amir Ali Shah founded Rahat Associates in Islamabad in 2012, starting with property brokerage and building client trust through transparent advice.</p>
                <p>In 2017, the company moved into real estate development, expanding from property advisory to designing and building residential, commercial and mixed-use projects.</p>
                <blockquote>Every project is more than bricks and space. It’s a vision brought to life.</blockquote>
                <a className={`header-cta ${styles.pill}`} href="#projects">Discover our developments <ArrowRight size={18} /></a>
              </div>
              <div className={styles.storyMosaic}>
                {['groundbreaking', 'company-gathering', 'project-launch'].map((photo) => (
                  <div key={photo}><Image src={`/media/about-company/${photo}.avif`} alt="" fill sizes="(max-width: 899px) 44vw, 26vw" /></div>
                ))}
              </div>
            </div>

            <div className={styles.principles}>
              <Reveal className={`${styles.principle} ${styles.mission}`}>
                <Target size={42} strokeWidth={1.3} aria-hidden="true" />
                <div><p className={styles.principleLabel}>Our purpose</p><h3>Our Mission</h3><p>{aboutPrinciples.mission}</p></div>
                <span className={styles.principleArt} aria-hidden="true"><Image src="/media/hero-mountain-residence.avif" alt="" fill sizes="40vw" /></span>
              </Reveal>
              <Reveal delay={0.1} className={`${styles.principle} ${styles.vision}`}>
                <Eye size={42} strokeWidth={1.3} aria-hidden="true" />
                <div><p className={styles.principleLabel}>Our perspective</p><h3>Our Vision</h3><p>{aboutPrinciples.vision}</p></div>
                <span className={styles.principleArt} aria-hidden="true"><Image src="/media/rahat-heights-ii-detail.webp" alt="" fill sizes="40vw" /></span>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={styles.leadership} id="leadership" aria-labelledby="leadership-title">
          <div className={styles.container}>
            <p className={styles.kicker}>Meet our leadership</p>
            <h2 className={styles.sectionTitle} id="leadership-title">The people behind <em>Rahat Associates.</em></h2>
            <div className={styles.leaderGrid}>
              {leaders.map((leader) => (
                <article className={styles.leaderCard} key={leader.photo}>
                  <div className={styles.leaderPortrait}><Image src={`/media/about-company/${leader.photo}.avif`} alt={leader.name} fill sizes="(max-width: 599px) 210px, 220px" /></div>
                  <div className={styles.leaderCopy}>
                    <h3>{leader.name}</h3>
                    <p className={styles.leaderRole}>{leader.role}</p>
                    {leader.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.journey} id="journey" aria-labelledby="journey-title">
          <div className={styles.container}>
            <p className={styles.kicker}>Our journey</p>
            <h2 className={styles.sectionTitle} id="journey-title">Projects That Define <em>Our Growth.</em></h2>
            <dl className={styles.milestones}>
              {journeyStats.map(({ label, value, icon: Icon }) => (
                <div key={label}>
                  <dt><Icon className={styles.journeyIcon} aria-hidden="true" />{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.journeyProjects}>
              {journeyProjects.map(({ title, projects, icon: Icon }) => (
                <div className={styles.journeyGroup} key={title}>
                  <h3><Icon aria-hidden="true" />{title}</h3>
                  <ul>
                    {projects.map((project) => <li key={project}><Check size={16} aria-hidden="true" />{project}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.expertise} id="expertise" aria-labelledby="expertise-title">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <Reveal><p className={styles.kicker}>Our expertise</p><h2 className={styles.sectionTitle} id="expertise-title">Real estate.<br /><em>A considered approach.</em></h2></Reveal>
              <Reveal delay={0.08} className={styles.headAside}><p>From a place to call home to a space for your next business chapter, discover what we bring together.</p><Link className="text-link" href="/#services">Explore our services <ArrowUpRight size={17} /></Link></Reveal>
            </div>
            <div className={styles.expertiseGrid}>
              {expertise.map((service, index) => {
                const Icon = expertiseIcons[service.icon];
                return <Reveal key={service.id} delay={index % 2 * 0.08}>
                  <Link className={styles.expertiseItem} href={`/#service-${service.id}`}>
                    <span className={styles.expertiseIcon}><Icon size={30} strokeWidth={1.4} aria-hidden="true" /></span>
                    <div><h3>{service.title}</h3><p>{service.copy}</p></div>
                    <ArrowUpRight className={styles.expertiseArrow} size={21} strokeWidth={1.4} aria-hidden="true" />
                  </Link>
                </Reveal>;
              })}
            </div>
          </div>
        </section>

        <section className={styles.developments} id="projects" aria-labelledby="developments-title">
          <div className={styles.developmentsBackdrop} aria-hidden="true"><Image src="/media/services-islamabad-horizon.avif" alt="" fill sizes="100vw" /></div>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <Reveal><p className={styles.kicker}>The Rahat portfolio</p><h2 className={styles.sectionTitle} id="developments-title">Distinct addresses.<br /><em>A shared vision.</em></h2></Reveal>
              <Reveal className={styles.headAside}><p>Three developments. Their own character.<br />One outlook on living and business.</p><Link className={styles.outlinePill} href="/#projects">Explore all projects <ArrowUpRight size={17} /></Link></Reveal>
            </div>
            <div className={styles.projectGrid}>
              {aboutProjects.map((project, index) => <Reveal key={project.id} delay={index * 0.08} className={styles.project}>
                <article aria-labelledby={`about-${project.id}`}>
                  <ProjectButton project={project} label={`View ${project.name}`} className={styles.projectImage}>
                    <Image src={project.image} alt={`${project.name} architectural render, ${project.location}`} fill sizes="(max-width: 599px) 90vw, (max-width: 899px) 44vw, 29vw" quality={90} style={{ objectPosition: project.focus }} />
                    <span className={styles.projectType}>{project.category}</span>
                    <span className={styles.projectOpen}><ArrowUpRight size={23} strokeWidth={1.3} /></span>
                  </ProjectButton>
                  <div className={styles.projectCopy}><p className={styles.projectLocation}><MapPin size={13} aria-hidden="true" />{project.location}</p><h3 id={`about-${project.id}`}>{project.name}</h3><p>{project.description}</p><a href={project.brochure} target="_blank" rel="noopener noreferrer">Explore project brochure <ArrowUpRight size={16} /><span className="sr-only">, {project.name} (PDF)</span></a></div>
                </article>
              </Reveal>)}
            </div>
            <p className={styles.renderNote}>Architectural renders from the project brochures. Explore each development for details.</p>
          </div>
        </section>

        <section className={styles.companyMoments} id="company-moments" aria-labelledby="company-moments-title">
          <div className={styles.container}>
            <p className={styles.kicker}>Company moments</p>
            <h2 className={styles.sectionTitle} id="company-moments-title">Our people, projects and <em>community.</em></h2>
            <div className={styles.momentsGrid}>
              {companyPhotos.map(([photo, label]) => (
                <figure className={styles.momentPhoto} key={photo}>
                  <Image src={`/media/about-company/${photo}.avif`} alt="" fill sizes="(max-width: 599px) 88vw, (max-width: 899px) 44vw, 29vw" />
                  <figcaption>{label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.approach} id="approach" aria-labelledby="approach-title">
          <svg className={styles.approachBlueprint} viewBox="0 0 1440 570" fill="none" aria-hidden="true"><g stroke="#92c5fc" strokeWidth=".7"><path d="M0 570V310l65 32v228M0 332l65 32M0 350l65 32M0 370l65 32M0 390l65 32M0 410l65 32M0 430l65 32M15 317v253M30 325v245M45 332v238M1390 570V380l50-20M1390 400l50-20M1390 420l50-20M1390 440l50-20M1390 460l50-20M1405 374v196M1420 368v202M1435 363v207M980 570v-35h68v35m8 0v-49h38v49m10 0v-64h24v64m10 0v-30h48v30m10 0v-42h50v42m10 0v-28h65v28M0 548h1440" /></g></svg>
          <div className={styles.container}>
            <div className={styles.approachTop}>
              <div className={styles.approachEditorial}>
                <Reveal><p className={styles.kicker}>Our approach</p></Reveal>
                <Reveal variant="mask"><h2 className={styles.sectionTitle} id="approach-title">From a conversation<br />to <em>new possibilities.</em></h2></Reveal>
                <Reveal delay={0.08}><p className={styles.approachIntro}>We follow a clear and thoughtful approach to ensure every development is planned, delivered and supported with care.</p></Reveal>
              </div>
              <Reveal variant="mask" className={styles.approachVisual}>
                <Image src="/media/about-approach-architecture.webp" alt="Illustrative contemporary residential architecture with glass balconies" fill sizes="(max-width: 899px) 88vw, 53vw" quality={90} />
                <div className={styles.approachBadge}><span><Leaf size={27} strokeWidth={1.5} aria-hidden="true" /></span><p>Thoughtful spaces<br />for stronger communities.</p></div>
              </Reveal>
            </div>
            <div className={styles.approachTimeline}>
              <svg className={styles.approachWave} viewBox="0 0 1200 70" preserveAspectRatio="none" fill="none" aria-hidden="true"><defs><linearGradient id="approach-wave"><stop stopColor="#83b7ff"/><stop offset=".33" stopColor="#bddcc9"/><stop offset=".7" stopColor="#83b7ff"/><stop offset="1" stopColor="#b5d6ae"/></linearGradient></defs><path d="M75 30C170-12 210 85 375 30S530 85 675 30S830 85 975 30S1100 40 1175 30" stroke="url(#approach-wave)" strokeWidth="1.2" /></svg>
              {approach.map((step, index) => <Reveal key={step.title} delay={index * 0.08} className={styles.approachStep}>
                <div className={styles.approachIcon}><step.icon size={28} strokeWidth={1.5} aria-hidden="true" /></div>
                {index < approach.length - 1 && <span className={styles.approachDirection} aria-hidden="true"><ArrowRight size={21} /></span>}
                <h3>{step.title}</h3><p className={styles.approachSubtitle}>{step.subtitle}</p><p className={styles.approachStepCopy}>{step.copy}</p><span className={styles.approachUnderline} aria-hidden="true" />
              </Reveal>)}
            </div>
          </div>
        </section>
        <BeforeYouInvest />
        <OfficeLocationSection />
      </main>
      <Footer internalPage />
      <FloatingContact />
    </div>
  );
}
