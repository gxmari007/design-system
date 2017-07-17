import CoAffix from 'components/affix';
import CoBackTop from 'components/back_top';
import CoBadge from 'components/badge';
import { CoBreadcrumb, CoBreadcrumbItem } from 'components/breadcrumb';
import { CoButtonGroup, CoButton } from 'components/button';
import CoCard from 'components/card';
import { CoCarousel, CoCarouselItem } from 'components/carousel';
import CoCascader from 'components/cascader';
import { CoCheckboxGroup, CoCheckbox } from 'components/checkbox';
import { CoCollapse, CoCollapsePanel } from 'components/collapse';
import { CoDropdown, CoDropdownMenu, CoDropdownItem } from 'components/dropdown';
import { CoForm, CoFormItem } from 'components/form';
import CoInput from 'components/input';
import CoInputNumber from 'components/input_number';
import CoIcon from 'components/icon';
import { CoRow, CoCol } from 'components/layout';
import CoLoading from 'components/loading';
import { CoMenu, CoMenuItem, CoSubmenu, CoMenuGroup } from 'components/menu';
import CoMessage from 'components/message';
import CoModal from 'components/modal';
import CoPagination from 'components/pagination';
import CoPopover from 'components/popover';
import { CoRadioGroup, CoRadio } from 'components/radio';
import CoRate from 'components/rate';
import { CoSelect, CoOption } from 'components/select';
import CoSwitch from 'components/switch';
import { CoTable, CoTableColumn } from 'components/table';
import { CoTabs, CoTabPane } from 'components/tabs';
import CoTag from 'components/tag';
import { CoTimeline, CoTimelineItem } from 'components/timeline';
import CoTooltip from 'components/tooltip';
import CoTree from 'components/tree';

const coview = {
  CoAffix,
  CoBackTop,
  CoBadge,
  CoBreadcrumb,
  CoBreadcrumbItem,
  CoButtonGroup,
  CoButton,
  CoCard,
  CoCarousel,
  CoCarouselItem,
  CoCascader,
  CoCheckboxGroup,
  CoCheckbox,
  CoCollapse,
  CoCollapsePanel,
  CoDropdown,
  CoDropdownMenu,
  CoDropdownItem,
  CoForm,
  CoFormItem,
  CoInput,
  CoInputNumber,
  CoIcon,
  CoRow,
  CoCol,
  CoMenu,
  CoMenuItem,
  CoSubmenu,
  CoMenuGroup,
  CoModal,
  CoPagination,
  CoPopover,
  CoRadioGroup,
  CoRadio,
  CoRate,
  CoSelect,
  CoOption,
  CoSwitch,
  CoTable,
  CoTableColumn,
  CoTabs,
  CoTabPane,
  CoTag,
  CoTimeline,
  CoTimelineItem,
  CoTooltip,
  CoTree,
};

function install(Vue) {
  Object.keys(coview).forEach((key) => {
    const component = coview[key];

    Vue.component(component.name, component);
  });

  Vue.prototype.$loading = CoLoading;
  Vue.prototype.$message = CoMessage;
}

// 在浏览器 script 标签引入的情况下自动安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: require('../package.json').version,
  install,
  ...coview,
};

export {
  CoAffix,
  CoBackTop,
  CoBadge,
  CoBreadcrumb,
  CoBreadcrumbItem,
  CoButtonGroup,
  CoButton,
  CoCard,
  CoCarousel,
  CoCarouselItem,
  CoCascader,
  CoCheckboxGroup,
  CoCheckbox,
  CoCollapse,
  CoCollapsePanel,
  CoDropdown,
  CoDropdownMenu,
  CoDropdownItem,
  CoForm,
  CoFormItem,
  CoInput,
  CoInputNumber,
  CoIcon,
  CoRow,
  CoCol,
  CoMenu,
  CoMenuItem,
  CoSubmenu,
  CoMenuGroup,
  CoMessage,
  CoModal,
  CoPagination,
  CoPopover,
  CoRadioGroup,
  CoRadio,
  CoRate,
  CoSelect,
  CoOption,
  CoSwitch,
  CoTable,
  CoTableColumn,
  CoTabs,
  CoTabPane,
  CoTag,
  CoTimeline,
  CoTimelineItem,
  CoTooltip,
  CoTree,
};
