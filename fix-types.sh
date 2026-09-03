sed -i '' 's/projects.map((project: any)/projects.map((project: any)/g' src/app/official/projects/page.tsx
sed -i '' 's/const \[projects, setProjects\] = useState<unknown\[\]>(\[\]);/const [projects, setProjects] = useState<any[]>([]);/g' src/app/official/projects/page.tsx
sed -i '' 's/const \[projects, setProjects\] = useState<unknown\[\]>(\[\]);/const [projects, setProjects] = useState<any[]>([]);/g' src/app/public/page.tsx
