// app/about/page.tsx
import SkillCard from '@/components/SkillCard';

const technicalSkills = [
  {
    category: 'Backend Core Engines',
    skills: ['Python FastAPI', 'Node.js Express', 'PostgreSQL Query Pooling'],
    proficiencyLevel: 'Advanced' as const
  },
  {
    category: 'Modern Web Layers',
    skills: ['React.js Components', 'Next.js App Routing', 'Tailwind CSS Layouts'],
    proficiencyLevel: 'Intermediate' as const
  }
];

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          I am a full-stack software engineer focusing on building highly secure, 
          performant web applications. This background page demonstrates file-based 
          routing composition and custom TypeScript component rendering matrices.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Competencies</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {technicalSkills.map((skillGroup) => (
            <SkillCard key={skillGroup.category} {...skillGroup} />
          ))}
        </div>
      </section>
    </main>
  );
}
