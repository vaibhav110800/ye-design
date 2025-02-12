import { storyIconMap } from "../../../tools/storybook.js";
import TextInput from "./TextInput.js";

const metadata = {
  argTypes: {
    icon: { control: { options: Object.keys(storyIconMap), type: "select" } },
  },
  component: TextInput,
};

export default metadata;

const Template = ({ width, iconBefore, iconAfter, ...args }) => {
  const IconBefore = storyIconMap[iconBefore];
  const IconAfter = storyIconMap[iconAfter];
  return (
    <TextInput
      iconBefore={IconBefore ? <IconBefore /> : null}
      iconAfter={IconAfter ? <IconAfter /> : null}
      style={{ width }}
      {...args}
    />
  );
};

export const Basic = Template.bind({});
Basic.args = {
  placeholder: "Enter your text",
  width: 240,
};
Basic.parameters = {
  jest: ["TextInput.test.js"],
};

export const Outlined = Template.bind({});
Outlined.args = {
  ...Basic.args,
  variant: "outlined",
};

export const Dashed = Template.bind({});
Dashed.args = {
  ...Basic.args,
  variant: "dashed",
};

export const Borderless = Template.bind({});
Borderless.args = {
  ...Basic.args,
  variant: "borderless",
};

export const withIcon = Template.bind({});
withIcon.args = {
  ...Basic.args,
  iconAfter: "AiOutlineEye",
  iconBefore: "AiOutlineSearch",
};
