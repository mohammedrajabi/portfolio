import { useRef, useState, type KeyboardEvent } from "react";
import { skills } from "../../content/skills";
import { SkillCategoryCard } from "./SkillCategoryCard";
export function SkillsTabs() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function move(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (index + 1) % skills.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (index - 1 + skills.length) % skills.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = skills.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }
  return (
    <div className="skills-tabs">
      <div
        className="skills-tablist"
        role="tablist"
        aria-label="Skill categories"
      >
        {skills.map((category, index) => (
          <button
            key={category.id}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`skill-tab-${category.id}`}
            aria-controls={`skill-panel-${category.id}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => move(event, index)}
          >
            {category.name}
          </button>
        ))}
      </div>
      {skills.map((category, index) => (
        <div
          key={category.id}
          id={`skill-panel-${category.id}`}
          className="skills-panel"
          role="tabpanel"
          aria-labelledby={`skill-tab-${category.id}`}
          tabIndex={0}
          hidden={selected !== index}
        >
          <SkillCategoryCard category={category} index={index} />
        </div>
      ))}
    </div>
  );
}
