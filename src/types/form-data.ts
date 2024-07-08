export interface FormData {
    name: string;
    email: string;
    password: string;
    confrim_password?: string;
    github_username: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface IUser {
    _id: string
    name: string;
    email: string;
    github_username: string;
    profile_pic: string;
}

export interface ExperienceModelProps {
    open:boolean
    handleClose: ()=>void
    experiences: [IExperience] | []
    setExperiences: React.Dispatch<React.SetStateAction<any>>
    editExp: IExperience | {}
}

export interface SkillModelProps {
    open:boolean
    handleClose: ()=>void
    skills: [ISkill] | []
    setSkills: React.Dispatch<React.SetStateAction<any>>
    data:ISkill
}

export interface IExperience {
    _id: string
    position:string
    organization:string
    duration: number
}

export interface ISkill {
    _id: string
    name:string
    rating: number
}

export interface IGithubInfo {
    login: string
    avatar_url: string
    html_url: string
    repos: number
    followers: number
    following: number
    [others: string]: any;
}

export interface ICertification {
    _id: string
    name: string
    certificate: string
}

export interface CertificationModelProps {
    open:boolean
    handleClose: ()=>void
    certifications: [ICertification] | []
    setCertifications: React.Dispatch<React.SetStateAction<any>>
    data:ICertification
}