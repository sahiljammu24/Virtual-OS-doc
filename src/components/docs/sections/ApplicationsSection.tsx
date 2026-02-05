import { SectionHeading } from "../SectionHeading";
import { ImageCard } from "../ImageCard";
import homeApp from "@/assets/home_app.png";
import paintApp from "@/assets/paint_app.png";
import matrixApp from "@/assets/matrix_calc_app.png";
import graphApp from "@/assets/graph_app.png";
import quizApp from "@/assets/quiz_app.png";
import calcApp from "@/assets/calculator_app.png";

const apps = [
  {
    name: "Home Dashboard",
    description: "Central hub for all apps, featuring real-time CPU stats and hand status.",
    image: homeApp,
  },
  {
    name: "Virtual Paint",
    description: "Air-drawing tool with color selection and save functionality.",
    image: paintApp,
  },
  {
    name: "Calculator",
    description: "Full-featured calculator with gesture-based number input.",
    image: calcApp,
  },
  {
    name: "Matrix Calculator",
    description: "Advanced matrix operations: Inverse, Determinant, and Rank.",
    image: matrixApp,
  },
  {
    name: "Graphing Calculator",
    description: "Real-time function plotting with gesture-based input.",
    image: graphApp,
  },
  {
    name: "Quiz Master",
    description: "Interactive educational tool with categorized questions.",
    image: quizApp,
  },
];

export function ApplicationsSection() {
  return (
    <section id="apps-gallery" className="py-16 scroll-mt-24">
      <SectionHeading
        title="Application Gallery"
        subtitle="A diverse ecosystem of apps, from productivity tools to arcade games"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app, index) => (
          <div
            key={app.name}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ImageCard
              src={app.image}
              alt={app.name}
              title={app.name}
              description={app.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
