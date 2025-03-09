import { useQuery } from "@tanstack/react-query";
import { Octokit } from "octokit";

export default function useFetchUpdateDate(config) {
    return useQuery({
        queryKey: [config.path],
        queryFn: async () => {
            const octokit = new Octokit({
                auth: config.key
            })
            const path = `GET /repos/${config.owner}/${config.repo}/comments`
            const response =  await octokit.request(path, {
                owner: config.owner,
                repo: config.repo,
                headers: {
                  'X-GitHub-Api-Version': config.githubVersion
                }
            }) 
            
            return response;
        },
        retry: config.retryCount
    })
}