import {paths} from 'src/routes/paths';

import {CONFIG} from 'src/config-global';

import {SvgColor} from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`}/>
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// --------------------------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: '',    // Here you can have a subheader
    items: [
      {title: 'Profile', path: paths.dashboard.profile, icon: ICONS.ecommerce},
      {title: 'Resumes', path: paths.dashboard.resume, icon: ICONS.dashboard},
      {title: 'Resume Templates', path: paths.dashboard.resumeTemplate, icon: ICONS.dashboard}, // Remove it from here. There should be another section for this
    ],
  },
];
