// TODO: Add Athletic Skills, Office Skills,
// Data Engineering, Data Science, ML Engineering, ... ?

const skills = [
  {
    title: 'Javascript',
    competency: 3.5,
    category: ['Web Development', 'Languages', 'Javascript'],
  },
  {
    title: 'Node.JS',
    competency: 3,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'React',
    competency: 3.5,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'Bash',
    competency: 3.5,
    category: ['Tools', 'Languages'],
  },
  {
    title: 'MQTT',
    competency: 3.5,
    category: ['Tools', 'Protocols'],
  },
  {
    title: 'TCP/IP',
    competency: 3.5,
    category: ['Tools', 'Protocols'],
  },
  {
    title: 'Serial',
    competency: 3.5,
    category: ['Tools', 'Protocols'],
  },
  {
    title: 'InfluxDB',
    competency: 3.5,
    category: ['Web Development', 'Databases', 'Languages'],
  },
  {
    title: 'Linux',
    competency: 4,
    category: ['Operating System'],
  },
  {
    title: 'ISO 27001',
    competency: 3,
    category: ['Standards', 'Framework'],
  },
  {
    title: 'NIST',
    competency: 3,
    category: ['Standards', 'Framework'],
  },
  {
    title: 'OpenWRT',
    competency: 3.5,
    category: ['Operating System'],
  },
  {
    title: 'Windows',
    competency: 4,
    category: ['Operating System'],
  },
  {
    title: 'MacOS',
    competency: 3.5,
    category: ['Operating System'],
  },
  {
    title: 'FreeRTOS',
    competency: 3,
    category: ['Operating System'],
  },
  {
    title: 'Android',
    competency: 3.5,
    category: ['Operating System'],
  },
  {
    title: 'Amazon Web Services',
    competency: 4,
    category: ['Web Development', 'Tools'],
  },
  {
    title: 'MongoDB',
    competency: 2.5,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'MySQL/SQLite3/SQL',
    competency: 4,
    category: ['Web Development', 'Databases', 'Languages'],
  },
  {
    title: 'Data Mining',
    competency: 3,
    category: ['Data Science'],
  },
  {
    title: 'Express.JS',
    competency: 2,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'D3',
    competency: 2,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'Flask',
    competency: 2,
    category: ['Web Development', 'Python'],
  },
  {
    title: 'Django',
    competency: 3,
    category: ['Web Development', 'Python'],
  },
  {
    title: 'Git',
    competency: 3,
    category: ['Tools'],
  },
  {
    title: 'Google',
    competency: 4.5,
    category: ['Tools', 'Web'],
  },
  {
    title: 'OSINT',
    competency: 4.5,
    category: ['Tools', 'Web'],
  },
  {
    title: 'GPT-4',
    competency: 4,
    category: ['Tools', 'Web Development', 'Languages', 'AI'],
  },
  {
    title: 'Midjourney',
    competency: 3,
    category: ['Tools', 'Web Development', 'AI'],
  },
  {
    title: 'Google Cloud Compute',
    competency: 2,
    category: ['Tools', 'Web Development'],
  },
  {
    title: 'Reverse Engineering',
    competency: 3.5,
    category: ['Standards'],
  },
  {
    title: 'Numpy',
    competency: 3,
    category: ['Data Science', 'Data Engineering', 'Python'],
  },
  {
    title: 'Tensorflow',
    competency: 2.5,
    category: ['Data Science', 'Python'],
  },
  {
    title: 'Jupyter',
    competency: 3.5,
    category: ['Data Science', 'Python'],
  },
  {
    title: 'Typescript',
    competency: 2,
    category: ['Web Development', 'Languages', 'Javascript'],
  },
  {
    title: 'HTML + SASS/SCSS/CSS',
    competency: 3.5,
    category: ['Web Development', 'Languages'],
  },
  {
    title: 'Python',
    competency: 4,
    category: ['Languages', 'Python'],
  },
  {
    title: 'C++',
    competency: 3,
    category: ['Languages'],
  },
  {
    title: 'MATLAB',
    competency: 2,
    category: ['Languages'],
  },
  {
    title: 'R',
    competency: 1,
    category: ['Languages'],
  },
  {
    title: 'Data Visualization',
    competency: 4,
    category: ['Data Science', 'Javascript'],
  },
  {
    title: 'Pandas',
    competency: 4,
    category: ['Data Engineering', 'Data Science', 'Python'],
  },
  {
    title: 'Matplotlib',
    competency: 3,
    category: ['Data Engineering', 'Data Science', 'Python'],
  },
  {
    title: 'Scikit-Learn',
    competency: 2,
    category: ['Data Engineering', 'Data Science', 'Python'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

// this is a list of colors that I like. The length should be == to the
// number of categories. Re-arrange this list until you find a pattern you like.
const colors = [
  '#6968b3',
  '#37b1f5',
  '#40494e',
  '#515dd4',
  '#e47272',
  '#cc7b94',
  '#3896e2',
  '#c3423f',
  '#d75858',
  '#747fff',
  '#64cb7b',
];

const categories = [
  ...new Set(skills.reduce((acc, { category }) => acc.concat(category), [])),
]
  .sort()
  .map((category, index) => ({
    name: category,
    color: colors[index],
  }));

export { categories, skills };
