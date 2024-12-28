import { useQuery } from "@tanstack/react-query";
import { Octokit } from "octokit";


function useUploadMenue(config, imgPayload, shaHash, isInitialLoad) {
    return useQuery({
        queryKey: [`upload`, imgPayload],
        queryFn: async () => {
            if (imgPayload === "" || isInitialLoad) {
                return;
            }
            
            console.log("my config is: ", config)
            const octokit = new Octokit({
                auth: config.key
            })

            const base64Content = imgPayload.split(",")[1]
            const path = "public/check/" + config.file;
            await octokit.request(`PUT /repos/${config.owner}/${config.repo}/contents/${path}`, {
              owner: config.owner,
              repo: config.repo,
              sha: shaHash,
              path: path,
              message: `${config.file} updated on ${new Date().toLocaleDateString()}`,
              committer: {
                name: 'UI Application',
                email: config.email
              },
              content: base64Content,
              headers: {
                'X-GitHub-Api-Version': config.githubVersion
              }
            })
        },
        staleTime: Infinity,
        retry: false,
    })
}

export default useUploadMenue;