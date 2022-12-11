import type { ComponentMeta, ComponentStory } from '@storybook/react';
import DetailInfo from './DetailInfo';

export default {
  title: 'common/components/DetailInfo',
  component: DetailInfo,
  args: {
    isValid: true,
  },
  parameters: {
    design: {
      url: 'https://www.figma.com/file/y5dq4m439YJKRTrKw5ZsZV/33-1%2F3?node-id=377%3A2244&t=ri42uDzp7Wjgw7vi-4',
    },
  },
} as ComponentMeta<typeof DetailInfo>;

const Template: ComponentStory<typeof DetailInfo> = (args) => (
  <DetailInfo {...args} />
);

export const Released = Template.bind({});
Released.args = {
  infoName: 'Released',
  infoContent: '2014',
};

export const Genre = Template.bind({});
Genre.args = {
  infoName: 'Genre',
  infoContent: ['Pop', 'Folk, World, & Country'],
};

export const Style = Template.bind({});
Style.args = {
  infoName: 'Style',
  infoContent: ['Folk', 'Ballad', 'K-pop'],
};

export const Country = Template.bind({});
Country.args = {
  infoName: 'Country',
  infoContent: 'South Korea',
};

export const Label = Template.bind({});
Label.args = {
  infoName: 'Label',
  infoContent: ['Loen Entertainment'],
};
