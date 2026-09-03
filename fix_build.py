import re

# Fix 1: page.tsx
with open("src/app/official/projects/[projectId]/page.tsx", "r") as f:
    content = f.read()

content = content.replace("useState<unknown>(null)", "useState<Record<string, any> | null>(null)")
content = content.replace("useState<unknown[]>([])", "useState<any[]>([])")
content = content.replace("risk.risk_probability", "(risk as any).risk_probability")
content = content.replace("project.project_code", "(project as any).project_code")

# Fix 2: MapComponent.tsx
with open("src/app/official/gis/MapComponent.tsx", "r") as f:
    map_content = f.read()
map_content = map_content.replace("unknown", "any")

with open("src/app/official/gis/MapComponent.tsx", "w") as f:
    f.write(map_content)

# Fix 3: risk-engine/page.tsx
with open("src/app/official/risk-engine/page.tsx", "r") as f:
    risk_content = f.read()
risk_content = risk_content.replace("(value: number) =>", "(value: any) =>")

with open("src/app/official/risk-engine/page.tsx", "w") as f:
    f.write(risk_content)
