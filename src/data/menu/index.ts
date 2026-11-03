import {
  getLocaleContent as getBaseLocaleContent,
  getLocaleFromPath,
  localeOptions,
} from './base'
import { getTapasContent } from './tapas'
import type {
  LocaleCode,
  LocaleContent,
  MenuItem,
  MenuSectionData,
  SiteLocaleContent,
  TapasContent,
  TapasGroup,
  TapasHero,
  TapasImageAsset,
  TapasItem,
  UiLocaleOption,
  UiText,
} from './types'

const TAPAS_INSERT_AFTER = 'sangrias'

function splitCoreSections(sections: MenuSectionData[]) {
  const insertIndex = sections.findIndex((section) => section.anchor === TAPAS_INSERT_AFTER)

  if (insertIndex === -1) {
    return {
      sectionsBeforeTapas: sections,
      sectionsAfterTapas: [] as MenuSectionData[],
    }
  }

  return {
    sectionsBeforeTapas: sections.slice(0, insertIndex + 1),
    sectionsAfterTapas: sections.slice(insertIndex + 1),
  }
}

export function getLocaleContent(locale: LocaleCode): SiteLocaleContent {
  const baseContent = getBaseLocaleContent(locale) as LocaleContent
  const tapas = getTapasContent(locale)
  const { sectionsBeforeTapas, sectionsAfterTapas } = splitCoreSections(baseContent.sections)

  return {
    ...baseContent,
    coreSections: baseContent.sections,
    sectionsBeforeTapas,
    sectionsAfterTapas,
    tapas,
  }
}

export {
  getLocaleFromPath,
  getTapasContent,
  localeOptions,
}

export type {
  LocaleCode,
  LocaleContent,
  MenuItem,
  MenuSectionData,
  SiteLocaleContent,
  TapasContent,
  TapasGroup,
  TapasHero,
  TapasImageAsset,
  TapasItem,
  UiLocaleOption,
  UiText,
}
