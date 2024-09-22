<template>
    <section class="publication-box">
        <!--搜索框-->
        <template v-if="!isMobile && websiteConfig['adoptSearch']">
            <PaperSelectComponent :papersInfoList="papersInfoList" @filter="searchHandle"/>
        </template>
        <section style="margin-bottom: 8px; font-size: small; text-align: right; width: 98%;">{{websiteConfig['authorMarkInfo']}}</section>
        <section class="content-part">
            <CardListItem
                v-for="(paper, index) in showPapersInfoList"
                :key="paper['title'].slice(0, 10)"
                :index="index + 1"
                :title="paper['title']"
                :book-title="paper['bookTitle']"
                :paper-type="paper['paperType']"
                :authors="paper['authors']"
                :author-position="paper['authorPosition']"
                :year="paper['year']"
                :link-list="paper['addition']"
                @buttonClick="additionClickHandle"
            />
        </section>
    </section>
    <!-- 隐藏的用于下载的 a 标签 -->
    <a id="tag-a" style="display:none;" target="_blank"></a>
    <!--显示bibtex的对话框-->
    <el-dialog
        class="bibtex-dialog"
        title="Bibtex"
        destroy-on-close
        show-close
        v-model="bibtexDialogSettings.dialogVisible"
        :width="isMobile ? windowWidth * 0.8 : windowWidth * 0.5"
    >
        <section class="button-area">
            <el-icon @click="copyBibtexCodeHandle">
                <DocumentCopy/>
            </el-icon>
        </section>
        <section class="code-area">
            <pre>{{ bibtexDialogSettings.content }}</pre>
        </section>
    </el-dialog>
    <!--视频播放-->
    <el-dialog
        title="Video"
        destroy-on-close
        show-close
        v-model="videoDialogSettings.dialogVisible"
        :width="isMobile ? windowWidth * 0.8 :windowWidth * 0.5"
    >
        <VideoComponent :options="videoOptions" class="video-box"/>
    </el-dialog>
</template>

<script setup>
import {DocumentCopy} from '@element-plus/icons-vue'
import {messageNotice, loadFile, isUrl, clickTagAtoJump} from '@/utils/tools.js'
import CardListItem from "@/components/CardListItem.vue";
import VideoComponent from "@/components/VideoComponent.vue";
import PaperSelectComponent from "@/components/PaperSelectComponent.vue";
import {ref, reactive, onBeforeMount, inject} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()
const isMobile = inject('isMobile')
const websiteConfig = inject('websiteConfig')
const sourceFilePath = '/pages/publication.json'
// 文件原始数据
const papersInfoList = ref([])
// 用于渲染的paper列表
const showPapersInfoList = ref([])
const bibtexDialogSettings = reactive({
    dialogVisible: false,
    content: ''
})
const videoDialogSettings = reactive({
    dialogVisible: false,
})
const videoOptions = reactive({
    controls: true,
    muted: true,
    fluid: true,
    reload: 'auto',
    sources: []
})
const windowWidth = ref(window.innerWidth)

onBeforeMount(async () => {
    const content = await loadFile(sourceFilePath)
    const _papersInfoList = JSON.parse(content)
    _papersInfoList.sort((a, b) => b.year - a.year)

    for (let paper of _papersInfoList) {
        for (let key in paper['addition']) {
            if (!paper['addition'][key]) {
                delete paper['addition'][key]
            }
        }
    }
    showPapersInfoList.value = _papersInfoList
    papersInfoList.value = _papersInfoList
})

const additionClickHandle = async (key, value) => {
    try {
        if (key === 'blog') {
            await router.push({path: '/post', query: {fileName: value}})
        } else if (key === 'paper') {
            if (value.split('.').pop() !== 'pdf')
                value = value + '.pdf'
            clickTagAtoJump('tag-a', isUrl(value) ? value : `/${key}s/${value}`)
        } else if (key === 'bib') {
            if (value.split('.').pop() !== 'bib')
                value = value + '.bib'
            bibtexDialogSettings.content = await loadFile(`/${key}s/${value}`)
            bibtexDialogSettings.dialogVisible = true
        } else if (key === 'video') {
            videoOptions.sources = [{
                src: isUrl(value) ? value : `/${key}s/${value}`
            }]
            videoDialogSettings.dialogVisible = true
        } else if (isUrl(value)) {
            clickTagAtoJump('tag-a', value)
        } else {
            return messageNotice(`key = ${key}, not support currently`, 'error')
        }
    } catch (error) {
        messageNotice(error, 'error')
    }
}

const copyBibtexCodeHandle = async () => {
    try {
        await navigator.clipboard.writeText(bibtexDialogSettings.content)
        messageNotice('Copied', 'success')
    } catch (error) {
        messageNotice('Copy Filed', 'error')
        console.log(error)
    }
}

const searchHandle = (filterList) => {
    showPapersInfoList.value = filterList
    messageNotice(`${showPapersInfoList.value.length} records were retrieved`, 'success')
}

</script>

<style lang="less" scoped>
.publication-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .content-part {
        flex: 1;
        overflow-y: auto;
        width: 100%;

        .el-card {
            width: 98%;
            margin-bottom: 10px;

            &:last-child {
                margin-bottom: 0;
            }

            .outer-box {
                height: 100%;
                width: 100%;

                .el-row {
                    flex-wrap: nowrap;

                    .el-col {
                        white-space: break-spaces;
                    }
                }

                .hyp-link-box {
                    margin-top: 15px;
                    text-align: right;

                    .el-link {
                        margin-right: 8px;
                    }

                    el-link:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
    }
}


.bibtex-dialog {
    .button-area {
        text-align: right;
        margin-bottom: 8px;
    }

    .button-area:hover {
        cursor: pointer;
    }

    .code-area {
        overflow: scroll;
        padding: 5px;
        border: 1px #a1a3a9 inset;
    }
}

.video-box {
    height: 100%;
    width: 100%;
}
</style>
