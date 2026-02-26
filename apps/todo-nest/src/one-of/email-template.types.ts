import {
  Field,
  ID,
  InputType,
  InterfaceType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum EmailTemplateKind {
  HTML = 'HTML',
  CSS = 'CSS',
}

registerEnumType(EmailTemplateKind, {
  name: 'EmailTemplateKind',
});

@InterfaceType('EmailTemplate', {
  resolveType: (value: { kind: EmailTemplateKind }) => {
    if (value.kind === EmailTemplateKind.HTML) {
      return HtmlEmailTemplate;
    }

    return CssEmailTemplate;
  },
})
export abstract class EmailTemplate {
  @Field(() => ID)
  id: string;

  @Field(() => EmailTemplateKind)
  kind: EmailTemplateKind;

  @Field(() => String)
  template: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType('HtmlEmailTemplate', {
  implements: () => [EmailTemplate],
})
export class HtmlEmailTemplate extends EmailTemplate {
  @Field(() => String)
  subject: string;

  @Field(() => [ID], { nullable: true })
  styleIds?: string[];
}

@ObjectType('CssEmailTemplate', {
  implements: () => [EmailTemplate],
})
export class CssEmailTemplate extends EmailTemplate {}

@InputType('CreateHtmlEmailTemplateInput')
export class CreateHtmlEmailTemplateInput {
  @Field(() => String)
  template: string;

  @Field(() => String)
  subject: string;

  @Field(() => [ID], { nullable: true })
  styleIds?: string[];
}

@InputType('CreateCssEmailTemplateInput')
export class CreateCssEmailTemplateInput {
  @Field(() => String)
  template: string;
}

@InputType('CreateTemplateInput', { isOneOf: true })
export class CreateTemplateInput {
  @Field(() => CreateHtmlEmailTemplateInput, { nullable: true })
  html?: CreateHtmlEmailTemplateInput;

  @Field(() => CreateCssEmailTemplateInput, { nullable: true })
  css?: CreateCssEmailTemplateInput;
}
