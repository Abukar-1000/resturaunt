import { useQuery } from "@tanstack/react-query";
import { Octokit } from "octokit";

function useFetchMenue(config) {
    return useQuery({
        queryKey: [config.path],
        queryFn: async () => {
            const octokit = new Octokit({
                auth: config.key
            })
            const path = `GET /repos/${config.owner}/${config.repo}/contents/${config.path}`
            const metaData = await octokit.request(path, {
                owner: config.owner,
                repo: config.repo,
                path: config.path,
                headers: {
                  'X-GitHub-Api-Version': config.githubVersion
                }
            }) 
            
            const contentNotProvided = !metaData?.content || metaData?.content === "";
            if (contentNotProvided) {
                const { sha } = metaData?.data;
                return await octokit.request(`GET /repos/${config.owner}/${config.repo}/git/blobs/${sha}`, {
                    owner: config.owner,
                    repo: config.repo,
                    file_sha: sha,
                    headers: {
                      'X-GitHub-Api-Version': config.githubVersion
                    }
                  })
            }

            return metaData?.download_url
        },
        retry: config.retryCount
    })
}

export default useFetchMenue;