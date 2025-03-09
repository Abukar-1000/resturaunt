
/**
 * Configurations for each screen
 */

const auth = {
    owner: process.env.REACT_APP_REPO_OWNER,
    repo: process.env.REACT_APP_REPO,
    key: process.env.REACT_APP_REPO_KEY,
    email: process.env.REACT_APP_REPO_EMAIL,
    githubVersion: "2022-11-28"
}

const menues = [
    "menu.png",
    "menu2.png",
    "menu3.png",
]
const config = menues.map((m, index) => ({
    file: m,
    path: "public/" + m,
    display: index,
    retryCount: 3,
    ...auth
}))

export default config;