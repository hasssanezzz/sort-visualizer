export const getInsertionPosition = (size, num, arr) => {
    let left = 0,
        right = size - 1,
        mid

    while (left <= right) {
        mid = Math.floor((left + right) / 2)

        if (arr[mid] === num) return mid
        else if (arr[mid] < num) left = mid + 1
        else right = mid - 1
    }

    return left
}

export const getRandomInt = (min = 1, max = 100) => Math.floor(Math.random() * max - min) + min