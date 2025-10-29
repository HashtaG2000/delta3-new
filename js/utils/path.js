export function getBasePath() {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(part => part && !part.endsWith('.html'));
    if (pathParts.length === 0) {
        return '';
    }
    return '../'.repeat(pathParts.length);
}

export function resolvePath(relativePath) {
    return `${getBasePath()}${relativePath}`;
}
