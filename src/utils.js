export const sortTodosByMethod = ( todos, sortMethod) => {
    return [...todos].sort((a,b) => {
        if (sortMethod === 'default'){
            return 0;
        } else if (sortMethod === 'alphabetical') {
            return a.task.localeCompare(b.task);
        } else if (sortMethod === 'oldest'){
            return new Date(a.createdAt) - new Date(b.createdAt);
        } else if (sortMethod === 'newest'){
            return new Date(b.createdAt) - new Date(a.createdAt);
        } 
    })
}