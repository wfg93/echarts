<template>
    <div>
        <logo :collapse="isCollapse"/>
        <el-menu
            :default-active="activeMenu"
            :collapse="isCollapse"
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :unique-opened="false"
            :active-text-color="variables.menuActiveText"
            :collapse-transition="false"
            mode="vertical"
        >
            <sidebar-item v-for="route in $router.options.routes" :key="route.path" :item="route" :base-path="route.path" />
        </el-menu>
    </div>
</template>

<script>
    import Logo from './Logo'
    import SidebarItem from './SidebarItem'
    import variables from '@/styles/variables.scss'
    import { mapGetters } from 'vuex'
    export default {
        computed:{
            ...mapGetters([
                'sidebar'
            ]),
            activeMenu(){
                const route = this.$route
                const {meta,path} = route
                if (meta.activeMenu) {
                    return meta.activeMenu
                }
                return path
            },
            variables(){
                return variables
            },
            isCollapse() {
                return !this.sidebar.opened
            }
        },
        components: { SidebarItem, Logo },
    }
</script>

<style lang="scss" scoped>

</style>