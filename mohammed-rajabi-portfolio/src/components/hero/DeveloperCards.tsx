import { motion, useReducedMotion } from "motion/react";
import { BookOpen, Code2, ShieldCheck, Sparkles } from "lucide-react";
import { developerCards } from "../../content/home";
import { BrutalistCard } from "../ui/BrutalistCard";
const icons = { development: Code2, security: ShieldCheck, learning: BookOpen };

export function DeveloperCards() {
  const reduced = useReducedMotion();
  return (
    <div className="developer-composition">
      <span className="composition-asterisk" aria-hidden="true">
        ✳
      </span>
      <div className="developer-cards">
        {developerCards.map((card, index) => {
          const Icon = icons[card.id];
          return (
            <motion.div
              key={card.id}
              className={`developer-card-wrap card-wrap-${card.id}`}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0 : 0.4,
                delay: reduced ? 0 : index * 0.09,
              }}
            >
              <BrutalistCard className={`developer-card card-${card.id}`}>
                <div className="developer-card-top">
                  <span className="card-index">0{index + 1}</span>
                  <Icon size={23} aria-hidden="true" />
                </div>
                {card.id === "development" && (
                  <div className="code-window" aria-hidden="true">
                    <div className="code-window-bar">
                      <span />
                      <span />
                      <span />
                      <span className="code-filename">developer.notes</span>
                    </div>
                    <div className="code-lines">
                      <span>
                        <b>const</b> mindset = {"{"}
                      </span>
                      <span>
                        &nbsp; curiosity: <b>true</b>,
                      </span>
                      <span>
                        &nbsp; purpose: <em>'build better'</em>
                      </span>
                      <span>{"}"};</span>
                    </div>
                  </div>
                )}
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <div className="card-note">
                  {card.note}
                  {card.id === "learning" && (
                    <Sparkles size={16} aria-hidden="true" />
                  )}
                </div>
              </BrutalistCard>
            </motion.div>
          );
        })}
      </div>
      <span className="composition-caption">
        <span />A mindset. Not just a skill set.
      </span>
    </div>
  );
}
