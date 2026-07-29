import { Brain, FileSearch, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "Leverage AI to evaluate your resume and receive personalised improvement suggestions.",
  },
  {
    icon: FileSearch,
    title: "ATS Optimisation",
    description:
      "Check how well your resume matches Applicant Tracking Systems used by recruiters.",
  },
  {
    icon: TrendingUp,
    title: "Actionable Insights",
    description:
      "Identify missing keywords, improve formatting, and increase your interview chances.",
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <p className="text-violet-400 font-semibold uppercase tracking-widest">
          Features
        </p>

        <h2 className="mt-4 text-4xl font-bold">Why Choose ResuIQ?</h2>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          Everything you need to analyse, optimise and improve your resume
          before applying for your dream job.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/40 hover:bg-white/10"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/20">
                <Icon className="text-violet-400" size={28} />
              </div>

              <h3 className="mt-6 text-2xl font-semibold">{feature.title}</h3>

              <p className="mt-4 text-gray-400 leading-7">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
