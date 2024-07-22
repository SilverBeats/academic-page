<template>
    <section class="publication-box">
        <!--搜索框-->
        <template v-if="!isMobile && websiteConfig['adoptSearch']">
            <PaperSelectComponent :papersInfoList="papersInfoList" @filter="searchHandle"/>
        </template>
        <section class="content-part">
            <CardListItem
                v-for="(paper, index) in showPapersInfoList"
                :key="paper['title'].slice(0, 10)"
                :index="index"
                :title="paper['title']"
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

<script>
import {DocumentCopy} from '@element-plus/icons-vue'
import {messageNotice, loadFile, isUrl, clickTagAtoJump} from '@/utils/tools.js'
import CardListItem from "@/components/CardListItem.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import VideoComponent from "@/components/VideoComponent.vue";
import PaperSelectComponent from "@/components/PaperSelectComponent.vue";

export default {
    name: 'PublicationsView',
    data() {
        return {
            // 文件原始数据
            papersInfoList: [],
            // 用于渲染的paper列表
            showPapersInfoList: [],
            bibtexDialogSettings: {
                dialogVisible: false,
                content: ''
            },
            videoDialogSettings: {
                dialogVisible: false,
            },
            videoOptions: {
                controls: true,
                muted: true,
                fluid: true,
                reload: 'auto',
                sources: []
            },
            windowWidth: window.innerWidth
        }
    },
    inject: ['isMobile', 'websiteConfig'],
    async beforeMount() {
        await this.init()
    },
    components: {PaperSelectComponent, VideoComponent, SelectComponent, CardListItem, DocumentCopy},
    methods: {
        /**
         * 一些初始化
         */
        async init() {
            const content = await loadFile('/pages/publication.json')
            this.papersInfoList = JSON.parse(content)
            this.papersInfoList.sort((a, b) => b.year - a.year)

            for (let paper of this.papersInfoList) {
                for (let key in paper['addition']) {
                    if (!paper['addition'][key]) {
                        delete paper['addition'][key]
                    }
                }
            }

            this.showPapersInfoList = this.papersInfoList
        },

        /**
         * @param key 按钮类型
         * @param value 跳转的值
         */
        async additionClickHandle(key, value) {
            try {
                if (key === 'blog') {
                    this.$router.push({name: 'postView', query: {fileName: value}})
                } else if (key === 'paper') {
                    if (value.split('.').pop() !== 'pdf')
                        value = value + '.pdf'
                    clickTagAtoJump('tag-a', isUrl(value) ? value : `/${key}s/${value}`)
                } else if (key === 'bib') {
                    if (value.split('.').pop() !== 'bib')
                        value = value + '.bib'
                    this.bibtexDialogSettings.content = await loadFile(`/${key}s/${value}`)
                    this.bibtexDialogSettings.dialogVisible = true
                } else if (key === 'video') {
                    this.videoOptions.sources = [{
                        src: isUrl(value) ? value : `/${key}s/${value}`
                    }]
                    this.videoDialogSettings.dialogVisible = true
                } else if (isUrl(value)){
                    clickTagAtoJump('tag-a', value)
                } else {
                    return messageNotice(`key = ${key}, not support currently`, 'error')
                }
            } catch (error) {
                messageNotice(error, 'error')
            }
        },
        /**
         * 赋值bibtex文件
         */
        copyBibtexCodeHandle() {
            navigator.clipboard.writeText(this.bibtexDialogSettings.content)
                .then(_ => {
                    messageNotice('Copied', 'success')
                }).catch(_ => {
                messageNotice('Copy Filed', 'error')
            })
        },
        /**
         * 搜索
         */
        searchHandle(filterList) {
            this.showPapersInfoList = filterList
            messageNotice(`${this.showPapersInfoList.length} records were retrieved`, 'success')
        }
    }
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
