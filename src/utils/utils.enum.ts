export enum ENUM_LANG {
  'ar-EG' = 'ar-EG',
  'az-AZ' = 'az-AZ',
  'bg-BG' = 'bg-BG',
  'ca-ES' = 'ca-ES',
  'cs-CZ' = 'cs-CZ',
  'da-DK' = 'da-DK',
  'de-DE' = 'de-DE',
  'el-GR' = 'el-GR',
  'en-GB' = 'en-GB',
  'en-US' = 'en-US',
  'es-ES' = 'es-ES',
  'et-EE' = 'et-EE',
  'fa-IR' = 'fa-IR',
  'fi-FI' = 'fi-FI',
  'fr-BE' = 'fr-BE',
  'fr-FR' = 'fr-FR',
  'ga-IE' = 'ga-IE',
  'he-IL' = 'he-IL',
  'hi-IN' = 'hi-IN',
  'hr-HR' = 'hr-HR',
  'hu-HU' = 'hu-HU',
  'hy-AM' = 'hy-AM',
  'id-ID' = 'id-ID',
  'it-IT' = 'it-IT',
  'is-IS' = 'is-IS',
  'ja-JP' = 'ja-JP',
  'ku-IQ' = 'ku-IQ',
  'kn-IN' = 'kn-IN',
  'ko-KR' = 'ko-KR',
  'lv-LV' = 'lv-LV',
  'mk-MK' = 'mk-MK',
  'mn-MN' = 'mn-MN',
  'ms-MY' = 'ms-MY',
  'nb-NO' = 'nb-NO',
  'ne-NP' = 'ne-NP',
  'nl-BE' = 'nl-BE',
  'nl-NL' = 'nl-NL',
  'pt-BR' = 'pt-BR',
  'pt-PT' = 'pt-PT',
  'ro-RO' = 'ro-RO',
  'ru-RU' = 'ru-RU',
  'sk-SK' = 'sk-SK',
  'sr-RS' = 'sr-RS',
  'sl-SI' = 'sl-SI',
  'sv-SE' = 'sv-SE',
  'ta-IN' = 'ta-IN',
  'th-TH' = 'th-TH',
  'tr-TR' = 'tr-TR',
  'uk-UA' = 'uk-UA',
  'vi-VN' = 'vi-VN',
  'zh-CN' = 'zh-CN',
  'zh-TW' = 'zh-TW',
}

export const defaultLangUConfigMap = {
  [ENUM_LANG['ar-EG']]: { lang: ENUM_LANG['ar-EG'], label: 'العربية', icon: '🇪🇬', title: 'لغة' },
  [ENUM_LANG['az-AZ']]: {
    lang: ENUM_LANG['az-AZ'],
    label: 'Azərbaycan dili',
    icon: '🇦🇿',
    title: 'Dil',
  },
  [ENUM_LANG['bg-BG']]: {
    lang: ENUM_LANG['bg-BG'],
    label: 'Български език',
    icon: '🇧🇬',
    title: 'език',
  },
  [ENUM_LANG['ca-ES']]: { lang: ENUM_LANG['ca-ES'], label: 'Catalá', icon: '🇨🇦', title: 'llengua' },
  [ENUM_LANG['cs-CZ']]: { lang: ENUM_LANG['cs-CZ'], label: 'Čeština', icon: '🇨🇿', title: 'Jazyk' },
  [ENUM_LANG['da-DK']]: { lang: ENUM_LANG['da-DK'], label: 'Dansk', icon: '🇩🇰', title: 'Sprog' },
  [ENUM_LANG['de-DE']]: {
    lang: ENUM_LANG['de-DE'],
    label: 'Deutsch',
    icon: '🇩🇪',
    title: 'Sprache',
  },
  [ENUM_LANG['el-GR']]: {
    lang: ENUM_LANG['el-GR'],
    label: 'Ελληνικά',
    icon: '🇬🇷',
    title: 'Γλώσσα',
  },
  [ENUM_LANG['en-GB']]: {
    lang: ENUM_LANG['en-GB'],
    label: 'English',
    icon: '🇬🇧',
    title: 'Language',
  },
  [ENUM_LANG['en-US']]: {
    lang: ENUM_LANG['en-US'],
    label: 'English',
    icon: '🇺🇸',
    title: 'Language',
  },
  [ENUM_LANG['es-ES']]: { lang: ENUM_LANG['es-ES'], label: 'Español', icon: '🇪🇸', title: 'Idioma' },
  [ENUM_LANG['et-EE']]: { lang: ENUM_LANG['et-EE'], label: 'Eesti', icon: '🇪🇪', title: 'Keel' },
  [ENUM_LANG['fa-IR']]: { lang: ENUM_LANG['fa-IR'], label: 'فارسی', icon: '🇮🇷', title: 'زبان' },
  [ENUM_LANG['fi-FI']]: { lang: ENUM_LANG['fi-FI'], label: 'Suomi', icon: '🇫🇮', title: 'Kieli' },
  [ENUM_LANG['fr-BE']]: {
    lang: ENUM_LANG['fr-BE'],
    label: 'Français',
    icon: '🇧🇪',
    title: 'Langue',
  },
  [ENUM_LANG['fr-FR']]: {
    lang: ENUM_LANG['fr-FR'],
    label: 'Français',
    icon: '🇫🇷',
    title: 'Langue',
  },
  [ENUM_LANG['ga-IE']]: { lang: ENUM_LANG['ga-IE'], label: 'Gaeilge', icon: '🇮🇪', title: 'Teanga' },
  [ENUM_LANG['he-IL']]: { lang: ENUM_LANG['he-IL'], label: 'עברית', icon: '🇮🇱', title: 'שפה' },
  [ENUM_LANG['hi-IN']]: {
    lang: ENUM_LANG['hi-IN'],
    label: 'हिन्दी, हिंदी',
    icon: '🇮🇳',
    title: 'भाषा: हिन्दी',
  },
  [ENUM_LANG['hr-HR']]: {
    lang: ENUM_LANG['hr-HR'],
    label: 'Hrvatski jezik',
    icon: '🇭🇷',
    title: 'Jezik',
  },
  [ENUM_LANG['hu-HU']]: { lang: ENUM_LANG['hu-HU'], label: 'Magyar', icon: '🇭🇺', title: 'Nyelv' },
  [ENUM_LANG['hy-AM']]: { lang: ENUM_LANG['hy-AM'], label: 'Հայերեն', icon: '🇦🇲', title: 'Լեզու' },
  [ENUM_LANG['id-ID']]: {
    lang: ENUM_LANG['id-ID'],
    label: 'Bahasa Indonesia',
    icon: '🇮🇩',
    title: 'Bahasa',
  },
  [ENUM_LANG['it-IT']]: {
    lang: ENUM_LANG['it-IT'],
    label: 'Italiano',
    icon: '🇮🇹',
    title: 'Linguaggio',
  },
  [ENUM_LANG['is-IS']]: {
    lang: ENUM_LANG['is-IS'],
    label: 'Íslenska',
    icon: '🇮🇸',
    title: 'Tungumál',
  },
  [ENUM_LANG['ja-JP']]: { lang: ENUM_LANG['ja-JP'], label: '日本語', icon: '🇯🇵', title: '言語' },
  [ENUM_LANG['ku-IQ']]: { lang: ENUM_LANG['ku-IQ'], label: 'کوردی', icon: '🇮🇶', title: 'Ziman' },
  [ENUM_LANG['kn-IN']]: { lang: ENUM_LANG['kn-IN'], label: 'ಕನ್ನಡ', icon: '🇮🇳', title: 'ಭಾಷೆ' },
  [ENUM_LANG['ko-KR']]: { lang: ENUM_LANG['ko-KR'], label: '한국어', icon: '🇰🇷', title: '언어' },
  [ENUM_LANG['lv-LV']]: {
    lang: ENUM_LANG['lv-LV'],
    label: 'Latviešu valoda',
    icon: '🇱🇮',
    title: 'Kalba',
  },
  [ENUM_LANG['mk-MK']]: {
    lang: ENUM_LANG['mk-MK'],
    label: 'македонски јазик',
    icon: '🇲🇰',
    title: 'Јазик',
  },
  [ENUM_LANG['mn-MN']]: { lang: ENUM_LANG['mn-MN'], label: 'Монгол хэл', icon: '🇲🇳', title: 'Хэл' },
  [ENUM_LANG['ms-MY']]: {
    lang: ENUM_LANG['ms-MY'],
    label: 'بهاس ملايو‎',
    icon: '🇲🇾',
    title: 'Bahasa',
  },
  [ENUM_LANG['nb-NO']]: { lang: ENUM_LANG['nb-NO'], label: 'Norsk', icon: '🇳🇴', title: 'Språk' },
  [ENUM_LANG['ne-NP']]: { lang: ENUM_LANG['ne-NP'], label: 'नेपाली', icon: '🇳🇵', title: 'भाषा' },
  [ENUM_LANG['nl-BE']]: { lang: ENUM_LANG['nl-BE'], label: 'Vlaams', icon: '🇧🇪', title: 'Taal' },
  [ENUM_LANG['nl-NL']]: { lang: ENUM_LANG['nl-NL'], label: 'Vlaams', icon: '🇳🇱', title: 'Taal' },
  [ENUM_LANG['pt-BR']]: {
    lang: ENUM_LANG['pt-BR'],
    label: 'Português',
    icon: '🇧🇷',
    title: 'Idiomas',
  },
  [ENUM_LANG['pt-PT']]: {
    lang: ENUM_LANG['pt-PT'],
    label: 'Português',
    icon: '🇵🇹',
    title: 'Idiomas',
  },
  [ENUM_LANG['ro-RO']]: { lang: ENUM_LANG['ro-RO'], label: 'Română', icon: '🇷🇴', title: 'Limba' },
  [ENUM_LANG['ru-RU']]: { lang: ENUM_LANG['ru-RU'], label: 'русский', icon: '🇷🇺', title: 'язык' },
  [ENUM_LANG['sk-SK']]: {
    lang: ENUM_LANG['sk-SK'],
    label: 'Slovenčina',
    icon: '🇸🇰',
    title: 'Jazyk',
  },
  [ENUM_LANG['sr-RS']]: {
    lang: ENUM_LANG['sr-RS'],
    label: 'српски језик',
    icon: '🇸🇷',
    title: 'Језик',
  },
  [ENUM_LANG['sl-SI']]: {
    lang: ENUM_LANG['sl-SI'],
    label: 'Slovenščina',
    icon: '🇸🇱',
    title: 'Jezik',
  },
  [ENUM_LANG['sv-SE']]: { lang: ENUM_LANG['sv-SE'], label: 'Svenska', icon: '🇸🇪', title: 'Språk' },
  [ENUM_LANG['ta-IN']]: { lang: ENUM_LANG['ta-IN'], label: 'தமிழ்', icon: '🇮🇳', title: 'மொழி' },
  [ENUM_LANG['th-TH']]: { lang: ENUM_LANG['th-TH'], label: 'ไทย', icon: '🇹🇭', title: 'ภาษา' },
  [ENUM_LANG['tr-TR']]: { lang: ENUM_LANG['tr-TR'], label: 'Türkçe', icon: '🇹🇷', title: 'Dil' },
  [ENUM_LANG['uk-UA']]: {
    lang: ENUM_LANG['uk-UA'],
    label: 'Українська',
    icon: '🇺🇰',
    title: 'Мова',
  },
  [ENUM_LANG['vi-VN']]: {
    lang: ENUM_LANG['vi-VN'],
    label: 'Tiếng Việt',
    icon: '🇻🇳',
    title: 'Ngôn ngữ',
  },
  [ENUM_LANG['zh-CN']]: { lang: ENUM_LANG['zh-CN'], label: '简体中文', icon: '🇨🇳', title: '语言' },
  [ENUM_LANG['zh-TW']]: { lang: ENUM_LANG['zh-TW'], label: '繁體中文', icon: '🇭🇰', title: '語言' },
};

export const ErrorNotify = [
  { url: 'auth/login', method: ['post'] },
  { url: 'auth/register', method: ['post'] },
  { url: 'auth/change-password', method: ['put'] },
  { url: 'scopes/status', method: ['put'] },
  { url: 'scopes', method: ['patch', 'post', 'delete'] },
  { url: 'resources/status', method: ['put'] },
  { url: 'resources', method: ['patch', 'post', 'delete'] },
  { url: 'roles', method: ['patch', 'post', 'delete'] },
  { url: 'role-to-menu', method: ['patch', 'post', 'delete'] },
  { url: 'users/status', method: ['put'] },
  { url: 'users', method: ['patch', 'post', 'delete'] },
  { url: 'users/internal/change-password', method: ['put'] },
  { url: 'areas', method: ['patch', 'post', 'delete', 'put'] },
  { url: 'floors', method: ['patch', 'post', 'delete', 'put'] },
  { url: 'rooms', method: ['patch', 'post', 'delete', 'put'] },
  { url: 'room-types', method: ['patch', 'post', 'delete', 'put'] },
  { url: 'customers', method: ['patch', 'post', 'delete', 'put'] },
  { url: 'rental-vouchers', method: ['patch', 'post', 'delete', 'put'] },
  { url: 'root-users', method: ['patch', 'post', 'delete', 'put'] },
  { url: 'admin-users', method: ['patch', 'post', 'delete', 'put'] },
];

export const SuccessNotify = [
  { url: 'auth/login', method: ['post'] },
  { url: 'auth/register', method: ['post'] },
  { url: 'auth/change-password', method: ['put'] },
  { url: 'scopes/status', method: ['put'] },
  { url: 'scopes', method: ['patch', 'post', 'delete'] },
  { url: 'resources/status', method: ['put'] },
  { url: 'resources', method: ['patch', 'post', 'delete'] },
  { url: 'roles', method: ['patch', 'post', 'delete'] },
  { url: 'role-to-menu', method: ['patch', 'post', 'delete'] },
  { url: 'users/status', method: ['put'] },
  { url: 'users', method: ['patch', 'post', 'delete'] },
  { url: 'users/internal/change-password', method: ['put'] },
  { url: 'areas', method: ['patch', 'post', 'delete', 'put'] },
  { url: 'floors', method: ['patch', 'post', 'delete', 'put'] },
  { url: 'rooms', method: ['patch', 'post', 'delete', 'put'] },
  { url: 'room-types', method: ['patch', 'post', 'delete', 'put'] },
  { url: 'customers', method: ['patch', 'post', 'delete', 'put'] },
  { url: 'rental-vouchers', method: ['patch', 'post', 'delete', 'put'] },
  { url: 'root-users', method: ['patch', 'post', 'delete', 'put'] },
  { url: 'admin-users', method: ['patch', 'post', 'delete', 'put'] },
];

export const loginPath = '/auth/login';

export const dashboardPath = '/hotel/room';

export enum ENUM_RESOURCE {
  USER = 'USER',
  ROLE = 'ROLE',
  ADMIN = 'ADMIN',
  SCOPE = 'SCOPE',
  RESOURCE = 'RESOURCE',
  PROFILE = 'PROFILE',
  AREA = 'AREA',
  FLOOR = 'FLOOR',
  ROOM = 'ROOM',
  ROOM_TYPE = 'ROOM_TYPE',
  CUSTOMER = 'CUSTOMER',
  RENTAL_VOUCHER = 'RENTAL_VOUCHER',
  ROOT_USER = 'ROOT_USER',
  ADMIN_USER = 'ADMIN_USER',
}

export type ENUM_RESOURCE_KEYS = keyof typeof ENUM_RESOURCE;

export enum ENUM_SCOPE_TYPE {
  READ = 'READ',
  IMPORT = 'IMPORT',
  UPDATE = 'UPDATE',
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  EXPORT = 'EXPORT',
  BROWSE = 'BROWSE',
  UPDATE_STATUS = 'UPDATE_STATUS',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  SYNC = 'SYNC',
  COPY = 'COPY',
}

export type ENUM_SCOPE_TYPE_KEYS = keyof typeof ENUM_SCOPE_TYPE;

export const SCOPE_TYPE = {
  [ENUM_SCOPE_TYPE.READ]: { text: 'Read', value: ENUM_SCOPE_TYPE.READ },
  [ENUM_SCOPE_TYPE.IMPORT]: { text: 'Import', value: ENUM_SCOPE_TYPE.IMPORT },
  [ENUM_SCOPE_TYPE.UPDATE]: { text: 'Update', value: ENUM_SCOPE_TYPE.UPDATE },
  [ENUM_SCOPE_TYPE.CREATE]: { text: 'Create', value: ENUM_SCOPE_TYPE.CREATE },
  [ENUM_SCOPE_TYPE.DELETE]: { text: 'Delete', value: ENUM_SCOPE_TYPE.DELETE },
  [ENUM_SCOPE_TYPE.EXPORT]: { text: 'Export', value: ENUM_SCOPE_TYPE.EXPORT },
  [ENUM_SCOPE_TYPE.BROWSE]: { text: 'Browse', value: ENUM_SCOPE_TYPE.BROWSE },
  [ENUM_SCOPE_TYPE.UPDATE_STATUS]: {
    text: 'Update status',
    value: ENUM_SCOPE_TYPE.UPDATE_STATUS,
  },
  [ENUM_SCOPE_TYPE.SYNC]: { text: 'Sync', value: ENUM_SCOPE_TYPE.SYNC },
  [ENUM_SCOPE_TYPE.COPY]: { text: 'Copy', value: ENUM_SCOPE_TYPE.COPY },
  [ENUM_SCOPE_TYPE.UPDATE_PASSWORD]: {
    text: 'Update password',
    value: ENUM_SCOPE_TYPE.UPDATE_PASSWORD,
  },
};

export const SIZE_AVATAR = {
  width: 50,
  height: 50,
};

export enum ENUM_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const STATUS = {
  [ENUM_STATUS.ACTIVE]: { text: 'Hoạt động', key: ENUM_STATUS.ACTIVE, id: 'pages.status.ACTIVE' },
  [ENUM_STATUS.INACTIVE]: {
    text: 'Không hoạt động',
    key: ENUM_STATUS.INACTIVE,
    id: 'pages.status.INACTIVE',
  },
};

export enum ENUM_ROOM_STATUS {
  'AVAILABLE' = 'AVAILABLE',
  'BOOKED' = 'BOOKED',
}

export const ROOM_STATUS = {
  [ENUM_ROOM_STATUS.AVAILABLE]: {
    text: 'Còn trống',
    key: ENUM_ROOM_STATUS.AVAILABLE,
    id: 'pages.room_status.available',
  },
  [ENUM_ROOM_STATUS.BOOKED]: {
    text: 'Đã đặt',
    key: ENUM_ROOM_STATUS.BOOKED,
    id: 'pages.room_status.booked',
  },
};

export enum ENUM_RENTAL_VOUCHER_STATUS {
  BOOKED = 'BOOKED',
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT',
  CANCEL = 'CANCEL',
}

export const RENTAL_VOUCHER_STATUS = {
  [ENUM_RENTAL_VOUCHER_STATUS.BOOKED]: {
    text: 'Đã đặt',
    key: ENUM_RENTAL_VOUCHER_STATUS.BOOKED,
    id: 'pages.rental_voucher_status.booked',
  },
  [ENUM_RENTAL_VOUCHER_STATUS.CHECK_IN]: {
    text: 'Đã nhận phòng',
    key: ENUM_RENTAL_VOUCHER_STATUS.CHECK_IN,
    id: 'pages.rental_voucher_status.check_in',
  },
  [ENUM_RENTAL_VOUCHER_STATUS.CHECK_OUT]: {
    text: 'Đã trả phòng',
    key: ENUM_RENTAL_VOUCHER_STATUS.CHECK_OUT,
    id: 'pages.rental_voucher_status.check_out',
  },
  [ENUM_RENTAL_VOUCHER_STATUS.CANCEL]: {
    text: 'Đã hủy',
    key: ENUM_RENTAL_VOUCHER_STATUS.CANCEL,
    id: 'pages.rental_voucher_status.cancel',
  },
};

export enum ENUM_RESOURCE_TYPE {
  PORTAL = 'PORTAL',
  PUBLIC = 'PUBLIC',
}

export type RESOURCE_TYPE_KEYS = keyof typeof ENUM_RESOURCE_TYPE;

export const RESOURCE_TYPE = {
  [ENUM_RESOURCE_TYPE.PORTAL]: { text: 'Portal', id: 'pages.type.portal', color: 'green' },
  [ENUM_RESOURCE_TYPE.PUBLIC]: { text: 'Public', id: 'pages.type.public', color: 'cyan' },
};

export const GENDER = [
  { text: 'Nam', key: 'MALE', id: 'pages.gender.male' },
  { text: 'Nữ', key: 'FEMALE', id: 'pages.gender.female' },
  { text: 'Khác', key: 'OTHER', id: 'pages.gender.other' },
];

export const FALLBACK_STRING =
  'data:image/png;base64,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';
