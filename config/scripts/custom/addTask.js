module.exports = async (params) => {
    const quickAddApi = app.plugins.plugins.quickadd.api
    const tasksApi = app.plugins.plugins["obsidian-tasks-plugin"].apiV1

    const projects = getProjects()
    
    const selectedProject = await quickAddApi.suggester(project => project.name, projects)
    if (selectedProject === null || selectedProject === undefined) return

    const issues = getIssuesFromProject(selectedProject)
    const selectedIssue = await quickAddApi.suggester(issue => issue.name, issues)

    if (selectedIssue === null || selectedIssue === undefined) return

    let taskLine = await tasksApi.createTaskLineModal()
    taskLine = taskLine.substring(6)

    if (taskLine === null || taskLine === undefined || taskLine.length === 0) return

    quickAddApi.executeChoice('Capture task', {
        PATH: selectedIssue.path,
        TASK: taskLine
    })
}

function getProjects() {
    const uniqueProjectNames = new Set()
    return app.vault.getFiles()
        .filter(file => { 
            if (! (!file.deleted && file.path.includes("projects/") && file.path.includes("/issues/"))) return false

            const projectName = getProjectName(file.path)
            if (uniqueProjectNames.has(projectName)) return false
            
            uniqueProjectNames.add(projectName)
            return true
        })
        .map(project => {
            const projectPath = getProjectPath(project.path)
            const projectName = capitalizeFirstLetter(getProjectName(project.path))
            return {
                file: project,
                name: projectName,
                path: projectPath
            }
        })
}

function getProjectName(path) {
    const pathArray = path.split('/')
    return pathArray[1]
}

function getProjectPath(path) {
    const pathArray = path.split('/')
    return pathArray.slice(0, 2).join('/')
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function getIssuesFromProject(project) {
    return app.vault.getFiles()
        .filter(file => !file.deleted && file.path.includes(project.path + "/issues/"))
        .map(issue => {
            return {
                file: issue,
                name: issue.basename,
                path: issue.path
            }
        })       
}