import MarkdownIt from "markdown-it";
import MarkdownItSub from "markdown-it-sub";
import MarkdownItSup from "markdown-it-sup";
import MarkdownItEmoji from "markdown-it-emoji";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItTaskLists from "markdown-it-task-lists";
// import MarkdownItToc from "markdown-it-table-of-contents";
import MarkdownItToc from "markdown-it-toc-done-right";
import MarkdownItHighlightjs from "markdown-it-highlightjs";
import highlightjs from "highlight.js";


function getMarkdownit() {
    const markdownIt = new MarkdownIt({
        html: false,
        xhtmlOut: true,
        typographer: true
    });
    markdownIt
        .use(MarkdownItSub)
        .use(MarkdownItSup)
        .use(MarkdownItEmoji)
        // .use(MarkdownItAnchor, {permalink: true, permalinkBefore: true})
        .use(MarkdownItAnchor)
        // .use(MarkdownItToc,{markerPattern:'^\[\[toc\]\]'})
        .use(MarkdownItToc)
        // .use(MarkdownItToc)
        .use(MarkdownItTaskLists ,{enabled:false,label:true,labelAfter:true})
        .use(MarkdownItHighlightjs,{inline:true,hljs:highlightjs,auto:true})
        // .use(MarkdownItHighlightjs,{inline:true,auto:true})
    ;
    return markdownIt;
}

export const md = getMarkdownit();