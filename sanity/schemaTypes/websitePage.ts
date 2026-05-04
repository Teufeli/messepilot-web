import {defineArrayMember, defineField, defineType} from 'sanity'

const languageOptions = [
  {title: 'English', value: 'en'},
  {title: 'Deutsch', value: 'de'},
  {title: '日本語', value: 'ja'},
]

const pageKeyOptions = [
  {title: 'Home', value: 'home'},
  {title: 'Support', value: 'support'},
  {title: 'Privacy', value: 'privacy'},
  {title: 'About', value: 'about'},
]

const statusOptions = [
  {title: 'Draft', value: 'draft'},
  {title: 'Published', value: 'published'},
  {title: 'Archived', value: 'archived'},
]

export const websitePageType = defineType({
  name: 'websitePage',
  title: 'Website Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageKey',
      title: 'Page',
      type: 'string',
      options: {
        list: pageKeyOptions,
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'draft',
      options: {
        list: statusOptions,
        layout: 'radio',
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
              name: 'seoTitle',
              title: 'SEO Title',
              type: 'string',
            }),
            defineField({
              name: 'seoDescription',
              title: 'SEO Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'heroEyebrow',
              title: 'Hero Eyebrow',
              type: 'string',
            }),
            defineField({
              name: 'heroTitle',
              title: 'Hero Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'heroText',
              title: 'Hero Text',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'primaryButtonLabel',
              title: 'Primary Button Label',
              type: 'string',
            }),
            defineField({
              name: 'primaryButtonHref',
              title: 'Primary Button Link',
              type: 'string',
            }),
            defineField({
              name: 'primaryButtonNote',
              title: 'Primary Button Note',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'bodyBlocks',
              title: 'Body Blocks',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'textBlock',
                  title: 'Text Block',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'heading',
                      title: 'Heading',
                      type: 'string',
                    }),
                    defineField({
                      name: 'text',
                      title: 'Text',
                      type: 'text',
                      rows: 5,
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'heading',
                      subtitle: 'text',
                    },
                    prepare({title, subtitle}) {
                      return {
                        title: title || 'Text Block',
                        subtitle,
                      }
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              languageCode: 'languageCode',
              title: 'heroTitle',
            },
            prepare({languageCode, title}) {
              const languageLabel =
                languageOptions.find((language) => language.value === languageCode)?.title ||
                languageCode ||
                'Unknown language'

              return {
                title: `${languageLabel}`,
                subtitle: title || 'No hero title yet',
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
      pageKey: 'pageKey',
      status: 'status',
      translations: 'translations',
    },
    prepare({pageKey, status, translations}) {
      const translationCount = Array.isArray(translations) ? translations.length : 0

      return {
        title: pageKey || 'Website Page',
        subtitle: `${status || 'draft'} · ${translationCount} translation${translationCount === 1 ? '' : 's'}`,
      }
    },
  },
})
