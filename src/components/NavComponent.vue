<template>
    <el-menu
        :default-active="activeIndex"
        :ellipsis="false"
        router
        mode="horizontal"
        menu-trigger="click"
        unique-opened
        close-on-click-outside
    >
        <el-menu-item v-if="websiteConfig['hasLogo']" index="logoImg">
            <img
                :style="{
                    width: websiteConfig['logoInfo']['width'],
                    height: websiteConfig['logoInfo']['height']
                }"
                :src="websiteConfig['logoInfo']['path']"
                alt="website log"
            />
        </el-menu-item>

        <div class="flex-grow"/>

        <template v-if="isMobile">
            <el-sub-menu index="menu">
                <template #title>
                    <el-icon>
                        <Menu/>
                    </el-icon>
                    Menu
                </template>
                <el-menu-item
                    v-for="(v, k, index) in websiteConfig['navInfo']"
                    :route="v"
                    :index="v"
                    :key="k"
                >
                    {{ k.title() }}
                </el-menu-item>
            </el-sub-menu>
        </template>

        <template v-else>
            <el-menu-item
                v-for="(v, k, index) in websiteConfig['navInfo']"
                :route="v"
                :index="v"
                :key="k"
            >
                {{ k.title() }}
            </el-menu-item>
        </template>

    </el-menu>
</template>


<script>
import {Menu} from '@element-plus/icons-vue'
import {toRaw} from "vue";

export default {
    props: {
        isMobile: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            activeIndex: '/'
        }
    },
    inject: ['websiteConfig'],
    components: {Menu},
    beforeMount() {
        this.$router.beforeEach((to, from, next) => {
            this.activeIndex = to.path
            next()
        })
    },
}

</script>

<style scoped>
.flex-grow {
    flex-grow: 1;
}
</style>
