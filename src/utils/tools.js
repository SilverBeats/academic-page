import {ElLoading, ElMessage} from "element-plus";

export {
    messageNotice, Counter, loadFile
}

let loading = null

function openLoading() {
    loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
}

function closeLoading() {
    loading.close()
}


function messageNotice(msg, type) {
    ElMessage({
        message: msg, type: type, plain: true,
    })
}

async function loadFile(targetFilePath) {
    return new Promise((resolve, reject) => {
        const timestamp = new Date().getTime()
        openLoading()
        fetch(targetFilePath)
            .then(response => response.text())
            .then(content => {
                resolve(content)
            })
            .catch(error => {
                reject(error);
            }).finally(_ => {
                closeLoading()
            })
    });
}

class Counter {
    constructor(iterable) {
        this.counts = {};

        if (iterable) {
            iterable.forEach(item => {
                this.update(item);
            });
        }
    }

    update(item) {
        if (this.counts[item]) {
            this.counts[item]++;
        } else {
            this.counts[item] = 1;
        }
    }

    get(item) {
        return this.counts[item] || 0;
    }

    entries() {
        return Object.entries(this.counts);
    }

    mostCommon(n = 1) {
        return this.entries()
            .sort((a, b) => b[1] - a[1])
            .slice(0, n);
    }
}
