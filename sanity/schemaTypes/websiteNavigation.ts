import {defineArrayMember, defineField, defineType} from 'sanity'

const languageOptions = [
  {title: 'English', value: 'en'},
  {title: 'Deutsch', value: 'de'},
  {title: '日本語', value: 'ja'},
]

const navigationKeyOptions = [
  {title: 'Main Navigation', value: 'main'},
]

const navigationItemKeyOptions = [
  {title: 'Home', value: 'home'},
  {title: 'Fairs', value: 'fairs'},
  {title: 'FAQ', value: 'faq'},
  {title: 'Privacy', value: 'privacy'},
  {title: 'Support', value: 'support'},
]

export const websiteNavigationType = defineType({
  name: 'websiteNavigation',
  title: 'Website Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Navigation',
      type: 'string',
      initialValue: 'main',
      options: {
        list: navigationKeyOptions,
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'translations',
      title: 'Translations',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'translation',
          title: 'Translation',
          type: 'object',
          fields: [
            defineField({
              name: 'languageCode',
              title: 'Language',
              type: 'string',
              options: {
                list: languageOptions,
                layout: 'dropdown',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'menuLabel',
              title: 'Menu Label',
              type: 'string',
              description: 'Used for compact/mobile navigation, for example Menu, Menü or メニュー.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Navigation Items',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'navigationItem',
                  title: 'Navigation Item',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'itemKey',
                      title: 'Item',
                      type: 'string',
                      options: {
                        list: navigationItemKeyOptions,
                        layout: 'dropdown',
                      },
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'isVisible',
                      title: 'Visible',
                      type: 'boolean',
                      initialValue: true,
                    }),
                    defineField({
                      name: 'sortOrder',
                      title: 'Sort Order',
                      type: 'number',
                      initialValue: 10,
                      validation: (rule) => rule.required().integer().min(0),
                    }),
                  ],
                  preview: {
                    select: {
                      itemKey: 'itemKey',
                      label: 'label',
                      isVisible: 'isVisible',
                      sortOrder: 'sortOrder',
                    },
                    prepare({itemKey, label, isVisible, sortOrder}) {
                      return {
                        title: label || itemKey || 'Navigation Item',
                        subtitle: `${itemKey || 'unknown'} · order ${sortOrder ?? '—'} · ${
                          isVisible === false ? 'hidden' : 'visible'
                        }`,
                      }
                    },
                  },
                }),
              ],
              validation: (rule) =>
                rule
                  .required()
                  .min(1)
                  .custom((items) => {
                    if (!Array.isArray(items)) {
                      return true
                    }

                    const itemKeys = items
                      .map((item) =>
                        typeof item === 'object' && item !== null && 'itemKey' in item
                          ? String(item.itemKey)
                          : undefined,
                      )
                      .filter(Boolean)

                    const uniqueItemKeys = new Set(itemKeys)

                    if (itemKeys.length !== uniqueItemKeys.size) {
                      return 'Each navigation item can only be added once per language.'
                    }

                    return true
                  }),
            }),
          ],
          preview: {
            select: {
              languageCode: 'languageCode',
              menuLabel: 'menuLabel',
              items: 'items',
            },
            prepare({languageCode, menuLabel, items}) {
              const languageLabel =
                languageOptions.find((language) => language.value === languageCode)?.title ||
                languageCode ||
                'Unknown language'

              const itemCount = Array.isArray(items) ? items.length : 0

              return {
                title: languageLabel,
                subtitle: `${menuLabel || 'Menu'} · ${itemCount} item${itemCount === 1 ? '' : 's'}`,
              }
            },
          },
        }),
      ],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .custom((translations) => {
            if (!Array.isArray(translations)) {
              return true
            }

            const languageCodes = translations
              .map((translation) =>
                typeof translation === 'object' &&
                translation !== null &&
                'languageCode' in translation
                  ? String(translation.languageCode)
                  : undefined,
              )
              .filter(Boolean)

            const uniqueLanguageCodes = new Set(languageCodes)

            if (languageCodes.length !== uniqueLanguageCodes.size) {
              return 'Each language can only be added once.'
            }

            return true
          }),
    }),
  ],
  preview: {
    select: {
      key: 'key',
      translations: 'translations',
    },
    prepare({key, translations}) {
      const translationCount = Array.isArray(translations) ? translations.length : 0

      return {
        title: key || 'Website Navigation',
        subtitle: `${translationCount} translation${translationCount === 1 ? '' : 's'}`,
      }
    },
  },
})
