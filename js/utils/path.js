export function getBasePath() {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(part => part && !part.endsWith('.html'));

    // Detect if running on GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');

    if (pathParts.length === 0) {
        return '';
    }

    // For GitHub Pages, first part is repo name, don't count it
    if (isGitHubPages && pathParts.length > 0) {
        const repoName = pathParts[0]; // e.g., 'delta3-new'
        const depth = pathParts.length - 1; // Don't count repo name in depth

        if (depth === 0) {
            // At root of repo (e.g., /delta3-new/index.html)
            return '';
        } else {
            // In subdirectory (e.g., /delta3-new/produkte/alino.html)
            return '../'.repeat(depth);
        }
    }

    // For local development
    return '../'.repeat(pathParts.length);
}

export function resolvePath(relativePath) {
    return `${getBasePath()}${relativePath}`;
}
