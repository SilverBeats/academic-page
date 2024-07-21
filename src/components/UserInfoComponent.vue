<template>
    <section class="user-info-box">
        <section class="user-photo"
                 :style="{backgroundImage: 'url(' + getImagePath(userInfo['photo']) + ')'}">
        </section>

        <section class="detail-info-box">
            <section class="info-item en-name-info-item">
                <template v-if="userInfo['firstName']">
                    {{ userInfo["firstName"].trim().title() }}
                </template>
                <template v-if="userInfo['lastName']">
                    &nbsp;{{ userInfo["lastName"].trim().title() }}
                </template>
            </section>
            <section class="info-item zh-name-info-item" v-if="userInfo['zhName']">
                {{ userInfo["zhName"].trim() }}
            </section>

            <section
                class="info-item"
                v-for="(v, k, index) in needToRenderFields"
                :key="k"
                :style="{marginTop: index === 0 ? '10px' : '0px'}"
            >
                <img class="icon" :src="getImagePath(k) + '.png'"/>

                <section class="item-content">
                    <template v-if="v.startsWith('https')">
                        <el-link :href="v" target="_blank">{{ k.toUpperCase() }}</el-link>
                    </template>
                    <template v-else>
                        {{ v }}
                    </template>
                </section>
            </section>
        </section>
    </section>
</template>


<script>
export default {
    name: 'UserInfoComponent',
    inject: ['websiteConfig'],
    data() {
        return {
            userInfo: this.websiteConfig['userInfo'],
        }
    },
    computed: {
        needToRenderFields() {
            const renderObj = JSON.parse(JSON.stringify(this.userInfo))
            delete renderObj['firstName']
            delete renderObj['lastName']
            delete renderObj['zhName']
            delete renderObj['photo']
            for (const key in renderObj) {
                if (!renderObj[key])
                    delete renderObj[key]
            }
            ''.startsWith('https')
            return renderObj
        }
    },
    beforeMount() {
        if (!this.userInfo['photo']) {
            this.userInfo['photo'] = 'user.png'
        }
    },
    methods: {
        getImagePath(fileName) {
            return `/images/${fileName}`
        }
    }
}
</script>


<style lang="less" scoped>

.user-info-box {
    width: 100%;
    height: 100%;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    .user-photo {
        width: 160px;
        height: 210px;
        border-radius: 50%;
        margin-bottom: 1rem;
        overflow: hidden;
        background-size: cover;
        border: 1px solid #f2f3f3;
    }

    .detail-info-box {
        flex-grow: 1;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        .en-name-info-item {
            font-size: 1.5rem;
        }

        .zh-name-info-item {
            font-size: 1.25rem;
        }

        .info-item {
            margin-bottom: 0.5rem;
            display: flex;
            flex-direction: row;
            align-items: center;

            &:last-child {
                margin-bottom: 0;
            }

            .icon {
                width: 20px;
                height: 20px;
            }

            .item-content {
                margin-left: 0.5rem;
                width: calc(170px - 0.5rem);
                overflow-wrap: break-word;
            }
        }
    }
}
</style>
