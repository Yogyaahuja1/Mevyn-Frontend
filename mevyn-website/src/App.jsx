import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Diaries from './pages/Diaries';
import CampusVoice from './pages/CampusVoice';
import Gallery from './pages/Gallery';
import Timeline from './pages/Timeline';
import About from './pages/About';
import Queries from './pages/Queries';
import Videos from './pages/Videos';
import ArticleDetail from './pages/ArticleDetail';

function NotFound() {
	return (
		<div className="page-enter" style={{ paddingTop: 'var(--nav-h)' }}>
			<section className="section">
				<div className="container" style={{ textAlign: 'center' }}>
					<span className="section-label">404</span>
					<h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: '16px 0' }}>
						Page not found
					</h1>
					<p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>
						This page does not exist yet. Head back home to continue exploring.
					</p>
					<a className="btn-gold" href="/">Go Home</a>
				</div>
			</section>
		</div>
	);
}

export default function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/events" element={<Events />} />
				<Route path="/diaries" element={<Diaries />} />
				<Route path="/voice" element={<CampusVoice />} />
				<Route path="/gallery" element={<Gallery />} />
				<Route path="/timeline" element={<Timeline />} />
				<Route path="/about" element={<About />} />
				<Route path="/queries" element={<Queries />} />
				<Route path="/videos" element={<Videos />} />
				<Route path="/article/:id" element={<ArticleDetail />} />
				<Route path="/campus-voice" element={<Navigate to="/voice" replace />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</>
	);
}
