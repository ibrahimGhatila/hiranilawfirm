import data from '../../data/site.json'

const { stats } = data

export default function StatsBar() {
  return (
    <section className="hl-stats">
      <div className="hl-container">
        <div className="row g-0">
          {stats.map((stat) => (
            <div className="col-6 col-lg-3" key={stat.value}>
              <div className="hl-stat">
                <div className="hl-stat-value">{stat.value}</div>
                <div className="hl-stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
