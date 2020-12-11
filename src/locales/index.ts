// import messages from 'globby?locale!/@/locales/lang/**/*.@(ts)';
import messages from 'globby!/@/locales/lang/**/*.@(ts)';

// import type { DropMenu } from '/@/components/Dropdown';

// locale list
// export const localeList: DropMenu[] = [
export const localeList = [
    {
        text: '简体中文',
        event: 'zh_CN',
    },
    {
        text: 'English',
        event: 'en',
    },
];
export default messages;
