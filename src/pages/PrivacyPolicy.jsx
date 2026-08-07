import SEO from '../components/common/SEO.jsx'
import PageHero from '../components/common/PageHero.jsx'
import { currentLang } from '../data/active.js'

const copy = {
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: August 7, 2026',
    seo: 'Learn how Hirani Law Firm PLLC collects, uses, protects, and shares information submitted through this website.',
    home: 'Home',
    sections: [
      ['Introduction', <p>Hirani Law Firm PLLC ("we," "our," or "us") operates hiranilawfirm.com. This Privacy Policy explains what information we collect, how we use it, and the choices available to you under applicable law, including the Texas Data Privacy and Security Act (TDPSA).</p>],
      ['Information We Collect', <><p>We collect information you provide directly when you submit a contact or consultation request, including your name, email address, phone number, and the type of legal help requested.</p><p>With your permission, Google Analytics may collect usage information such as your IP address, browser and device type, pages visited, referring page, and approximate interaction times. Analytics remains disabled unless you consent through our cookie controls.</p></>],
      ['How We Use Your Information', <><p>We use information to respond to consultation requests, communicate with you, operate and secure the website, understand website usage when analytics consent is granted, improve our services, and comply with legal obligations.</p><p>We do not sell personal information or use it for targeted advertising.</p></>],
      ['Contact Forms and Email Delivery', <p>Website consultation requests are processed through our secure server endpoint and delivered to designated Hirani Law Firm recipients using Resend, our email delivery provider. Form submissions include the information you enter and limited source information such as the page URL, page title, referrer, and submission time. Resend processes this information under its own privacy and data-processing terms.</p>],
      ['Cookies and Analytics', <><p>Essential browser storage remembers your language and privacy choices. It is necessary for the requested site preferences and cannot be disabled through our banner.</p><p>Google Analytics is optional. It may set cookies such as <code>_ga</code> for up to two years, but its script is not loaded until you grant analytics consent. You may accept, reject, or customize analytics from the consent banner and withdraw consent at any time through <strong>Cookie Settings</strong> in the footer.</p></>],
      ['Attorney-Client Relationship', <p>Submitting a website form or inquiry does not create an attorney-client relationship. Please do not send confidential or time-sensitive information until an attorney-client relationship has been formally established.</p>],
      ['Data Retention', <p>We retain personal information only as long as reasonably necessary for the purposes described in this policy, to respond to inquiries, maintain appropriate business records, and meet legal obligations. Consultation submissions may be retained in the firm’s email systems and deleted when no longer needed.</p>],
      ['Your Privacy Rights', <p>Subject to applicable law, you may request access to, correction of, or deletion of personal data we maintain about you. Texas residents may also exercise rights available under the TDPSA. We do not sell personal data. To submit a privacy request, email <a href="mailto:info@hiranilawfirm.com">info@hiranilawfirm.com</a>. We may need to verify your identity before completing a request.</p>],
      ['Third-Party Services', <ul><li>Google Analytics / Google tag — optional website analytics; see the <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a>.</li><li>Resend — contact-form email delivery; see the <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noreferrer">Resend Privacy Policy</a>.</li><li>Vercel — website hosting and serverless request processing; see the <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">Vercel Privacy Policy</a>.</li></ul>],
      ['Security', <p>We use reasonable administrative, technical, and organizational safeguards designed to protect personal information. However, no internet transmission or storage system can be guaranteed completely secure.</p>],
      ['Changes to This Policy', <p>We may update this Privacy Policy as our website, service providers, or legal obligations change. The revised version will be posted here with an updated date.</p>],
      ['Contact Us', <address>Hirani Law Firm PLLC<br />22316 Grand Corner Drive, Suite 130<br />Katy, TX 77494<br /><a href="tel:2816658188">281-665-8188</a><br /><a href="mailto:info@hiranilawfirm.com">info@hiranilawfirm.com</a></address>],
    ],
  },
  es: {
    title: 'Política de Privacidad',
    updated: 'Última actualización: 7 de agosto de 2026',
    seo: 'Conozca cómo Hirani Law Firm PLLC recopila, utiliza, protege y comparte la información enviada a través de este sitio web.',
    home: 'Inicio',
    sections: [
      ['Introducción', <p>Hirani Law Firm PLLC ("nosotros" o "nuestro") opera hiranilawfirm.com. Esta Política de Privacidad explica qué información recopilamos, cómo la utilizamos y las opciones disponibles conforme a la ley aplicable, incluida la Ley de Privacidad y Seguridad de Datos de Texas (TDPSA).</p>],
      ['Información que recopilamos', <><p>Recopilamos la información que usted proporciona al enviar una solicitud de contacto o consulta, incluidos su nombre, correo electrónico, teléfono y el tipo de ayuda legal solicitada.</p><p>Con su permiso, Google Analytics puede recopilar datos de uso como dirección IP, tipo de navegador y dispositivo, páginas visitadas, página de referencia y tiempos aproximados de interacción. Las analíticas permanecen desactivadas hasta que usted otorgue su consentimiento.</p></>],
      ['Cómo utilizamos su información', <><p>Utilizamos la información para responder consultas, comunicarnos con usted, operar y proteger el sitio, comprender su uso cuando existe consentimiento, mejorar nuestros servicios y cumplir obligaciones legales.</p><p>No vendemos información personal ni la utilizamos para publicidad dirigida.</p></>],
      ['Formularios y entrega de correo', <p>Las solicitudes de consulta se procesan mediante nuestro servidor seguro y se envían a destinatarios designados de Hirani Law Firm utilizando Resend. El envío incluye los datos ingresados y datos limitados de origen, como URL, título de la página, referencia y hora del envío. Resend procesa estos datos conforme a sus propios términos de privacidad y tratamiento.</p>],
      ['Cookies y analíticas', <><p>El almacenamiento esencial del navegador recuerda sus preferencias de idioma y privacidad. Es necesario para esas funciones y no puede desactivarse desde el aviso.</p><p>Google Analytics es opcional. Puede establecer cookies como <code>_ga</code> hasta por dos años, pero su script no se carga hasta que usted autoriza las analíticas. Puede aceptar, rechazar o personalizar su elección y retirar el consentimiento en cualquier momento mediante <strong>Configuración de cookies</strong> en el pie de página.</p></>],
      ['Relación abogado-cliente', <p>Enviar un formulario o consulta no crea una relación abogado-cliente. No envíe información confidencial o urgente hasta que dicha relación se haya establecido formalmente.</p>],
      ['Conservación de datos', <p>Conservamos la información solo durante el tiempo razonablemente necesario para los fines descritos, responder consultas, mantener registros comerciales y cumplir obligaciones legales. Las solicitudes pueden conservarse en los sistemas de correo del bufete y eliminarse cuando ya no sean necesarias.</p>],
      ['Sus derechos de privacidad', <p>Según la ley aplicable, puede solicitar acceso, corrección o eliminación de sus datos personales. Los residentes de Texas también pueden ejercer los derechos de la TDPSA. No vendemos datos personales. Para enviar una solicitud, escriba a <a href="mailto:info@hiranilawfirm.com">info@hiranilawfirm.com</a>. Podemos verificar su identidad antes de completarla.</p>],
      ['Servicios de terceros', <ul><li>Google Analytics / Google tag — analíticas opcionales; consulte la <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Política de Privacidad de Google</a>.</li><li>Resend — entrega de formularios por correo; consulte la <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noreferrer">Política de Privacidad de Resend</a>.</li><li>Vercel — alojamiento y procesamiento de solicitudes; consulte la <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">Política de Privacidad de Vercel</a>.</li></ul>],
      ['Seguridad', <p>Utilizamos medidas administrativas, técnicas y organizativas razonables para proteger la información. Sin embargo, ninguna transmisión o sistema de almacenamiento por Internet puede garantizar seguridad absoluta.</p>],
      ['Cambios a esta política', <p>Podemos actualizar esta política cuando cambien el sitio, nuestros proveedores o las obligaciones legales. La versión revisada se publicará aquí con una fecha actualizada.</p>],
      ['Contáctenos', <address>Hirani Law Firm PLLC<br />22316 Grand Corner Drive, Suite 130<br />Katy, TX 77494<br /><a href="tel:2816658188">281-665-8188</a><br /><a href="mailto:info@hiranilawfirm.com">info@hiranilawfirm.com</a></address>],
    ],
  },
}

export default function PrivacyPolicy() {
  const page = copy[currentLang]
  return <>
    <SEO title={page.title} description={page.seo} path="/privacy-policy" />
    <PageHero title={page.title} description={page.updated} crumbs={[{ label: page.title, to: '/privacy-policy' }]} />
    <section className="hl-section hl-legal-page">
      <div className="hl-container hl-legal-content">
        {page.sections.map(([heading, content]) => <section key={heading}><h2>{heading}</h2>{content}</section>)}
      </div>
    </section>
  </>
}
