import {FormlyFieldConfig} from '@ngx-formly/core';

/**
 * Defines interface to create new a field with `FormComponent`.
 * This type extends FormlyFieldConfig but add on optional `preset` key
 * defining a global preset (field configuration) injected globally
 * You can pick a preset and override properties as needed.
 *
 * The label, placeholder, and hint are automatically translated if `core.form.fields.{key}` was found.
 *
 * @example
 * <caption>Defining FormConfig</caption>
 * //@core/modules/form/models/form-groups.ts
 * {
    preset: 'email',
    props: { required: true },
    ...
  } ,

  Make sure the key used match one the translations located in `core.form.fields`

  @example
  <caption>Defining translations</caption>
  //src/assets/i18n/{lang}.json
  "email": {
    "label": "Adresse email",
    "placeholder": "example@mail.com",
    "description": ""
  },
 *
 * @see {@link https://formly.dev/docs/guide/properties-options#fields | FormlyFieldConfig properties}
 */
export interface FieldConfig extends FormlyFieldConfig {
	preset?: string;
}
