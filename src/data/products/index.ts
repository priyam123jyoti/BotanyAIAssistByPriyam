import { books } from './books';
import { tech } from './tech';
import { certificates } from './certificates';
// import { courses } from './courses';

export const ALL_PRODUCTS = [
  ...books,
  ...tech,
  ...certificates,
  // ...courses
];

export const SUB_CATEGORIES: Record<string, string[]> = {
  'Books': ['CSIR NET', 'GATE', 'IIT JAM', 'BSc Reference', 'CUET'],
  'Courses': ['CSIR NET', 'GATE', 'Biotech', 'Data Science'],
  'Certificates + courses': [
    'Basic Computer Operator',
    'Excel & ms-Office', 
    'Python + Bio', 
    'Python + Phys', 
    'Basic AI', 
    'Data Entry', 
    'Python',
    'google office'
  ],
  'Tech & Tabs': ['Stylus Tablets', 'Coding Laptops', '3D Modeling', 'Office'],
  'Lab Gear': ['Microscopes', 'Glassware', 'Safety Kits']
};