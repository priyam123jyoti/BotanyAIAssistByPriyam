export interface Topic {
  name: string;
  icon: string;
}

export const SUBJECT_TOPICS: Record<string, Topic[]> = {
  botany: [
    { name: "Algae (Phycology)", icon: "🌊" },
    { name: "Angiosperms", icon: "🌸" },
    { name: "Bioinformatics", icon: "💻" },
    { name: "Biochemistry", icon: "🧪" },
    { name: "Bryophytes", icon: "🌱" },
    { name: "Economic Botany", icon: "💰" },
    { name: "Ecology & Evolution", icon: "🌎" },
    { name: "Ethnobotany", icon: "🏺" },
    { name: "Fungi (Mycology)", icon: "🍄" },
    { name: "Genetics", icon: "🧬" },
    { name: "Gymnosperms", icon: "🌲" },
    { name: "Microbiology", icon: "🧫" },
    { name: "Molecular Biology", icon: "🔬" },
    { name: "Palynology", icon: "🌾" },
    { name: "Plant Anatomy", icon: "🌿" },
    { name: "Plant Biotechnology", icon: "⚙️" },
    { name: "Plant Pathology", icon: "🍂" },
    { name: "Plant Physiology", icon: "💧" },
    { name: "Plant Taxonomy", icon: "🏷️" },
    { name: "Pteridophytes", icon: "🌿" }
  ],
  physics: [
    { name: "Quantum Mechanics", icon: "⚛️" },
    { name: "Thermodynamics", icon: "🔥" },
    { name: "Optics & Light", icon: "🔦" },
    { name: "Nuclear Physics", icon: "☢️" },
    { name: "Electromagnetism", icon: "⚡" },
    { name: "Classical Mechanics", icon: "⚙️" },
    { name: "Astrophysics", icon: "🌌" },
    { name: "Relativity", icon: "⏳" }
  ],
  chemistry: [
    { name: "Organic Chemistry", icon: "🧪" },
    { name: "Inorganic Chemistry", icon: "💎" },
    { name: "Physical Chemistry", icon: "📉" },
    { name: "Periodic Table", icon: "📊" },
    { name: "Chemical Bonding", icon: "🔗" },
    { name: "Biochemistry", icon: "🧬" },
    { name: "Electrochemistry", icon: "🔋" },
    { name: "Analytical Chemistry", icon: "🔬" }
  ],
  zoology: [
    { name: "Animal Physiology", icon: "🐾" },
    { name: "Evolutionary Biology", icon: "🐒" },
    { name: "Entomology (Insects)", icon: "🐞" },
    { name: "Marine Biology", icon: "🐋" },
    { name: "Vertebrates", icon: "🦴" },
    { name: "Invertebrates", icon: "🐌" },
    { name: "Ethology (Behavior)", icon: "🧠" },
    { name: "Genetics", icon: "🧬" }
  ]
};