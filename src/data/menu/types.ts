export type LocaleCode = 'es' | 'en' | 'fr'

export type UiLocaleOption = {
  code: LocaleCode
  label: string
  href: string
}

export type MenuItem = {
  name: string
  price?: string
  note?: string
}

export type MenuSectionData = {
  anchor: string
  kicker: string
  title: string
  description: string
  subtitle?: string
  priceNote?: string
  footerNotes?: string[]
  featured?: boolean
  items: MenuItem[]
}

export type UiText = {
  heroScrollDown: string
  referencesLabel: string
  contactTitle: string
  contactMenu: string
  contactInstagram: string
  contactCall: string
  contactDirections: string
  backToTop: string
}

export type LocaleContent = {
  ui: UiText
  sections: MenuSectionData[]
}

export type TapasImageAsset = {
  alt: string
  sources: string[]
}

export type TapasItem = {
  name: string
  description: string
  price?: string
  note?: string
  image?: TapasImageAsset
}

export type TapasHero = {
  kicker: string
  title: string
  price?: string
  description: string
  meatOptions: string[]
  saucesTitle: string
  sauces: string[]
  image: TapasImageAsset
}

export type TapasGroup = {
  anchor: string
  kicker: string
  title: string
  description: string
  items: TapasItem[]
}

export type CroquetasGroup = {
  anchor: string
  kicker: string
  title: string
  description: string
  image: TapasImageAsset
  items: TapasItem[]
}

export type TapasContent = {
  anchor: string
  kicker: string
  title: string
  subtitle: string
  hero: TapasHero
  classics: TapasGroup
  croquetas: CroquetasGroup
}

export type SiteLocaleContent = LocaleContent & {
  coreSections: MenuSectionData[]
  sectionsBeforeTapas: MenuSectionData[]
  sectionsAfterTapas: MenuSectionData[]
  tapas: TapasContent
}
