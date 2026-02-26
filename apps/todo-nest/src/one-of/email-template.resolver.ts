import { Args, Mutation, Resolver } from '@nestjs/graphql';

import {
  CreateTemplateInput,
  CssEmailTemplate,
  EmailTemplate,
  EmailTemplateKind,
  HtmlEmailTemplate,
} from './email-template.types';

@Resolver()
export class EmailTemplateResolver {
  @Mutation(() => EmailTemplate)
  createTemplate(@Args('input') input: CreateTemplateInput): EmailTemplate {
    console.log('createTemplate input:', input);

    const now = new Date().toISOString();

    if (input.html) {
      const template = new HtmlEmailTemplate();
      template.id = crypto.randomUUID();
      template.kind = EmailTemplateKind.HTML;
      template.template = input.html.template;
      template.createdAt = now;
      template.updatedAt = now;
      template.subject = input.html.subject ?? '';
      template.styleIds = input.html.styleIds;

      return template;
    }

    if (!input.css) {
      throw new Error('Exactly one of html or css must be provided');
    }

    const template = new CssEmailTemplate();

    template.id = crypto.randomUUID();
    template.kind = EmailTemplateKind.CSS;
    template.template = input.css.template;
    template.createdAt = now;
    template.updatedAt = now;

    return template;
  }
}
