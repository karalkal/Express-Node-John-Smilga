const { readFile, writeFile } = require('fs')
// console.log("with Promise")

function getText(pathFile1, pathFile2) {
    const p1 = new Promise((resolve, reject) => {
        readFile(pathFile1, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
    const p2 = new Promise((resolve, reject) => {
        readFile(pathFile2, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

    return Promise.all([p1, p2])
}

function writeToFile(arr) {
    let [text1, text2] = arr

    console.log(arr, text1, text2)

    return new Promise((resolve, reject) => {
        writeFile(
            '../content/result-Promise.all.txt',
            `Promises, promises...: ${text1} ${text2}`,
            { flag: 'a' },

            (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            }
        )
    })
}

// make sure path to file is correct
getText('../content/first.txt', '../content/second.txt')
    // .then(result => console.log(...result))
    .then(result => writeToFile(result))
    .catch(err => console.log(err))
