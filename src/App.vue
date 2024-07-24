<template>
    <el-container id="container">
        <el-row id="header" justify="center">
            <el-col :md="18" :xs="24">
                <NavComponent :is-mobile="isMobile"/>
            </el-col>
        </el-row>
        <el-row id="main" justify="center" class="custom-class">
            <template v-if="isMobile">
                <!--如果是移动端, 用户信息以抽屉形式呈现-->
                <mobile-user-info-component/>
            </template>
            <template v-else>
                <!--如果是PC端, 用户信息以侧边栏形式呈现-->
                <el-col :md="6" :xs="24">
                    <user-info-component/>
                </el-col>
            </template>
            <!--主体区域-->
            <el-col :md="12" :xs="24">
                <RouterView/>
            </el-col>
        </el-row>
    </el-container>
</template>

<script setup>
import {RouterView} from 'vue-router'
import NavComponent from '@/components/NavComponent.vue'
import UserInfoComponent from '@/components/UserInfoComponent.vue'
import MobileUserInfoComponent from '@/components/MobileUserInfoComponent.vue'
import {inject} from "vue"
const isMobile = inject('isMobile')
</script>

<style scoped lang="less">
@mobileWidth: 992px;

#container {
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    box-sizing: border-box;

    #header {
        width: 100%;
        height: 60px;
    }

    #main {
        width: 100%;
        height: calc(100vh - 60px);
        box-sizing: border-box;
        padding: 20px 0;
        overflow: auto;

        .el-col {
            height: 100%;
        }
    }
}

@media (max-width: @mobileWidth) {
    .custom-class .el-col:first-child {
        flex-grow: 0;
    }

    .custom-class .el-col:nth-child(2) {
        flex-grow: 1;
    }
}
</style>
