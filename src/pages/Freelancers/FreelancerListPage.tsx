import { Link } from "react-router-dom";
import "./FreelancerListPage.css";

const freelancers = [
  {
    id: "ava-kim",
    name: "Ava Kim",
    title: "UI/UX Designer & Brand Specialist",
    rating: 4.9,
    reviews: 230,
    location: "🇸🇬 Singapore",
    skills: ["Product Design", "Brand Systems", "Design Sprints"],
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
  },
  {
    id: "michael-chen",
    name: "Michael Chen",
    title: "Full Stack Developer",
    rating: 5.0,
    reviews: 180,
    location: "🇺🇸 San Francisco",
    skills: ["Next.js", "Node.js", "AWS"],
    avatar: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?auto=format&fit=crop&w=256&q=80",
  },
  {
    id: "emma-rodriguez",
    name: "Emma Rodriguez",
    title: "Content Strategist",
    rating: 4.8,
    reviews: 156,
    location: "🇨🇦 Toronto",
    skills: ["Content Marketing", "SEO", "Copywriting"],
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
  },
  {
    id: "david-kim",
    name: "David Kim",
    title: "Motion Designer",
    rating: 4.9,
    reviews: 112,
    location: "🇰🇷 Seoul",
    skills: ["After Effects", "3D Animation", "Storyboarding"],
    avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=256&q=80",
  },
  {
    id: "sofia-rossi",
    name: "Sofia Rossi",
    title: "Translator & Localisation Expert",
    rating: 5.0,
    reviews: 140,
    location: "🇮🇹 Milan",
    skills: ["EN↔IT", "Product Localisation", "Technical Docs"],
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
  },
  {
    id: "diego-martinez",
    name: "Diego Martinez",
    title: "Brand Strategist",
    rating: 4.9,
    reviews: 124,
    location: "🇪🇸 Madrid",
    skills: ["Brand Positioning", "Naming", "Pitch Decks"],
    avatar: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?auto=format&fit=crop&w=256&q=80",
  },
];

export const FreelancerListPage = () => {
  return (
    <div className="freelancer-list-page">
      <section className="freelancer-list-hero">
        <div className="container">
          <span className="freelancer-list-pill">Featured talent</span>
          <h1>The freelancers global teams hire again and again</h1>
          <p>
            Explore vetted specialists across product, marketing, engineering, and localisation. Each expert is rated highly by international clients.
          </p>
        </div>
      </section>

      <section className="freelancer-list-grid">
        <div className="container">
          <div className="freelancer-grid">
            {freelancers.map((freelancer) => (
              <article key={freelancer.id} className="freelancer-card">
                <div className="freelancer-card__avatar">
                  <img src={freelancer.avatar} alt={freelancer.name} loading="lazy" />
                </div>
                <div className="freelancer-card__body">
                  <div className="freelancer-card__header">
                    <div>
                      <h2>{freelancer.name}</h2>
                      <p>{freelancer.title}</p>
                    </div>
                    <div className="freelancer-card__rating" aria-label={`Rated ${freelancer.rating} out of 5`}>
                      ★ {freelancer.rating.toFixed(1)} <span>({freelancer.reviews})</span>
                    </div>
                  </div>
                  <div className="freelancer-card__meta">
                    <span>{freelancer.location}</span>
                  </div>
                  <div className="freelancer-card__skills">
                    {freelancer.skills.map((skill) => (
                      <span key={`${freelancer.id}-${skill}`}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="freelancer-card__actions">
                  <Link to={`/freelancer/${freelancer.id}`} className="freelancer-card__cta" aria-label={`View ${freelancer.name}'s profile`}>
                    View profile
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
