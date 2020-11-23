<template>
    <div>
        <template v-if="(tagList!=null&&tagList.length>0)" v-for="(item,index) in tagList" :key="item.id">
            <a-tag :color="randomColor">
                {{ item.name }}
            </a-tag>
        </template>
        <template v-else>
            <a-tag color="red">未分配</a-tag>
        </template>
    </div>
</template>

<script>
import {computed} from 'vue';

export default {
    name: "ColorTag",
    props: {
        tagList: {
            type: Array
        }
    },
    setup(props, context) {
        console.log("colorTag.props", props.tagList);
        const tagColor = ["blue", "pink", "orange", "red", "green", "cyan", "purple"]
        const randomColor = computed(() => {
            return tagColor[Math.floor((Math.random() * tagColor.length) + 1) % tagColor.length];
        });
        return {
            randomColor
        }
    }
}
</script>

<style scoped>

</style>