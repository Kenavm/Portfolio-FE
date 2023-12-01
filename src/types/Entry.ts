import Technology from "./Technology";

type Entry = {
    id:number,
    privateUserId:number,
    startDate: string,
    endDate: string,
    description: string,
    technologies: Array<Technology>
    role: string,
    repoLink: string
}

export default Entry;