import {resolve} from "path";

function pathResolve(dir: string) {
    return resolve(__dirname, ".", dir);
}

module.exports = {
    // alias: {
    //     "/@/": pathResolve("src"),
    // },
    runtimeCompiler: true,
    alias: {
        'vue': "vue/dist/vue.esm-bundler.js"
    },
    optimizeDeps: {
        include: ["@ant-design/icons-vue","@ant-design-vue/use"],
    },
};