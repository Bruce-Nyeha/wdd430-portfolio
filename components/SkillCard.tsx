interface SkillCardProps {
    category: string;
    skills: string[];
    proficiencyLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export default function SkillCard({category, skills, proficiencyLevel}: SkillCardProps) {
    return (
        <article className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-900">{category}</h3>
           <span>{proficiencyLevel}</span>
           <ul>
            {skills.map((skill) => (
                <li key={skill}>{skill} </li>
            ))}
           </ul>
        </article>
    );
}