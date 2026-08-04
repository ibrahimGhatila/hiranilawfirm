import { useState } from 'react'
import { FiPlus, FiMinus } from 'react-icons/fi'
import SEO from '../components/common/SEO.jsx'
import PageHero from '../components/common/PageHero.jsx'
import ContactCTA from '../components/home/ContactCTA.jsx'
import data from '../data/site.json'

const { faqPage } = data

function AccordionItem({ item, open, onToggle }) {
  return (
    <div className={'hl-faq-item' + (open ? ' open' : '')}>
      <button className="hl-faq-q" onClick={onToggle} aria-expanded={open}>
        <span>{item.q}</span>
        {open ? <FiMinus /> : <FiPlus />}
      </button>
      {open && <div className="hl-faq-a">{item.a}</div>}
    </div>
  )
}

export default function FAQ() {
  // Track open item by a unique "categoryId-index" key.
  const [openKey, setOpenKey] = useState(null)

  const allCategories = faqPage.groups.flatMap((g) => g.categories)

  // FAQPage structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allCategories.flatMap((cat) =>
      cat.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      }))
    ),
  }

  return (
    <>
      <SEO
        title={faqPage.seo.title}
        description={faqPage.seo.description}
        path="/faqs"
        jsonLd={jsonLd}
      />
      <PageHero
        title={faqPage.hero.title}
        description={faqPage.hero.description}
        crumbs={[{ label: 'FAQs', to: '/faqs' }]}
      />

      <section className="hl-section">
        <div className="hl-container">
          <div className="row g-5">
            {/* Sidebar nav */}
            <div className="col-lg-3">
              <div className="hl-faq-nav">
                {faqPage.groups.map((group) => (
                  <div key={group.label} className="mb-3">
                    <div className="hl-faq-nav-group">{group.label}</div>
                    {group.categories.map((cat) => (
                      <a key={cat.id} href={`#${cat.id}`} className="hl-faq-nav-link">
                        {cat.title}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Accordions */}
            <div className="col-lg-9">
              {allCategories.map((cat) => (
                <div key={cat.id} id={cat.id} className="hl-faq-category">
                  <h2 className="hl-h3 hl-underline-title mb-3">{cat.title}</h2>
                  {cat.items.map((item, i) => {
                    const key = `${cat.id}-${i}`
                    return (
                      <AccordionItem
                        key={key}
                        item={item}
                        open={openKey === key}
                        onToggle={() => setOpenKey(openKey === key ? null : key)}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
