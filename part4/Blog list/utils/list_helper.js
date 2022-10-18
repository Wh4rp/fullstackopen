const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (greater, item) => {
        return greater.likes < item.likes ? item : greater
    }

    return blogs.length === 0 ? {} : blogs.reduce(reducer, { likes: -1 })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}