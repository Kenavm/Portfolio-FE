import Skill from "./Skill";

type PublicUser = {
    id:number,
    name: string,
    aboutDescription: string,
    privateUserId: number,
    skillList: Array<Skill>

}

export default PublicUser;