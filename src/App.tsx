import { GuidesProvider } from './context/GuidesContext';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { GridOverlay } from './components/GridOverlay';
import { GuidesToggle } from './components/GuidesToggle';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Highlights } from './components/Highlights';
import { ReadingProgress } from './components/ReadingProgress';
import { Skills } from './components/Skills';

export function App() {
  return (
    <GuidesProvider>
      <ReadingProgress />
      <GridOverlay />
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <GuidesToggle />
    </GuidesProvider>
  );
}
