import TopBar from './TopBar.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ConsultationPopup from '../common/ConsultationPopup.jsx'

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar />
      <Header />
      <main className="flex-grow-1">{children}</main>
      <Footer />
      <ConsultationPopup />
    </div>
  )
}
