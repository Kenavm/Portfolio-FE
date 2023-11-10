import Technology from "./Technology";

type Entry = {
    id:number,
    userId:number,
    startDate: Date,
    endDate: Date,
    description: string,
    technologies: Array<Technology>
    role: string,
    linkToRepos: string
}

export default Entry;