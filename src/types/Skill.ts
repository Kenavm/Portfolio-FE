type Skill = {
    id: number,
    name: Technology,
    level: SkillLevel
}

enum Technology {
    JAVASCRIPT,
    JAVA,
    POSTGRESQL,
    REACT,
    SPRING_WEB,
    SPRING_SECURITY,
    SPRING_DATA,
    EXPRESS_JS,
    MONGO_DB,
    NODE_JS
}

enum SkillLevel {
    BEGINNER,
    INTERMEDIATE,
    ADVANCED
}

export default Skill;