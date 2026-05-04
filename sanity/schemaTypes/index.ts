import {websiteNavigationType} from './websiteNavigation'
import {websitePageType} from './websitePage'

export const schemaTypes = [websitePageType, websiteNavigationType]

export const schema = {
  types: schemaTypes,
}
