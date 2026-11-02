import { Code2, ShieldCheck, BookOpen } from "lucide-react";
import { developerCards } from "../../content/home";
const icons = { development: Code2, security: ShieldCheck, learning: BookOpen };
export function QuickFacts() {
  return (
    <ul className="quick-facts" aria-label="Areas of interest">
      {developerCards.map((fact) => {
        const Icon = icons[fact.id];
        return (
          <li key={fact.id}>
            <span className="fact-icon">
              <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <div>
              <h3>{fact.title}</h3>
              <p>{fact.description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
