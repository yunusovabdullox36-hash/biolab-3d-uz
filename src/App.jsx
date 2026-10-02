import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, Atom, BookOpen, Bone, Brain, Check, ChevronRight, CircleHelp, Dna, FlaskConical, HeartPulse, Lightbulb, Menu, MousePointer2, Rotate3D, Sparkles, Trophy, X } from 'lucide-react'
import AnatomyScene from './AnatomyScene'
import { bones, organs, quiz } from './data'

const navItems = [
  { to: '/', label: 'Bosh sahifa' },
  { to: '/laboratoriya', label: '3D laboratoriya' },
  { to: '/test', label: 'Test' },
  { to: '/faktlar', label: 'Faktlar' },
]

function Logo() {
  return <Link to="/" className="logo" aria-label="BioLab bosh sahifa"><span><Dna size={23} /></span>Bio<b>Lab</b></Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location.pathname])
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Logo />
        <nav className={open ? 'nav-links open' : 'nav-links'}>
          {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'}>{item.label}</NavLink>)}
        </nav>
        <Link to="/test" className="nav-cta">Bilimingizni sinang <ArrowRight size={16} /></Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Menyuni ochish">{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  )
}

function PageTransition({ children }) {
  const location = useLocation()
  return <AnimatePresence mode="wait"><motion.main key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.28 }}>{children}</motion.main></AnimatePresence>
}

function Home() {
  return (
    <>
      <section className="hero section-shell">
        <div className="hero-copy">
          <motion.div className="pill" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}><Sparkles size={15} /> Interaktiv biologiya platformasi</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>Tanangiz ichida<br /><span>butun bir olam bor.</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>Organlar va skeletni 3D muhitda aylantiring, har bir qismni yaqindan ko‘ring va bilimlaringizni testda sinang.</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
            <Link to="/laboratoriya" className="primary-button"><Rotate3D size={19} /> 3D modelni ochish</Link>
            <Link to="/test" className="text-link">Testni boshlash <ChevronRight size={18} /></Link>
          </motion.div>
          <div className="hero-stats">
            <div><strong>10+</strong><span>interaktiv qism</span></div>
            <div><strong>360°</strong><span>erkin ko‘rish</span></div>
            <div><strong>10</strong><span>test savoli</span></div>
          </div>
        </div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
          <div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" />
          <AnatomyScene compact />
          <div className="floating-label label-heart"><HeartPulse size={17} /> Yurak <span>72 bpm</span></div>
          <div className="floating-label label-brain"><Brain size={17} /> Miya <span>86 mlrd neyron</span></div>
          <div className="drag-hint"><MousePointer2 size={16} /> Aylantirish uchun torting</div>
        </motion.div>
      </section>

      <section className="system-section section-shell">
        <div className="section-heading"><div><span className="kicker">O‘rganish yo‘li</span><h2>Ko‘ring. Tushuning. Sinang.</h2></div><p>Murakkab biologiyani sodda, vizual va esda qoladigan tajribaga aylantirdik.</p></div>
        <div className="feature-grid">
          <Link to="/laboratoriya" className="feature-card teal"><span className="feature-number">01</span><div className="icon-box"><Rotate3D /></div><h3>3D anatomiya</h3><p>Modelni 360° aylantiring, organ ustiga boring va batafsil ko‘ring.</p><span className="card-link">Laboratoriyani ochish <ArrowRight size={16} /></span></Link>
          <Link to="/test" className="feature-card purple"><span className="feature-number">02</span><div className="icon-box"><CircleHelp /></div><h3>Interaktiv test</h3><p>10 ta savolda bilimingizni tekshiring va darhol natija oling.</p><span className="card-link">Testni boshlash <ArrowRight size={16} /></span></Link>
          <Link to="/faktlar" className="feature-card coral"><span className="feature-number">03</span><div className="icon-box"><Lightbulb /></div><h3>Qiziqarli faktlar</h3><p>Inson tanasi haqidagi kutilmagan va ilmiy faktlarni kashf eting.</p><span className="card-link">Faktlarni ko‘rish <ArrowRight size={16} /></span></Link>
        </div>
      </section>

      <section className="cta-section section-shell">
        <div><span className="kicker">Tajribaga tayyormisiz?</span><h2>Biologiyani yodlamang.<br />Uni ko‘rib tushuning.</h2></div>
        <Link to="/laboratoriya" className="light-button">Boshlash <ArrowRight size={18} /></Link>
        <Dna className="cta-dna" />
      </section>
    </>
  )
}

function Lab() {
  const [mode, setMode] = useState('organs')
  const [selectedId, setSelectedId] = useState(null)
  const data = mode === 'organs' ? organs : bones
  const selected = selectedId ? data[selectedId] : null
  const switchMode = (next) => { setMode(next); setSelectedId(null) }
  return (
    <section className="lab-page">
      <div className="lab-top section-shell">
        <div><span className="kicker">Virtual laboratoriya</span><h1>Inson anatomiyasi — 3D</h1><p>Modelni aylantiring. Qism ustiga borsangiz qisqa, bossangiz to‘liq ma’lumot ochiladi.</p></div>
        <div className="mode-switch" role="tablist">
          <button className={mode === 'organs' ? 'active' : ''} onClick={() => switchMode('organs')}><HeartPulse size={18} /> Ichki organlar</button>
          <button className={mode === 'skeleton' ? 'active' : ''} onClick={() => switchMode('skeleton')}><Bone size={18} /> Skelet</button>
        </div>
      </div>
      <div className="lab-workspace section-shell">
        <aside className="parts-panel">
          <div className="panel-title"><span>Qismlar</span><small>{Object.keys(data).length} ta</small></div>
          {Object.entries(data).map(([id, item]) => (
            <button key={id} className={selectedId === id ? 'part-row active' : 'part-row'} onClick={() => setSelectedId(id)}>
              <span className="part-dot" style={{ '--part-color': item.accent }} />
              <span><b>{item.name}</b><small>{item.eyebrow}</small></span><ChevronRight size={16} />
            </button>
          ))}
          <div className="control-tip"><Rotate3D size={18} /><span><b>Boshqaruv</b>Modelni sichqoncha bilan aylantiring, g‘ildirak bilan yaqinlashtiring.</span></div>
        </aside>

        <div className="model-stage">
          <div className="grid-floor" />
          <AnatomyScene mode={mode} selectedId={selectedId} onSelect={setSelectedId} />
          <div className="stage-badge"><span className="live-dot" /> Interaktiv 3D</div>
          {!selectedId && <div className="stage-instruction"><MousePointer2 size={18} /> Qismni tanlang</div>}
        </div>

        <aside className={selected ? 'detail-panel visible' : 'detail-panel'}>
          {selected ? (
            <AnimatePresence mode="wait">
              <motion.div key={selectedId} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <button className="close-detail" onClick={() => setSelectedId(null)} aria-label="Yopish"><X size={19} /></button>
                <span className="detail-eyebrow" style={{ color: selected.accent }}>{selected.eyebrow}</span>
                <h2>{selected.name}</h2>
                <div className="detail-rule" style={{ background: selected.accent }} />
                <p>{selected.description}</p>
                <h3>Bilarmidingiz?</h3>
                <ul>{selected.facts.map((fact) => <li key={fact}><Check size={15} style={{ color: selected.accent }} />{fact}</li>)}</ul>
                <Link to="/test" className="detail-test">Shu mavzuda test <ArrowRight size={16} /></Link>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="empty-detail"><div><Atom /></div><h3>Biror qismni tanlang</h3><p>Batafsil ma’lumot shu yerda paydo bo‘ladi.</p></div>
          )}
        </aside>
      </div>
    </section>
  )
}

function Quiz() {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [choice, setChoice] = useState(null)
  const [finished, setFinished] = useState(false)
  const current = quiz[index]
  const score = answers.filter((answer, i) => answer === quiz[i].answer).length

  const next = () => {
    if (choice === null) return
    const updated = [...answers, choice]
    setAnswers(updated)
    if (index === quiz.length - 1) setFinished(true)
    else { setIndex(index + 1); setChoice(null) }
  }
  const reset = () => { setIndex(0); setAnswers([]); setChoice(null); setFinished(false) }

  return (
    <section className="quiz-page section-shell">
      <div className="quiz-intro"><span className="kicker">Bilim sinovi</span><h1>Anatomiya testi</h1><p>10 ta savol. Har bir savol uchun bitta to‘g‘ri javobni tanlang.</p></div>
      {!finished ? (
        <div className="quiz-card">
          <div className="quiz-progress"><div><span>Savol {index + 1}</span><b>{index + 1} / {quiz.length}</b></div><div className="progress-track"><motion.span animate={{ width: `${((index + 1) / quiz.length) * 100}%` }} /></div></div>
          <AnimatePresence mode="wait">
            <motion.div key={index} initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -25 }}>
              <div className="question-icon"><FlaskConical /></div><h2>{current.q}</h2>
              <div className="options-grid">{current.options.map((option, i) => <button key={option} className={choice === i ? 'selected' : ''} onClick={() => setChoice(i)}><span>{String.fromCharCode(65 + i)}</span>{option}<Check size={18} /></button>)}</div>
            </motion.div>
          </AnimatePresence>
          <div className="quiz-footer"><span>{choice === null ? 'Javobni tanlang' : 'Javob tanlandi'}</span><button onClick={next} disabled={choice === null}>{index === quiz.length - 1 ? 'Natijani ko‘rish' : 'Keyingi savol'} <ArrowRight size={17} /></button></div>
        </div>
      ) : (
        <motion.div className="result-card" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="trophy"><Trophy /></div><span className="kicker">Test tugadi</span><h2>{score >= 8 ? 'Ajoyib natija!' : score >= 5 ? 'Yaxshi harakat!' : 'Yana bir bor urinib ko‘ring!'}</h2>
          <div className="score-ring" style={{ '--score': `${score * 36}deg` }}><div><strong>{score}</strong><span>/ 10</span></div></div>
          <p>{score >= 8 ? 'Inson anatomiyasini juda yaxshi bilasiz.' : '3D laboratoriyani yana ko‘rib, natijangizni yaxshilang.'}</p>
          <div className="result-actions"><button onClick={reset}>Qayta topshirish</button><Link to="/laboratoriya">Laboratoriyaga qaytish</Link></div>
        </motion.div>
      )}
    </section>
  )
}

const factCards = [
  { icon: HeartPulse, stat: '100 000', unit: 'marta', title: 'Yurak urishi', text: 'Yuragingiz bir sutkada o‘rtacha shuncha marta uradi.', color: 'red' },
  { icon: Brain, stat: '86', unit: 'milliard', title: 'Neyronlar', text: 'Miyada taxminan shuncha asab hujayrasi mavjud.', color: 'purple' },
  { icon: Dna, stat: '2', unit: 'metr', title: 'DNK uzunligi', text: 'Bitta hujayradagi DNK yoyilsa, taxminan shuncha bo‘ladi.', color: 'teal' },
  { icon: Bone, stat: '206', unit: 'ta', title: 'Suyaklar', text: 'Voyaga yetgan odam skeleti shuncha suyakdan tashkil topgan.', color: 'blue' },
  { icon: Atom, stat: '37', unit: 'trillion', title: 'Hujayralar', text: 'Inson tanasidagi hujayralarning taxminiy soni.', color: 'orange' },
  { icon: BookOpen, stat: '5+', unit: 'litr', title: 'Qon hajmi', text: 'Katta yoshli odam tanasida o‘rtacha shuncha qon mavjud.', color: 'pink' },
]

function Facts() {
  return (
    <section className="facts-page section-shell">
      <div className="facts-hero"><div><span className="kicker">Bilarmidingiz?</span><h1>Tanangiz — ajoyib mashina.</h1><p>Har soniyada ichingizda minglab murakkab jarayonlar sodir bo‘ladi.</p></div><div className="facts-orb"><Dna /></div></div>
      <div className="facts-grid">{factCards.map((fact, i) => { const Icon = fact.icon; return <motion.article key={fact.title} className={`fact-card ${fact.color}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}><div className="fact-icon"><Icon /></div><div className="fact-stat"><strong>{fact.stat}</strong><span>{fact.unit}</span></div><h2>{fact.title}</h2><p>{fact.text}</p></motion.article> })}</div>
      <div className="fact-cta"><div><h2>Endi buni 3D modelda ko‘ring</h2><p>Organlar va skelet qismlarini o‘zingiz boshqaring.</p></div><Link to="/laboratoriya" className="primary-button">3D laboratoriya <ArrowRight size={17} /></Link></div>
    </section>
  )
}

function Footer() {
  return <footer><div className="section-shell"><Logo /><p>Biologiyani ko‘rib, sinab va tushunib o‘rganing.</p><span>© 2026 BioLab. Ta’lim loyihasi.</span></div></footer>
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="app-shell">
      <ScrollToTop /><Header />
      <PageTransition><Routes><Route path="/" element={<Home />} /><Route path="/laboratoriya" element={<Lab />} /><Route path="/test" element={<Quiz />} /><Route path="/faktlar" element={<Facts />} /><Route path="*" element={<Home />} /></Routes></PageTransition>
      <Footer />
    </div>
  )
}
