import React from "react";
import styles from "./roadmap.module.css";
import "material-symbols/outlined.css";

// Progress Component
type ProgressProps = {
  value: number;
  className?: string;
};
export const Progress = ({ value, className = "" }: ProgressProps) => {
  return (
    <div className={`${styles["progress-bar-container"]} ${className}`}>
      <div className={styles["progress-bar-fill"]} style={{ width: `${value}%` }}></div>
    </div>
  );
};

// Card Component
type CardProps = {
  children: React.JSX.Element | React.JSX.Element[];
  className?: string;
};
export const Card = ({ children, className = "" }: CardProps) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

// CardContent Component
type CardContentProps = {
  children: React.JSX.Element | React.JSX.Element[];
  className?: string;
};
export const CardContent = ({ children, className = "" }: CardContentProps) => {
  return <div className={`${styles["card-content"]} ${className}`}>{children}</div>;
};

const milestones = [
  {
    title: "Generate Challenges Using AI",
    description: "Use ChatGPT API to generate stories and questions.",
    completed: true,
  },
  {
    title: "Track User Stats",
    description: "Persistant results tracking linked to your account.",
    completed: true,
  },
  {
    title: "Styling and Themes",
    description: "Implement consistent styling and support for light/dark themes.",
    completed: false,
  },
  {
    title: "Challenge Difficulty",
    description: "Add difficulty levels to categorize challenges.",
    completed: false,
  },
  {
    title: "Store Highest Rated Challenges",
    description: "Rate challenges and persist a list of top-rated challenges.",
    completed: false,
  },
  {
    title: "More Games with Your Friends",
    description: "More unique reading challenges and multiplayer!",
    completed: false,
  },
  {
    title: "Enhanced Pro Version with Advanced AI",
    description: "Create more comprehensive content with deeper, more thought-provoking questions.",
    completed: false,
  },
];

const completionPercentage =
  milestones.reduce((acc, cur) => {
    if (cur.completed) {
      acc = acc + 1 / milestones.length;
    }
    return acc;
  }, 0) * 100;

export default function RoadmapPage() {
  return (
    <div className={styles["roadmap-container"]}>
      <h1 className={styles["roadmap-title"]}>Project Roadmap</h1>
      <Progress value={completionPercentage} className={styles["roadmap-progress"]} />

      <div className={styles["milestones-grid"]}>
        {milestones.map((milestone, index) => (
          <Card key={index} className={styles["milestone-card"]}>
            <CardContent>
              <h2 className={styles["milestone-title"]}>{milestone.title}</h2>
              <p className={styles["milestone-description"]}>{milestone.description}</p>
            </CardContent>
            {milestone.completed ? (
              <span className="material-symbols-outlined" style={{ color: "white", backgroundColor: "green", borderRadius: "50%", padding: "3px" }}>
                check
              </span>
            ) : (
              <></>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
