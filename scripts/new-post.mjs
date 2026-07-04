import { createInterface } from "readline";
import { writeFileSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";

const rl = createInterface({ input: process.stdin, output: process.stdout });

rl.question("Post title: ", (title) => {
  rl.close();

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const now = new Date();
  const date = now.toISOString().replace(/\.\d{3}Z$/, "Z");

  const content = `---
title: "${title}"
date: "${date}"
---

`;

  const filePath = join("src/content/blog", `${slug}.md`);
  writeFileSync(filePath, content);
  console.log(`Created ${filePath}`);

  execSync(`code "${filePath}"`, { stdio: "inherit" });
});
