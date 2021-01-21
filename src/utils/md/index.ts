import MarkdownIt from "markdown-it";
import MarkdownItSub from "markdown-it-sub";
import MarkdownItSup from "markdown-it-sup";
import MarkdownItEmoji from "markdown-it-emoji";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItTaskLists from "markdown-it-task-lists";
import MarkdownItToc from "markdown-it-table-of-contents";
import MarkdownItHighlightjs from "markdown-it-highlightjs";
import highlightjs from "highlight.js";

function getMarkdownit() {
    const markdownIt = new MarkdownIt({
        html: false,
        xhtmlOut: true,
        typographer: true
        //highlight 过滤GitHub markdown css 的背景色失败
        // highlight:function (str, lang) {
        //     // 添加这两行才能正确显示 <>
        //     str = str.replace(/&lt;/g, "<");
        //     str = str.replace(/&gt;/g, ">");
        //     console.log("mmmmmmmmmm",str,lang)
        //     if (lang && highlightjs.getLanguage(lang)) {
        //         try {
        //             return '<pre class="hljs"><code>' +
        //                 highlightjs.highlight(lang, str, true).value +
        //                 '</code></pre>';
        //         } catch (__) {}
        //     }
        //
        //     return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        // }
    });
    markdownIt
        .use(MarkdownItSub)
        .use(MarkdownItSup)
        .use(MarkdownItEmoji)
        // .use(MarkdownItAnchor, {permalink: true, permalinkBefore: true})
        .use(MarkdownItAnchor)
        // .use(MarkdownItToc,{markerPattern:/^\[toc\]/im})
        .use(MarkdownItToc, {markerPattern: /(\{toc\}|\[\[?_?toc_?\]?\]|\$\<toc(\{[^}]*\})\>)/im})
        // .use(MarkdownItToc)
        // .use(MarkdownItToc, {level:2,
        //     format: function (x: any, htmlencode: any) {
        //         console.log("format", x,htmlencode(x), htmlencode)
        //         return `<span>${htmlencode(x)}</span>`;
        //     }
        // })
        // .use(MarkdownItToc)
        .use(MarkdownItTaskLists, {enabled: false, label: true, labelAfter: true})
        .use(MarkdownItHighlightjs, {inline: true, hljs: highlightjs, auto: true})
    // .use(MarkdownItHighlightjs,{inline:true,auto:true})
    ;
    return markdownIt;
}

export const md = getMarkdownit();