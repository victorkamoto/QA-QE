import { readdirSync, statSync } from "fs";
import { resolve, join, relative, basename } from "path";

function directoryToTree(rootDir, depth) {
  const absolutePath = resolve(process.cwd(), rootDir);

  function readDir(currentPath, currentDepth) {
    // Get the list of items in the directory
    const items = readdirSync(currentPath);
    const children = [];

    let totalSize = 0; // to keep track of total size for directories

    for (const item of items) {
      const itemPath = join(currentPath, item);
      const stats = statSync(itemPath);

      // Create the node structure
      const node = {
        path: relative(process.cwd(), itemPath),
        name: item,
        type: stats.isDirectory() ? "dir" : "file",
        size: stats.isDirectory() ? 4096 : stats.size, // directories have a size of 4096 bytes
      };

      if (node.type === "dir") {
        // Only dive deeper if we haven't reached the specified depth
        if (currentDepth < depth) {
          node.children = readDir(itemPath, currentDepth + 1);
        } else {
          node.children = []; // No children if we reached max depth
        }
      }

      children.push(node);
      totalSize += node.size;
    }

    return children;
  }

  // Build the root node
  const rootStats = statSync(absolutePath);
  const rootNode = {
    path: rootDir,
    name: basename(absolutePath),
    type: "dir",
    size: 4096,
    children: readDir(absolutePath, 0),
  };

  return rootNode;
}

console.log("dummy_dir/a_dir 5:", directoryToTree("dummy_dir/a_dir", 5));
console.log("dummy_dir 5:", directoryToTree("dummy_dir", 5));
console.log("dummy_dir 1:", directoryToTree("dummy_dir", 1));
