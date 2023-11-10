import Technology from "./Technology";

type Entry = {
    id:number,
    userId:number,
    startDate: string,
    endDate: string,
    description: string,
    technologies: Array<string>
    role: string,
    repoLink: string
}

export default Entry;